import React from 'react';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, scales
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Users per Quarter',
    }
  }
}

export const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: '# of Users',
      data: [12, 19, 3, 5,],
      backgroundColor: [
        'rgba(51, 34, 136, 0.75)',
        'rgba(136, 204, 238, 0.75)',
        'rgba(221, 204, 119, 0.75)',
        'rgba(17, 119, 51, 0.75)',
      ],
      borderColor: [
        'rgba(51, 34, 136, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(221, 204, 119, 1)',
        'rgba(17, 119, 51, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function UserChart() {
    return <Pie options={options} data={data}/>
};