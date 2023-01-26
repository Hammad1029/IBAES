import React from 'react';
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
    plugins: {
        title: {
            display: true,
            text: 'Purchase / Sell Graph',
        },
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Purchase Orders',
            data: labels.map(i => Math.random() * 1000),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
        },
        {
            label: 'Sell Orders',
            data: labels.map(i => Math.random() * -1000),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
        },
        {
            label: 'Net',
            data: labels.map(i => Math.random() * 1000),
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 1',
        },
    ],
};

const BarGraph = () => <Bar options={options} data={data} />;

export default BarGraph;
