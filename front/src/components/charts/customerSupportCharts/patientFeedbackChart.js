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
      text: 'Patient Feedback Out Of 10',
    },
  },
};

const generateLabels = (data) => {
    return data?.map((x) => '');
}

export default function PatientFeedbackChart({date}) {
  var startDate = date[0].startDate ? `${date[0].startDate?.getMonth()+1}/${date[0].startDate?.getDate()}/${date[0].startDate?.getFullYear()}` : null;
  var endDate = date[0].endDate ? `${date[0].endDate?.getMonth()+1}/${date[0].endDate?.getDate()}/${date[0].endDate?.getFullYear()}` : null;

  const [testData, setTestData] = useState([]);

  var chart = {
    labels: generateLabels(testData),
    datasets: [
      {
        label: 'time (seconds)',
        data: testData,
        backgroundColor: 'rgba(0, 119, 187, 0.7)',
      },
    ],
  };

  const getData = useCallback(async () => {
    const testResponse = await fetch(`http://localhost:5005/getPatientFeedbackData/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`);
    const testData = await testResponse.json();
    setTestData(testData);
  });

  useEffect(() => {
    getData()
      .catch(console.error);
  }, [date]);

  return <Bar options={options} data={chart} />;
}
