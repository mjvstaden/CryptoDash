import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeId } from './store';    

export default function WatchList() {
    const dispatch = useDispatch();

    interface RootState {
        idList: string[];
      }
            
    const idList = useSelector((state: RootState) => state.idList);

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
    
    const [watchList, setWatchList] = useState<CoinData[]>([]);
    const [error, setError] = useState<string | null>(null);

    console.log(idList);
      
    useEffect(() => {
        if (idList.length > 0) {

            const options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {vs_currency: 'zar', ids: idList.join(',')},
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'}
            };
            
            axios
            .request(options)
            .then(function (response) {
                setWatchList(response.data);
            })
            .catch(function (error) {
                setError(error.message);
              });

        } else {
            setWatchList([]);
        }
    }, [idList]); 

    function handleMoreInfo(id: string) {

    }

  return (
    <>
    <h1>Watch List </h1>
      <div style={{ maxHeight: '85%', maxWidth: '70%', overflowY: 'auto' }}>
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
            {watchList.map(result => (
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

