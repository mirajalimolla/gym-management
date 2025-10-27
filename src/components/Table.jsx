// src/components/Table.jsx
export default function Table({ columns, data }) {
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
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-800">
              {columns.map((c) => (
                <td key={c.accessor} className="px-4 py-2">
                  {c.cell ? c.cell(row) : row[c.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}