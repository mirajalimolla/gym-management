// src/pages/MemberProfile.jsx
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import { MdArrowLeft, MdCameraAlt } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { uploadPhoto } from '../helpers/uploadPhoto';
import PaymentsTable from '../components/PaymentsTable';
dayjs.extend(relativeTime);

export default function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [plan, setPlan]   = useState(null);
  const [file, setFile]   = useState(null);

  // live member doc
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'members', id), (snap) => {
      const data = snap.data();
      setMember({ id: snap.id, ...data });
      if (data?.planId) {
        onSnapshot(doc(db, 'plans', data.planId), (p) => setPlan(p.data()));
      }
    });
    return unsub;
  }, [id]);

  // upload new photo
  const changePhoto = async () => {
    if (!file) return;
    const url = await uploadPhoto(file); // helper below
    await updateDoc(doc(db, 'members', id), { photoURL: url });
    setFile(null);
  };

  if (!member) return <p className="p-4">Loading…</p>;

  const end   = dayjs(member.startedAt).add(member.duration, 'month');
  const now   = dayjs();
  const left  = Math.ceil(end.diff(now, 'day', true)); // whole days
  const percent = Math.max(0, Math.min(100, (left / (member.duration * 30)) * 100));

  return (
    <div className="relative max-w-4xl mx-auto p-4 space-y-6">
      <NavLink to={'/members'}>
        <div className='absolute left-0 top-0 rounded-2xl text-white bg-gray-800 hover:bg-gray-700 cursor-pointer'>
          <MdArrowLeft size={45} />
        </div>
      </NavLink>
      {/*  PHOTO  */}
      <div className="flex flex-col md:flex-row gap-6 bg-gray-800 text-white p-4 rounded-2xl items-center md:items-start">
        <div className="relative">
          <img
            src={member.photoURL || `https://i.pravatar.cc/150?u=${id}`}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-color-primary-500"
          />
          <label className="absolute bottom-0 right-0 bg-color-primary-600 text-white p-2 rounded-full cursor-pointer">
            <MdCameraAlt className="text-lg" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>

        {file && (
          <button onClick={changePhoto} className="px-4 py-2 rounded-2xl bg-color-primary-600 hover:bg-color-primary-700">
            Upload new photo
          </button>
        )}

        {/*  BASIC INFO  */}
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-gray-300">Phone: {member.phone}</p>
          <p className="text-gray-300">Joined: {dayjs(member.joinedAt).format('DD MMM YYYY')}</p>
          <p className="text-gray-300">Plan: {plan?.name || '—'}</p>
        </div>
      </div>

      {/*  MEMBERSHIP STATUS CARD  */}
      <div className="bg-gray-800 text-white rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Membership expires</span>
          <span className={`px-3 py-1 rounded-full text-xs ${left <= 0 ? 'bg-red-600' : 'bg-color-primary-600'}`}>
            {left <= 0 ? 'Expired' : `${left} day${left > 1 ? 's' : ''} left`}
          </span>
        </div>

        {/*  PROGRESS BAR  */}
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gray-400 h-3 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">
          {percent.toFixed(0)} % of {member.duration}-month plan used
        </p>
      </div>

      {/*  PAYMENT HISTORY  (reuse existing table) */}
      <h2 className="text-xl font-semibold mt-6 bg-gray-800 text-white p-4 rounded-2xl">Payment history</h2>
      <PaymentsTable memberId={id} />
    </div>
  );
}