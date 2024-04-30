import { useSelector } from 'react-redux';
import useCoinData from './hooks/coinData';

export default function WatchList() {
  interface RootState {idList: string[];}
  const idList = useSelector((state: RootState) => state.idList);
  const coinDataArgs = idList.length > 0 ? {vs_currency: 'ZAR', ids: idList.join(',')} : null;
  const { data: watchList, error } = useCoinData('https://api.coingecko.com/api/v3/coins/markets', coinDataArgs);
   
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

