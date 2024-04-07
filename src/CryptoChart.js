import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './CryptoChart.css';

const CryptoChart = ({ historicalData }) => {
    const chartData = {
        labels: historicalData.map(data => new Date(data.time * 1000).toLocaleDateString()),
        datasets: [
            {
                label: 'Cena v USD',
                data: historicalData.map(data => data.close),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.1,
                borderWidth: 2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#4CAF50',
                pointHoverBackgroundColor: '#4CAF50',
                pointHoverBorderColor: '#fff',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#E0E0E0',
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#E0E0E0',
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#E0E0E0',
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 5,
                hoverRadius: 8,
            }
        },
    };

    return <div className="crypto-chart-container">
        <Line data={chartData} options={options}/>
    </div>;
};

export default CryptoChart;
