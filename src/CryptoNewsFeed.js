import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CryptoNewsFeed.css';

const CryptoNewsFeed = () => {
    const [news, setNews] = useState([]);
    const apiKey = 'c2ae7cfa040bc3907e61e498a258a093';
    const cryptoNewsUrl = `https://gnews.io/api/v4/search?q=cryptocurrency&token=${apiKey}&lang=en`;

    useEffect(() => {
        axios.get(cryptoNewsUrl)
            .then(response => {
                setNews(response.data.articles);
            })
            .catch(error => {
                console.error('There was an error fetching the crypto news:', error);
            });
    }, []);

    return (
        <div>
            <h2>Cryptocurrency News</h2>
            {news.length > 0 ? (
                <ul>
                    {news.map((article, index) => (
                        <li key={index}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                            <p>{article.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading news...</p>
            )}
        </div>
    );
};

export default CryptoNewsFeed;
