import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeId } from './store';    
import Popup from 'react-popup';

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
                setError('Failed to fetch data. Please try again later.');
            });

        } else {
            setWatchList([]);
        }
    }, [idList]); 

    function handleMoreInfo(id: string) {

    }

  return (
    <>
      <h1>WatchList</h1>
        {error && <div>{error}</div>}
        <div style={{ maxHeight: '85%', overflowY: 'auto', display: 'flex', justifyContent: 'space-between' ,flexWrap: 'wrap'}}>
            {watchList.map(result => (
              <div key={result.id} style={{ margin: '2px', display: 'flex', alignItems: 'center', width: '100%' }}>
                <h2>{result.market_cap_rank}</h2>
                <img src={result.image} alt={result.name} style={{ width: '20px', height: '20px', objectFit: 'cover', marginRight: '10px' }} />
                <h3 style= {{margin: '10px'}}>{result.symbol}</h3>
                <h3 style= {{margin: '10px'}}>{result.name}</h3>
                <button style={{float: 'right'}} onClick={() => handleMoreInfo(result.id)}>
                    More Info
                </button>
                <button onClick={() => dispatch(removeId(result.id))}>
                    Remove
                </button>
              </div>
            ))}
        </div>
    </>
  )
}

