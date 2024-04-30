import { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function useCoinData(url: string, params: any) {
  const [data, setData] = useState<CoinData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (params === null) {
        setData([]);
        setError(null);
        return;
    }

    const fetchData = async () => {
      const options = {
        method: 'GET',
        url,
        params,
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'}
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [url, params]);

  return { data, error };
}