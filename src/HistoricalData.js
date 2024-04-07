import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoChart from './CryptoChart';

const API_KEY = 'cc5fbaf811a34712fd4d968c99296fcd8c904a214cc6b26ace50566bd4ece304';
const HistoricalData = ({ selectedCrypto }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!selectedCrypto) return;

        const fetchHistoricalData = async () => {
            const url = `/data/v2/histoday?fsym=${selectedCrypto}&tsym=USD&limit=30&api_key=${API_KEY}`;

            try {
                const response = await axios.get(url);
                setData(response.data.Data.Data);
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchHistoricalData();
    }, [selectedCrypto]);

    return (
        <div>
            <div>
                <h2>Historical Data</h2>
                {data.length > 0 ? <CryptoChart historicalData={data}/> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default HistoricalData;