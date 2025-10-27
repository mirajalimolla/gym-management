// src/components/Table.jsx
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function Table({ columns, data }) {
  // const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
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
              <tr key={row.id} className="hover:bg-gray-800">
                {columns.map((c) => (
                  <td key={c.accessor} className="px-4 py-2">
                    {/*  ONLY the name column becomes a link  */}
                    {c.accessor === 'name' ? (
                      <Link to={`/members/${row.id}`} className="text-color-primary-400 hover:underline">
                        {c.cell ? c.cell(row) : row[c.accessor]}
                      </Link>
                    ) : (
                      c.cell ? c.cell(row) : row[c.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}