import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function CryptoDetail({ selectedCrypto }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = "e42fded04438150d0ea59292c354e438dd6ba561074f2b845417d623264f44a0";
            const response = await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${selectedCrypto}&tsym=USD&limit=30&api_key=${apiKey}`);
            const historicalData = response.data.Data.Data;

            if (historicalData) {
                const chartData = {
                    labels: historicalData.map(data => {
                        const date = new Date(data.time * 1000);
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                    }),
                    datasets: [
                        {
                            label: `${selectedCrypto} Price`,
                            data: historicalData.map(data => data.close),
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                };

                const options = {
                    scales: {
                        y: {
                            type: 'linear'
                        }
                    }
                };

                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const ctx = document.getElementById('myChart').getContext('2d');
                chartRef.current = new Chart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: options
                });
            }
        };

        fetchData();
    }, [selectedCrypto]);

    return (
        <div>
            <canvas id="myChart"></canvas>
        </div>
    );
}

export default CryptoDetail;