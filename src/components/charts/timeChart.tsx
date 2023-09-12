import React from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, scales
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Time Spend Per Step',
    },
  },
}

export const data = {
  labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(51, 34, 136, 0.75)',
        'rgba(136, 204, 238, 0.75)',
        'rgba(68, 170, 153, 0.75)',
        'rgba(17, 119, 51, 0.75)',
        'rgba(153, 153, 51, 0.75)',
        'rgba(221, 204, 119, 0.75)',
      ],
      borderColor: [
        'rgba(51, 34, 136, 1)',
        'rgba(136, 204, 238, 1)',
        'rgba(68, 170, 153, 1)',
        'rgba(17, 119, 51, 1)',
        'rgba(153, 153, 51, 1)',
        'rgba(221, 204, 119, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const TimeChart: React.FC = () => {
    return <Pie options={options} data={data}/>
};