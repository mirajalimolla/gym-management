// src/components/TopBar.jsx
import { useAuth } from '../context/AuthContext';

export default function TopBar({ setOpen }) {
  const { logout } = useAuth();
  return (
    <header className="bg-gray-800 text-white rounded-xl flex items-center justify-between px-4 py-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden text-gray-300 hover:text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
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