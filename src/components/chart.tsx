import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
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
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ["January", 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
        label: 'Dataset 1',
        data: labels.map(() => 10),
        borderColor: 'rgb(53, 53, 235)',
        backgroundColor: 'rgba(53, 53, 235, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 5),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        label: 'Dataset 3',
        data: labels.map(() => 8),
        borderColor: 'rgb(53, 162, 15)',
        backgroundColor: 'rgba(53, 162, 15, 0.5)',
      },
  ],
};

export const ChartComponent: React.FC = () => {

    
    return (
        <Line options={options} data={data} />
        
    )
};