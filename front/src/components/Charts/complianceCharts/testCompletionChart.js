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
      text: 'User Test Completion',
    },
  },
};

const labels = ['Tests Completed', 'Tests Failed', 'Bounces',];

export default function TestCompletionChart({date}) {
  var startDate = date[0].startDate ? `${date[0].startDate?.getMonth()+1}/${date[0].startDate?.getDate()}/${date[0].startDate?.getFullYear()}` : null;
  var endDate = date[0].endDate ? `${date[0].endDate?.getMonth()+1}/${date[0].endDate?.getDate()}/${date[0].endDate?.getFullYear()}` : null;

  const [data, setData] = useState();

  var chart = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: 'rgba(0, 119, 187, 0.7)',
      },
    ],
  };

  const getData = useCallback(async () => {
    const response = await fetch(`http://localhost:5005/getCompletionComplianceData/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`);
    const data = await response.json();
    setData(data);
  });

  useEffect(() => {
    getData()
      .catch(console.error);
  }, [date]);

  return <Bar options={options} data={chart} />;
}
