import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Top10() {

    interface CoinData {
        id: string;
        name: string;
        symbol: string;
        image: string;
        market_cap: number;
        current_price: number;
        price_change_24h: number;
        market_cap_rank: number;
        // include other properties as needed
      }
    
    const [topCurrencies, setTopCurrencies] = useState<CoinData[]>([]);
      
    useEffect(() => {
        const fetchData = () => {
          const options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {vs_currency: 'ZAR', order: 'market_cap_desc', per_page: '10'},
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'}
          };
    
          axios
            .request(options)
            .then(function (response) {
              setTopCurrencies(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        };
    
        // Fetch the data immediately
        fetchData();
    
        // Fetch the data every 5 minutes
        const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    
        // Clean up the interval on unmount
        return () => clearInterval(intervalId);
      }, []);

    function handleMoreInfo(id: string) {

    }

  return (
    <>
      <div style={{ maxHeight: '85%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Rank</th>
              <th style={{ textAlign: 'left' }}>Currency</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'right' }}>Price</th>
              <th style={{ textAlign: 'right' }}>Price Change (24h)</th>
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
                <td style={{ textAlign: 'right' }}>{result.current_price}</td>
                <td style={{ textAlign: 'right', color: result.price_change_24h < 0 ? 'red' : 'green' }}>
                  {result.price_change_24h.toFixed(2)}
                </td>
                <td>
                  <button style={{ float: 'right'}} onClick={() => handleMoreInfo(result.id)}>More Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

