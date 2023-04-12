import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Review Classification',
        },
        animation: false,
    },
    scales: {
        x: {
            ticks: {
                beginAtZero: true,
                stepSize: 1,
            },
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
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
    ],
};

const ProcessedReviewChart = ({ chartData, onCloseChart }) => {
    const handleCloseChart = () => {
        onCloseChart();
    };

    return (
        <>
            <Bar options={options} data={chartData} />
            <button className="bg-gray-600 text-black py-1 px-4 rounded mt-4" onClick={handleCloseChart}>
                Close Chart
            </button>
        </>
    );
};

export default ProcessedReviewChart;
