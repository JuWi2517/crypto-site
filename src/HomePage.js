import React, { useEffect, useState } from 'react';
import { fetchTopCryptos } from './api';
import HistoricalData from "./HistoricalData";
import CryptoNewsFeed from "./CryptoNewsFeed";
import './HomePage.css';

function HomePage() {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [marketCapFilter, setMarketCapFilter] = useState('all');
    const [priceChangeFilter, setPriceChangeFilter] = useState('all');
    const [volumeFilter, setVolumeFilter] = useState('all');

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchTopCryptos();
            if (Array.isArray(data) && data.length > 0) {
                setCryptos(data);
                setSelectedCrypto(data[0].CoinInfo.Name);
            }
        };
        loadData();
    }, []);

    const filteredCryptos = cryptos.filter(crypto => {
        const marketCap = crypto?.RAW?.USD?.MKTCAP;
        const priceChangePct = crypto?.RAW?.USD?.CHANGEPCT24HOUR;
        const volume24h = crypto?.RAW?.USD?.VOLUME24HOUR;

        // Market Cap filter logic
        if (marketCapFilter === 'above1B' && marketCap <= 1e9) return false;
        if (marketCapFilter === 'below1B' && marketCap > 1e9) return false;

        // Price Change Percentage filter logic
        if (priceChangeFilter === 'gainers' && priceChangePct <= 0) return false;
        if (priceChangeFilter === 'losers' && priceChangePct > 0) return false;

        // Volume filter logic (example threshold: high volume > $100M, low volume < $100M)
        const highVolumeThreshold = 100000000;
        if (volumeFilter === 'high' && volume24h < highVolumeThreshold) return false;
        if (volumeFilter === 'low' && volume24h >= highVolumeThreshold) return false;

        return true;
    });

    return (
        <div>
            <label htmlFor="marketCapFilter">Tržní kapitalizace:</label>
            <select id="marketCapFilter" value={marketCapFilter} onChange={(e) => setMarketCapFilter(e.target.value)}>
                <option value="all">Vše</option>
                <option value="above1B">Nad 1 miliardu USD</option>
                <option value="below1B">Pod 1 miliardou USD</option>
            </select>

            <label htmlFor="priceChangeFilter">Změna ceny (24h):</label>
            <select id="priceChangeFilter" value={priceChangeFilter} onChange={(e) => setPriceChangeFilter(e.target.value)}>
                <option value="all">Vše</option>
                <option value="gainers">Růst</option>
                <option value="losers">Pokles</option>
            </select>

            <label htmlFor="volumeFilter">Objem (24h):</label>
            <select id="volumeFilter" value={volumeFilter} onChange={(e) => setVolumeFilter(e.target.value)}>
                <option value="all">Vše</option>
                <option value="high">Vysoký objem</option>
                <option value="low">Nízký objem</option>
            </select>

            <label htmlFor="cryptoSelect">Vyberte kryptoměnu:</label>
            <select id="cryptoSelect" value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
                {filteredCryptos.length > 0 ? filteredCryptos.map((crypto) => (
                    <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
                        {crypto.CoinInfo.FullName}
                    </option>
                )) : <option>Žádné shody</option>}
            </select>
            {selectedCrypto && <HistoricalData selectedCrypto={selectedCrypto} />}

            <div className="newsFeed">
                    <CryptoNewsFeed />

            </div>
        </div>
    );
}

export default HomePage;
