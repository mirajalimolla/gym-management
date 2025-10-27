// src/pages/Payments.jsx
import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import Table from '../components/Table';

export default function Payments() {
  const payments = useCollection('payments');
  const [filter, setFilter] = useState('all'); // all | paid | unpaid

  const filtered =
    filter === 'all' ? payments : payments.filter((p) => p.status === filter);

  const columns = [
    { header: 'Member', accessor: 'memberName' },
    { header: 'Plan', accessor: 'plan' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.status === 'paid' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Payments</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
      <Table columns={columns} data={filtered} />
    </div>
  );
}