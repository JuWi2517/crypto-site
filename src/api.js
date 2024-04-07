import axios from 'axios';

const API_KEY = 'cc5fbaf811a34712fd4d968c99296fcd8c904a214cc6b26ace50566bd4ece304';

export async function fetchTopCryptos() {
    try {
        const response = await axios.get(`/data/top/mktcapfull?limit=20&tsym=USD&api_key=${API_KEY}`);

        if (response.status !== 200) {
            console.error('API response not OK:', response);
            throw new Error('API response not OK');
        }
        const data = response.data.Data;
        if (!Array.isArray(data)) {
            console.error('Fetched data is not an array:', data);
            throw new Error('Fetched data is not an array');
        }
        return data;
    } catch (error) {
        console.error('Error fetching top cryptos:', error);
        return [];
    }
}