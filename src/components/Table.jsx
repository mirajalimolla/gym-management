// src/components/Table.jsx
import { Link } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../assets/firebase';
import { MdDelete } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

async function deleteMember(id) {
  if (!confirm('Delete this member permanently?')) return;
  await deleteDoc(doc(db, 'members', id));
}

export default function Table({ data }) {
  // Columns definition inside the component so we can use helpers
  const columns = [
    {
      header: 'Member',
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Link to={`/members/${row.id}`} className="flex items-center gap-4 text-color-primary-400 hover:underline font-medium">
          <img src={row.photoURL || `https://i.pravatar.cc/40?u=${row.id}`}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover" />
            
            {row.name}
          </Link>
        </div>
      ),
    },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Joined', accessor: 'joinedAt' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const end = dayjs(row.startedAt).add(row.duration, 'month');
        const left = Math.ceil(end.diff(dayjs(), 'day', true));
        const expired = left <= 0;
        return (
          <div className="flex flex-col gap-1">
            <span
              className={`px-2 py-1 rounded-lg w-fit text-xs ${
                expired ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              {expired ? 'Expired' : 'Active'}
            </span>
          </div>
        );
      },
    },
    {
      header: '',
      accessor: 'id',
      cell: (row) => (
        <button onClick={() => deleteMember(row.id)} className="text-red-400 cursor-pointer hover:text-red-300 text-xl" title="Delete member" >
          <MdDelete />
        </button>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm rounded-3xl">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            {columns.map((c) => (
              <th key={c.accessor} className="px-4 py-2 text-left">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-800 hover:text-white">
              {columns.map((c) => (
                <td key={c.accessor} className="px-4 py-3 align-middle">
                  {/* {console.log(row[c.accessor])} */}
                  {/* {console.log("This is only startedAt", row['startedAt'])} */}
                  {c.cell ? c.cell(row) : row[c.accessor] || row['startedAt']}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}