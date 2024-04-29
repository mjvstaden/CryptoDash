import axios from 'axios';
import { useState } from 'react';

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

    function handleMoreInfo(id: string) {

    }

  return (
    <>
        // Display the top 10 cryptocurrencies here
        <div style={{ maxHeight: '85%', overflowY: 'auto', display: 'flex', justifyContent: 'space-between' ,flexWrap: 'wrap'}}>
            {topCurrencies.map(result => (
              <div key={result.id} style={{ margin: '2px', display: 'flex', alignItems: 'center', width: '100%' }}>
                <h2>{result.market_cap_rank}</h2>
                <img src={result.image} alt={result.name} style={{ width: '20px', height: '20px', objectFit: 'cover', marginRight: '10px' }} />
                <h3 style= {{margin: '10px'}}>{result.symbol}</h3>
                <h3 style= {{margin: '10px'}}>{result.name}</h3>
                <button style={{float: 'right'}} onClick={() => handleMoreInfo(result.id)}>
                    More Info
                </button>
              </div>
            ))}
            </div>
    </>
  )
}

