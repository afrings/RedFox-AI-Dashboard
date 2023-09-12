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
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Issues',
      },
    },
  };

const labels = ['1', '2', '3', '4', '5', '6'];

const format = () => {
  return labels.map(() => Math.random() * 10)
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Steps Users Had Issues With',
      data: format(),
      backgroundColor: 'rgba(51, 187, 238, 0.7)',
    },
  ],
};

export const IssuesChart: React.FC = () => {
  return <Bar options={options} data={data} />;
}
