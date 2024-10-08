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

export default function StepTimeChart({date, apiUrl}) {
  var startDate = date[0].startDate ? `${date[0].startDate?.getMonth()+1}/${date[0].startDate?.getDate()}/${date[0].startDate?.getFullYear()}` : null;
  var endDate = date[0].endDate ? `${date[0].endDate?.getMonth()+1}/${date[0].endDate?.getDate()}/${date[0].endDate?.getFullYear()}` : null;

  const [dataset, setData] = useState([]);

  var chart = {
    labels: labels,
    datasets: dataset,
  };

  const getData = useCallback(async () => {
    const response = await fetch(`${apiUrl}/getStepTimeData/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`);
    const data = await response.json();
    let dataArray = [];
    for (let i = 0; i < data.length; i++) {
      dataArray.push({
        label: 'time (seconds)',
        data: data[i],
        backgroundColor: 'rgba(0, 119, 187, 0.7)',
      });
    }
    setData(dataArray);
  });

  useEffect(() => {
    getData()
      .catch(console.error);
  }, [date]);

  return <Line options={options} data={chart} />;
}
