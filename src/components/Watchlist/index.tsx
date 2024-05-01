import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeId, setIdList } from '../../store';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WatchList() {
  interface RootState {idList: string[];}
  const idList = useSelector((state: RootState) => state.idList);
  //const coinDataArgs = idList.length > 0 ? {vs_currency: 'ZAR', ids: idList.join(',')} : null;
  //const { data: watchList, error } = useCoinData('https://api.coingecko.com/api/v3/coins/markets', coinDataArgs);
  const dispatch = useDispatch();

  const [watchList, setWatchList] = useState<CoinData[]>([]);
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
    if (idList.length === 0) {
      setWatchList([]);
      setError(null);
      return;
    }
    
    const fetchData = async () => {
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {vs_currency: 'zar', ids: idList.join(',')},
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'}
        };

  try {
    const response = await axios.request(options);
    setWatchList(response.data);
    setError(null);
  } catch (error) {
    console.error(error);
    setError('Failed to fetch data. Please try again later.');
  }
};

fetchData();
const timer = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes
return () => clearInterval(timer);
}, [idList]); 

  function handleRemove(id: string) {
    dispatch(removeId(id));
  }

  return (
    <>
    <h1>Watchlist </h1>
      <div style={{ maxHeight: '85%', maxWidth: '70%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Rank</th>
              <th style={{ textAlign: 'left' }}>Symbol</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'right' }}>Price</th>
              <th style={{ textAlign: 'right' }}>Change (24h)</th>
              <th style={{ textAlign: 'right' }}>Change % (24h)</th>
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
                <td style={{ textAlign: 'right', color: result.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                  {result.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>
                  <button style={{ float: 'right'}}>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/more-info/` + result.id}>More Info</Link>
                  </button>
                  <button style={{ float: 'right'}} onClick={() => handleRemove(result.id)}>
                    Remove
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

