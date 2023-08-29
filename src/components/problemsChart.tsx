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
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
      },
      title: {
        display: true,
        text: 'User Issues',
      },
    },
  };

const labels = ['1', '2', '3', '4', '5', '6'];

const format = () => {
  return labels.map(() => Math.random() * 100)
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Steps Users Had Issues With',
      data: format(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const ProblemsChart: React.FC = () => {
  return <Bar options={options} data={data} />;
}
