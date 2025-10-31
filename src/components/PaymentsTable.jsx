// src/components/PaymentsTable.jsx
import { useCollection } from '../hooks/useCollection';

export default function PaymentsTable({ memberId }) {
  const pays = useCollection('payments').filter((p) => p.memberId === memberId);

  if (!pays.length) return <p className="text-sm text-gray-800">No payments yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {pays.map((p) => (
            <tr key={p.id} className="hover:bg-gray-800">
              <td className="px-4 py-2">{p.date}</td>
              <td className="px-4 py-2">₹{p.amount}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${p.status === 'paid' ? 'bg-green-600' : 'bg-red-600'}`}
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}