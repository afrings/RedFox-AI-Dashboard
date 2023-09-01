import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = [''];

const format = () => {
  return labels.map(() => Math.random() * 100)
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Successful User Interactions',
      data: format(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const InteractionsChart: React.FC = () => {
  return <Bar options={options} data={data} />;
}
