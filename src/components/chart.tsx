import React from 'react';
import jsonData from './covidData.json'
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
            text: 'Number of Students in Each Classroom',
        },
    },
};

function formatData() {
    var dataArray: number[] = [];
    console.log(jsonData)
    return dataArray;
}

function labels() {
    var labels: string[] = [];
    // iterate over jsonData props and push to labels array
    for (var prop in jsonData) {
        if (Object.prototype.hasOwnProperty.call(jsonData, prop)) {
            labels.push(prop)
        }
    }
    return labels;
}

export const data = {
    labels: labels(),
    datasets: [
        {
            label: '',
            data: formatData(),
            backgroundColor: 'rbga(255, 255, 255, 0.85)',
        }
    ],
};

export const ChartComponent: React.FC = () => {
    console.log(formatData())
    return (
        <Bar options={options} data={data} />
    )
};