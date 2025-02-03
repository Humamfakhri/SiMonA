import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

export default function LineChart({ data, label }) {
  const chartData = {
    labels: data.map(item => new Date(item.timestamp.replace('T', ' '))), // Format waktu di sumbu Y
    datasets: [{
      label: `${label} Chart`,
      data: data.map(item => parseFloat(item[label])),
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    }]
  };

  return <Line data={chartData} />;
}
