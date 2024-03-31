import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoDetail from './CryptoDetail';

function CryptoList() {
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    useEffect(() => {
        const fetchCryptoList = async () => {
            try {
                const response = await axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`);

                // Check if the response data is in the expected format
                if (response.data && response.data.Data) {
                    setCryptos(Object.values(response.data.Data));
                    console.log(response.data.Data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error("Error fetching crypto list:", error);
            }
        };

        fetchCryptoList();
    }, []);

    const handleCryptoSelect = (symbol) => {
        setSelectedCrypto(symbol);
    };

    const filteredCryptos = cryptos.filter(crypto =>
        crypto.CoinName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Vyhledejte kryptoměnu"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="crypto-list">
                {filteredCryptos.map((crypto) => (
                    <div key={crypto.Id} className="crypto-item" onClick={() => handleCryptoSelect(crypto.Symbol)}>
                        <h2>{crypto.CoinName} ({crypto.Symbol})</h2>
                    </div>
                ))}
            </div>
            {selectedCrypto && <CryptoDetail selectedCrypto={selectedCrypto} />}
        </div>
    );
}

export default CryptoList;