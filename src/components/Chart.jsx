// src/components/Chart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Chart({ title, labels, dataPoints }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,.15)',
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <Line data={data} />
    </div>
  );
}