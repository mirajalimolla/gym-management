// src/pages/Members.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { collection, doc, addDoc, writeBatch, serverTimestamp, increment, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import { useCollection } from '../hooks/useCollection';
import Modal from '../components/Modal';
import Table from '../components/Table';
import dayjs from 'dayjs';
import { MdDelete } from 'react-icons/md';

async function deleteMember(id) {
  if (!confirm('Delete this member permanently?')) return;
  await deleteDoc(doc(db, 'members', id));
}


export default function Members() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const members = useCollection('members');
  const plans = useCollection('plans');
  const memberRef = doc(collection(db, 'members')); 
  const payRef = doc(collection(db, 'payment')); 
  
  /* ----------  ADD MEMBER  ---------- */
  const onAdd = async (data) => {
    if (!data.planId) return alert('Please choose a plan');
    
    const batch = writeBatch(db);
    const planRef = doc(db, 'plans', data.planId);
    const planSnap = await getDoc(planRef);
    if (!planSnap.exists()) return alert('Plan not found');
    const plan = planSnap.data();
    const today  = dayjs();
    const months = Number(plan.months);

    batch.set(memberRef, {
      name: data.name,
      phone: data.phone,
      planId: data.planId,
      joinedAt: today.format('YYYY-MM-DD'),
      startedAt: today.format('YYYY-MM-DD'),
      expiresAt: dayjs().add(months, 'month').format('YYYY-MM-DD'),
      duration: months,
      status: 'active',
      photoURL: '',
      createdAt: serverTimestamp(),
    });

    // payment doc
    batch.set(payRef, {
      memberId: memberRef.id,
      memberName: data.name,
      plan: Number(plan.name),
      amount: Number(plan.price),          // ← number
      date: dayjs().format('YYYY-MM-DD'),
      status: 'unpaid',
    });

    // 3. increment plan usage
    batch.update(planRef, { usageCount: increment(1) });

    await batch.commit();
    reset();
    setOpen(false);
  };

  /* ----------  TABLE COLUMNS  ---------- */
  const columns = [
  {
    header: 'Member',
    accessor: 'name',
    cell: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.photoURL || `https://i.pravatar.cc/40?u=${row.id}`}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link to={`/members/${row.id}`} className="text-color-primary-400 hover:underline font-medium">
          {row.name}
        </Link>
      </div>
    ),
  },
  { header: 'Phone', accessor: 'phone' },
  { header: 'Joined', accessor: 'joinedAt', cell: (r) => dayjs(r.joinedAt).format('DD MMM YYYY') },
  { header: 'Expires', accessor: 'expiresAt', cell: (r) => dayjs(r.expiresAt).format('DD MMM YYYY') },
  {
    header: 'Status',
    accessor: 'status',
    cell: (row) => {
      const end = dayjs(row.expiresAt);
      const left = Math.ceil(end.diff(dayjs(), 'day', true));
      const expired = left <= 0;
      return (
        <div className="flex flex-col gap-1">
          <span className={`px-2 py-1 rounded-full text-xs ${expired ? 'bg-red-600' : 'bg-color-primary-600'}`}>
            {expired ? 'Expired' : 'Active'}
          </span>
          <span className="text-2xs text-gray-400">{expired ? '0 days' : `${left} day${left > 1 ? 's' : ''} left`}</span>
        </div>
      );
    },
  },
  {
    header: 'Delete',
    accessor: 'id',
    cell: (row) => (
      <button onClick={() => deleteMember(row.id)} className="text-red-400 hover:text-red-300 text-xl" title="Delete">
        <MdDelete />
      </button>
    ),
  },
];

  /* ----------  RENDER  ---------- */
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Members</h2>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-color-primary-700">
          + Add Member
        </button>
      </div>

      <Table data={members} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onAdd)} className="space-y-4 text-white">
          <input
            {...register('name', { required: true })}
            placeholder="Name"
            className="w-full px-3 py-2 rounded bg-gray-800"
          />
          <input
            {...register('phone', { required: true })}
            placeholder="Phone"
            className="w-full px-3 py-2 rounded bg-gray-800"
          />
          <select
            {...register('planId', { required: true })}
            className="w-full px-3 py-2 rounded bg-gray-800"
          >
            <option value="">Choose plan</option>
            {plans
              .filter((p) => Number(p.price) > 0 && Number(p.months) > 0)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₹{p.price} / {p.months} mo)
                </option>
              ))}
          </select>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-2xl">
              Save
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-2xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}