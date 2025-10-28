// src/pages/Attendance.jsx
import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../assets/firebase';

export default function Attendance() {
  const members = useCollection('members');
  const [q, setQ] = useState('');

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(q.toLowerCase())
  );

  const checkIn = async (id) => {
    const ref = doc(db, 'members', id);
    await updateDoc(ref, {
      attendance: arrayUnion(new Date().toISOString()),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search member..."
        className="w-full max-w-md mb-4 px-3 py-2 rounded bg-gray-800 text-white"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="bg-gray-800 text-white rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-400">{m.phone}</p>
            </div>
            <button
              onClick={() => checkIn(m.id)}
              className="px-3 py-1.5 rounded bg-primary-600 hover:bg-primary-700 text-sm"
            >
              Check-in
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}