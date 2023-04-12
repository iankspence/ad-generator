import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Review Classification',
        },
    },
};

const labels = [
    'The Stressed Professional',
    'The Weekend Warrior',
    'The Chronic Pain Sufferer',
    'The Posture Protector',
    'The Aging Gracefully',
    'The Accident Recovery',
    'The Office Worker',
    'The Parent',
    'The Migraine Sufferer',
    'The Holistic Health Seeker',
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Number of Reviews',
            data: new Array(10).fill(0),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

const ProcessedReviewChart = ({ chartData }) => {
    return <Bar key={Math.random()} options={options} data={chartData} />;
};

export default ProcessedReviewChart;
