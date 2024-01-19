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
      text: 'Barcode Scan Times',
    },
  },
};

const generateLabels = (data) => {
    return data?.map((x) => '');
}

export default function BarcodeScanTimeChart() {

  const [data, setData] = useState([]);

  var chart = {
    labels: generateLabels(data),
    datasets: [
      {
        label: 'time (seconds)',
        data: data,
        backgroundColor: 'rgba(0, 119, 187, 0.7)',
      },
    ],
  };

  const getData = useCallback(async () => {
    const response = await fetch("http://localhost:5005/getScanTimeComplianceData");
    const data = await response.json();
    setData(data);
  }, []);

  useEffect(() => {
    getData()
      .catch(console.error);
  }, []);

  return <Bar options={options} data={chart} />;
}
