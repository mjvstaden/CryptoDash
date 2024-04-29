import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIdList } from './store';

export default function Search() {
    const dispatch = useDispatch();
    const [idList, updateIDList] = useState<string[]>([]);

    interface CoinData {
        id: string;
        name: string;
        symbol: string;
        thumb: string;
        description: string;
        // include other properties as needed
      }
    
      const [searchResults, setSearchResults] = useState<CoinData[]>([]);
    
      const handleSearch = async(query: string) => {
        const options = {
          method: 'GET',
          url: 'https://api.coingecko.com/api/v3/search',
          params: { query },
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'
          }
        };
    
        try {
          const response = await axios.request(options);
          setSearchResults(response.data.coins);
        } catch (error) {
          console.error(error);
        }
      };

      function handleUpdateIDList(id: string) {
        if (idList.includes(id)) {
          return;
        } else {
            updateIDList([...idList, id]);
        }
        dispatch(setIdList([id]))
      }

    return (
        <div>
        <h1>Search</h1>
          <input type="text" style={{ width: '70%'}} onChange={(e) => handleSearch(e.target.value)} />
          <div style={{ maxHeight: '85%', overflowY: 'auto', display: 'flex', justifyContent: 'space-between' ,flexWrap: 'wrap'}}>
            {searchResults.map(result => (
              <div key={result.id} style={{ margin: '2px', display: 'flex', alignItems: 'center', width: '100%' }}>
                <img src={result.thumb} alt={result.name} style={{ width: '20px', height: '20px', objectFit: 'cover', marginRight: '10px' }} />
                <h3 style= {{margin: '10px'}}>{result.symbol}</h3>
                <h3 style= {{margin: '10px'}}>{result.name}</h3>
                <button style={{float: 'right'}} onClick={() => handleUpdateIDList(result.id)}>
                    Add to Favourites
                </button>
              </div>
            ))}
            </div>
        </div>
    )
}