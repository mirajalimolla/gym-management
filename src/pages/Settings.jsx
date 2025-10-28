// src/pages/Settings.jsx
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import { useState } from 'react';

export default function Settings() {
  const { user } = useAuth();
  const [msg, setMsg] = useState('');
  const { register, handleSubmit } = useForm();

  const save = async (data) => {
    await setDoc(doc(db, 'gym', 'info'), data, { merge: true });
    setMsg('Saved!');
    setTimeout(() => setMsg(''), 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gym Settings</h2>
      <form onSubmit={handleSubmit(save)} className="max-w-xl space-y-3">
        <input
          {...register('gymName')}
          placeholder="Gym Name"
          className="w-full px-3 py-2 rounded bg-gray-800 text-white"
        />
        <input
          {...register('phone')}
          placeholder="Phone"
          className="w-full px-3 py-2 rounded bg-gray-800 text-white"
        />
        <input
          {...register('address')}
          placeholder="Address"
          className="w-full px-3 py-2 rounded bg-gray-800 text-white"
        />
        <div>
          <label className="block mb-1 font-bold text-lg">Set your Logo</label>
          <input type="file" className="border w-fit p-2 text-sm" />
        </div>
        <button className="px-4 py-2 rounded bg-gray-800 text-white font-bold cursor-pointer hover:bg-gray-700">Save</button>
        {msg && <span className="text-green-400 ml-2">{msg}</span>}
      </form>
    </div>
  );
}