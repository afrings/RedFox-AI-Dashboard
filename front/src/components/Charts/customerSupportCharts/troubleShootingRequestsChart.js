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
      text: 'Trouble Shooting Requests',
    },
  },
};

const labels = [`Which end of the swab do I open?`, `How far do I peel open the wrapper?`, `How hard do I rub my cheek with the swab?`, `How do I switch to the other cheek to collect?`, `How do I package the swab after I finish collecting?`, `How do I open the GenDry foil pouch`, `How do I seal the return pouch?`,]

export default function TroubleShootingRequestsChart({date, apiUrl}) {
  var startDate = date[0].startDate ? `${date[0].startDate?.getMonth()+1}/${date[0].startDate?.getDate()}/${date[0].startDate?.getFullYear()}` : null;
  var endDate = date[0].endDate ? `${date[0].endDate?.getMonth()+1}/${date[0].endDate?.getDate()}/${date[0].endDate?.getFullYear()}` : null;

  const [testData, setTestData] = useState([]);

  var chart = {
    labels: labels,
    datasets: [
      {
        label: 'time (seconds)',
        data: testData,
        backgroundColor: 'rgba(0, 119, 187, 0.7)',
      },
    ],
  };

  const getData = useCallback(async () => {
    const testResponse = await fetch(`${apiUrl}/getTroubleShootingRequestsData/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`);
    const testData = await testResponse.json();
    setTestData(testData);
  });

  useEffect(() => {
    getData()
      .catch(console.error);
  }, [date]);

  return <Bar options={options} data={chart} />;
}
