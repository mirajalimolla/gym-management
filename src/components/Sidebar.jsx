// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { CgGym } from 'react-icons/cg';
import {
  MdDashboard, MdPeople, MdListAlt, MdPayment, MdSchedule, MdSettings,
} from 'react-icons/md';

const links = [
  { to: '/', label: 'Dashboard', icon: MdDashboard },
  { to: '/members', label: 'Members', icon: MdPeople },
  { to: '/plans', label: 'Plans', icon: MdListAlt },
  { to: '/payments', label: 'Payments', icon: MdPayment },
  { to: '/attendance', label: 'Attendance', icon: MdSchedule },
  { to: '/settings', label: 'Settings', icon: MdSettings },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/*  Mobile backdrop  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:relative z-30 h-full w-64 bg-gray-800 border-r border-gray-700 flex flex-col p-4 transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex text-white items-center gap-2 mb-8">
          <CgGym className="text-color-primary-400 text-2xl" />
          <span className="font-bold text-xl">FitManager</span>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-2xl transition
                ${isActive
                  ? 'bg-gray-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'}`
              }
            >
              <Icon className="text-xl" /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}