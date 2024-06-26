import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Top10() {
  // const { data: topCurrencies, error } = useCoinData('https://api.coingecko.com/api/v3/coins/markets', {vs_currency: 'ZAR', order: 'market_cap_desc', per_page: '10'});
  const [topCurrencies, setTopCurrencies] = useState<CoinData[]>([]);
  const [error, setError] = useState<string | null>(null);

  interface CoinData {
    id: string;
    name: string;
    symbol: string;
    image: string;
    market_cap: number;
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_rank: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {vs_currency: 'zar', per_page: '10'},
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'}
      };

      try {
        const response = await axios.request(options);
        setTopCurrencies(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
    const timer = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(timer);
  }, []); 

  function handleMoreInfo(id: string) {

  }

  return (
    <>
    <h3 style={{marginBottom: '-10px'}}>Top 10 Cryptocurrencies by Market Cap</h3>
    <p>(Refreshes every 5 min)</p>
      <div style={{ maxHeight: '85%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Rank</th>
              <th style={{ textAlign: 'left' }}>Symbol</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'right' }}>Market Cap (ZAR)</th>
              <th style={{ textAlign: 'right' }}>Price (ZAR)</th>
              <th style={{ textAlign: 'right' }}>Change (24h)</th>
              <th style={{ textAlign: 'right'}}>Change % (24h)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {topCurrencies.map(result => (
              <tr key={result.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ textAlign: 'left' }}>{result.market_cap_rank}</td>
                <td style={{ textAlign: 'left' }}>
                  <img src={result.image} alt={result.name} style={{ width: '20px', height: '20px', objectFit: 'cover', marginRight: '10px' }} />
                  {result.symbol}
                </td>
                <td style={{ textAlign: 'left' }}>{result.name}</td>
                <td style={{ textAlign: 'right' }}>{result.market_cap.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>{result.current_price.toLocaleString()}</td>
                <td style={{ textAlign: 'right', color: result.price_change_24h < 0 ? 'red' : 'green' }}>
                    {result.price_change_24h ? result.price_change_24h.toFixed(2) : 'N/A'}
                </td>
                <td style={{ textAlign: 'right', color: result.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                    {result.price_change_percentage_24h ? result.price_change_percentage_24h.toFixed(2) : 'N/A'}%
                </td>
                <td>
                  <button style={{ float: 'right'}}>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/more-info/` + result.id}>More Info</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

