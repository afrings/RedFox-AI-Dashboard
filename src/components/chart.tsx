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

var attributes:string[] = []
Object.entries(jsonData.KY).forEach(attribute => {
    attributes.push(attribute[0])
})

const attributeNum = 98;

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Covid Data by State on 2022/15/25',
        },
    },
};

function formatData() {
    var dataArray: number[] = [];
    Object.entries(jsonData).forEach(state => {
        dataArray.push((state[1] as any)[attributes[attributeNum]])
    })
    console.log(dataArray);
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
            label: attributes[attributeNum],
            data: formatData(),
            backgroundColor: 'rbga(255, 255, 255, 0.85)',
        }
    ],
};

export const ChartComponent: React.FC = () => {
    return (
        <Bar options={options} data={data} />
    )
};