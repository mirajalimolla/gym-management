// src/pages/Login.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../assets/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const onSubmit = async ({ email, pass }) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav('/');
    } catch (e) {
      setErr(e.message);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {err && <p className="text-red-400 mb-2">{err}</p>}
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
        />
        <input
          {...register('pass', { required: true })}
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700"
        />
        <button className="w-full bg-primary-600 hover:bg-primary-700 py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}