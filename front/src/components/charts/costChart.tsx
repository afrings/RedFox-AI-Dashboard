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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Cost per Month',
    },
  },
};

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/");
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const format = () => {
  return labels.map(() => Math.random() * 100)
}

export const data = {
  labels,
  datasets: [
    {
      label: 'User Reviews',
      data: format(),
      backgroundColor: 'rgba(0, 153, 136, 0.7)',
    },
  ],
};

export const CostChart: React.FC = () => {
  return <Bar options={options} data={data} />;
}
