// src/components/TopBar.jsx
import { useAuth } from '../context/AuthContext';

export default function TopBar({ setOpen }) {
  const { logout } = useAuth();
  return (
    <header className="bg-gray-800 text-white rounded-xl flex items-center justify-between px-4 py-3">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <button
        onClick={logout}
        className="px-3 py-1.5 rounded-md bg-gray-600 hover:bg-gray-700 text-md"
      >
        Logout
      </button>
    </header>
  );
}