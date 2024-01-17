import React, { useEffect, useState, useCallback } from 'react';
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
      position: 'top',
    },
    title: {
      display: true,
      text: 'Time to Complete Step',
    },
  },
};

const labels = ['Step 1', 'Step 1.1', 'Step 2', 'Step 3', 'Step 4', 'Step 5','Step 6','Step 7',];

export default function StepTimeChart() {

  const [data, setData] = useState({});

  var chart = {
    labels: labels,
    datasets: [
      {
        label: 'User Reviews',
        data: data[1],
        backgroundColor: 'rgba(0, 153, 136, 0.7)',
      },
    ],
  };

  const getData = useCallback(async () => {
    const response = await fetch("http://localhost:5005/");
    const data = await response.json();
    setData([0, 0]);
  }, []);

  useEffect(() => {
    getData()
      .catch(console.error);
  }, []);

  return <Line options={options} data={chart} />;
}
