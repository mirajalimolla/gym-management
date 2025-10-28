// src/pages/Dashboard.jsx
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import { useCollection } from '../hooks/useCollection';
import { MdPeople, MdAttachMoney, MdTimer } from 'react-icons/md';
import TopBar from '../components/TopBar';

export default function Dashboard() {
  const members = useCollection('members');
  const active = members.filter((m) => m.status === 'active').length;
  const pending = members.filter((m) => m.dueAmount > 0).length;

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const attendance = [45, 52, 48, 60, 58, 70];

  return (
    <div className="space-y-6">
      <TopBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Members" value={members.length} icon={<MdPeople />} />
        <StatCard label="Active" value={active} icon={<MdTimer />} />
        <StatCard label="Pending" value={pending} icon={<MdAttachMoney />} />
      </div>

      <Chart title="Weekly Attendance" labels={labels} dataPoints={attendance} />
    </div>
  );
}