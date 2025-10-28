// src/pages/Members.jsx
import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import dayjs from 'dayjs';

export default function Members() {
  const members = useCollection('members');
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onAdd = async (data) => {
    await addDoc(collection(db, 'members'), {
      ...data,
      joinedAt: new Date().toISOString().slice(0, 10),
      status: 'active',
      dueAmount: 0,
    });
    reset();
    setOpen(false);
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Joined', accessor: 'joinedAt' },
    { header: 'Plan', accessor: 'plan' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Expires',
      accessor: 'startedAt',
      cell: (row) => {
        const end = dayjs(row.startedAt).add(row.duration, 'month');
        const left = Math.ceil(end.diff(dayjs(), 'day', true));
        return left <= 0 ? <span className="text-red-400">Expired</span> : <span>{left} d</span>;
      }
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Members</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded bg-gray-800 text-white cursor-pointer hover:bg-gray-700"
        >
          + Add Member
        </button>
      </div>      

      <Table columns={columns} data={members} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onAdd)} className="text-white space-y-3">
          <input
            {...register('name', { required: true })}
            placeholder="Name"
            className="w-full px-3 py-2 rounded bg-gray-700"
          />
          <input
            {...register('phone', { required: true })}
            placeholder="Phone"
            className="w-full px-3 py-2 rounded bg-gray-700"
          />
          <select
            {...register('plan', { required: true })}
            className="w-full px-3 py-2 rounded bg-gray-700"
          >
            <option value="">Select Plan</option>
            <option>Silver</option>
            <option>Gold</option>
            <option>Platinum</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}