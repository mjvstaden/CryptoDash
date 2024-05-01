import Top10 from '../Top10';
import Search from '../Search';
import Watchlist from '../Watchlist';

export default function Dashboard() {
    return (
        <div>
        <h1>Crypto Dashboard</h1>
        <Top10 />
        <div style={{ width: '30%', float: 'right'}}> 
            <Search />
        </div>
        <Watchlist/>
        </div>
    )
}