import React, { useEffect, useState, useCallback } from 'react';
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
// not in use
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
      text: 'Cost per Month',
    },
  },
};

export default function CostChart() {

  const [data, setData] = useState({});

  var chart = {
    labels: data[0],
    datasets: [
      {
        label: 'User Reviews',
        data: data[1],
        backgroundColor: 'rgba(0, 153, 136, 0.7)',
      },
    ],
  };

  const getCostData = useCallback(async () => {
    const response = await fetch("http://localhost:5005/getItem/3");
    const costData = await response.json();
    setData([costData.Data[0], costData.Data[1]]);
  }, []);

  useEffect(() => {
    getCostData()
      .catch(console.error);
  }, []);

  return <Bar options={options} data={chart} />;
}
