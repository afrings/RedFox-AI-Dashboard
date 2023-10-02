import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Return Rates Over 30 Days',
    },
  },
};

const labels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];

const format = () => {
    return labels.map(() => Math.random() * 25)
}

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: format(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const ReturnsChart: React.FC = () => {
  return <Line options={options} data={data} />;
}
