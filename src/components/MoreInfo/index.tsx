import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './styles.css';
import { Link } from "react-router-dom";

export default function MoreInfo() {
    const { id } = useParams<{ id: string }>();
    const [coinData, setCoinData] = useState<CoinData>();

    interface CoinData {
        name: string;
        market_data: {
          current_price: {
            zar: number;
          };
          market_cap: {
            zar: number;
          };
          price_change_24h: number;
          price_change_percentage_24h: number;
          price_change_percentage_7d: number;
          price_change_percentage_30d: number;
          price_change_percentage_60d: number;
          price_change_percentage_1y: number;
          total_supply: number;
          max_supply: number;
          circulating_supply: number;
        };
        description: {
          en: string;
        };
        hashing_algorithm: string;
        genesis_date: string;
        developer_data: {
          forks: number;
          stars: number;
          subscribers: number;
          total_issues: number;
          closed_issues: number;
          pull_requests_merged: number;
          pull_request_contributors: number;
          code_additions_deletions_4_weeks: {
            additions: number;
            deletions: number;
          };
        };
      }

    useEffect(() => {
    const fetchData = async () => {
        const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VcYQyF479XHu33QXcB6iRCxF'}
        };

        try {
        const response = await axios.request<CoinData>(options);
        setCoinData(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    fetchData();
    }, [id]);

    return (
    <div className="crypto-info">
        <Link to="/">Back to Dashboard</Link>
    {coinData ? (
      <div className="crypto-info">
      <h2>{coinData.name}</h2>
      <div className="info-group">
        <p>Description:</p>
        <div style={{whiteSpace: 'pre-line'}} dangerouslySetInnerHTML={{ __html: coinData?.description.en }} />
      </div>
      <h3>Market data</h3>
      <div className="info-group">
        <p>Price:</p>
        <p>R{coinData?.market_data?.current_price.zar?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Market Cap:</p>
        <p>R{coinData?.market_data?.market_cap.zar?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>24h Change:</p>
        <p>{coinData?.market_data?.price_change_24h?.toFixed(2)}</p>
      </div>
      <div className="info-group">
        <p>24h Change Percentage:</p>
        <p>{coinData?.market_data?.price_change_percentage_24h?.toFixed(2)}%</p>
      </div>
      <div className="info-group">
        <p>7d Change Percentage:</p>
        <p>{coinData?.market_data?.price_change_percentage_7d?.toFixed(2)}%</p>
      </div>
      <div className="info-group">
        <p>30d Change Percentage:</p>
        <p>{coinData?.market_data?.price_change_percentage_30d?.toFixed(2)}%</p>
      </div>
      <div className="info-group">
        <p>60d Change Percentage:</p>
        <p>{coinData?.market_data?.price_change_percentage_60d?.toFixed(2)}%</p>
      </div>
      <div className="info-group">
        <p>1y Change Percentage:</p>
        <p>{coinData?.market_data.price_change_percentage_1y?.toFixed(2)}%</p>
      </div>
      <div className="info-group">
        <p>Total Supply:</p>
        <p>{coinData?.market_data.total_supply ? coinData.market_data.total_supply.toLocaleString() : 'N/A'}</p> 
      </div>
      <div className="info-group">
        <p>Max Supply:</p>
        <p>{coinData?.market_data.max_supply ? coinData.market_data.max_supply.toLocaleString() : 'N/A'}</p>
      </div>
      <div className="info-group">
        <p>Circulating Supply:</p>
        <p>{coinData?.market_data.circulating_supply?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Hashing Algorithm:</p>
        <p>{coinData?.hashing_algorithm}</p>
      </div>
      <div className="info-group">
        <p>Genesis Date:</p>
        <p>{coinData.genesis_date}</p>
      </div>
      <h3>Developer data</h3>
      <div className="info-group">
        <p>Forks:</p>
        <p>{coinData?.developer_data?.forks?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Stars:</p>
        <p>{coinData?.developer_data?.stars?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Subscribers:</p>
        <p>{coinData?.developer_data?.subscribers?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Total Issues:</p>
        <p>{coinData?.developer_data?.total_issues?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Closed Issues:</p>
        <p>{coinData?.developer_data?.closed_issues?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Pull Requests Merged:</p>
        <p>{coinData?.developer_data?.pull_requests_merged?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Pull Request Contributors:</p>
        <p>{coinData?.developer_data?.pull_request_contributors?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Code Additions in Last 4 Weeks:</p>
        <p>{coinData?.developer_data?.code_additions_deletions_4_weeks.additions?.toLocaleString()}</p>
      </div>
      <div className="info-group">
        <p>Code Deletions in Last 4 Weeks:</p>
        <p>{coinData?.developer_data?.code_additions_deletions_4_weeks?.deletions?.toLocaleString()}</p>
      </div>
    </div>    
    ) : (
      <p>Loading...</p>
    )}
  </div>
    )
}