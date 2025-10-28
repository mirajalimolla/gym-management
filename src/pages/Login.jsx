// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../assets/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  
  const nav = useNavigate();
  
  const onSubmit = async ({ email, pass }) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e) {
      setErr(e.message);
      reset();
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-sm"
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
        <p>{loading ? 'please wait...' : nav('/')}</p>
        <button className="w-1/2 m-auto block font-semibold cursor-pointer bg-gray-700 py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}