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
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Percent Successful Interactions',
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
      backgroundColor: 'rgba(204, 102, 119, 0.75)',
    },
  ],
};

export default function InteractionsChart() {
  return <Bar options={options} data={data} />;
}
