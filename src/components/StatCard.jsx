// src/components/StatCard.jsx
export default function StatCard({ label, value, icon }) {
  return (
    <div className="bg-gray-800 text-white rounded-2xl p-4 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-color-primary-400 text-3xl">{icon}</div>
    </div>
  );
}