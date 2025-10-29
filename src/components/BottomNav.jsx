// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdPeople, MdListAlt, MdPayment, MdSchedule,
} from 'react-icons/md';

const tabs = [
  { to: '/', icon: MdDashboard, label: 'Home' },
  { to: '/members', icon: MdPeople, label: 'Members' },
  { to: '/plans', icon: MdListAlt, label: 'Plans' },
  { to: '/payments', icon: MdPayment, label: 'Pay' },
  { to: '/attendance', icon: MdSchedule, label: 'Attend' },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around z-40">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-2 text-xs
            ${isActive ? 'text-blue-400' : 'text-gray-400'}`
          }
        >
          <Icon className="text-xl mb-1" /> {label}
        </NavLink>
      ))}
    </nav>
  );
}