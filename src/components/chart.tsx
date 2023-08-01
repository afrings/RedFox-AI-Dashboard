import React from 'react';
import jsonData from './data.json'
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
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

function formatData() {
    var dataArray: number[] = [];
    jsonData.forEach(classroom => {
        dataArray.push(Number(classroom[1]))
    }) 
    return dataArray;
}

function labels() {
    var labels: string[] = [];
    jsonData.forEach(classroom => {
        labels.push(String(classroom[0]))
    })
    return labels;
}

export const data = {
    labels: labels(),
    datasets: [
        {
            label: 'Classrooms and Number of Students',
            data: formatData(),
            backgroundColor: 'rbga(255, 99, 132, 0.5)',
        }
    ],
};

export const ChartComponent: React.FC = () => {
    console.log(formatData())
    return (
        <Bar options={options} data={data} />
    )
};