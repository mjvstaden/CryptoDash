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
      <h1 style={{ marginTop: '50px'}}>Search</h1>
      <div>
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Thumbnail</th>
            <th style={{ textAlign: 'left' }}>Symbol</th>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(result => (
            <tr key={result.id}>
              <td>
                <img
                  src={result.thumb}
                  alt={result.name}
                  style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                />
              </td>
              <td>{result.symbol}</td>
              <td>{result.name}</td>
              <td>
                <button onClick={() => handleUpdateIDList(result.id)}>
                  Add to Favourites
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}