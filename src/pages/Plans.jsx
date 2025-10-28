// src/pages/Plans.jsx
import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import Modal from '../components/Modal';
import { useForm } from 'react-hook-form';

export default function Plans() {
  const plans = useCollection('plans');
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onAdd = async (d) => {
    await addDoc(collection(db, 'plans'), d);
    reset();
    setOpen(false);
  };
  const onDel = async (id) => await deleteDoc(doc(db, 'plans', id));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Membership Plans</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded bg-primary-600 cursor-pointer bg-gray-800 text-white hover:bg-gray-700"
        >
          + Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div key={p.id} className="bg-gray-800 text-white rounded-lg p-4 relative">
            <button
              onClick={() => onDel(p.id)}
              className="absolute top-2 right-3 text-red-400 hover:text-red-300"
            >
              ✕
            </button>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-400">₹{p.price} / {p.months} months</p>
            <p className="text-sm text-gray-300 mt-2">{p.features}</p>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onAdd)} className="text-white space-y-3">
          <input
            {...register('name', { required: true })}
            placeholder="Plan Name"
            className="w-full px-3 py-2 rounded bg-gray-700"
          />
          <input
            {...register('price', { required: true })}
            type="number"
            placeholder="Price"
            className="w-full px-3 py-2 rounded bg-gray-700"
          />
          <input
            {...register('months', { required: true })}
            type="number"
            placeholder="Duration (months)"
            className="w-full px-3 py-2 rounded bg-gray-700"
          />
          <textarea
            {...register('features')}
            placeholder="Features (comma separated)"
            className="w-full px-3 py-2 rounded bg-gray-700"
          />
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