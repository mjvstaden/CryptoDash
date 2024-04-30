import Search from './components/Search';
import Top10 from './components/Top10';
import WatchList from './components/Watchlist';

export default function App(){
  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <Top10 />
      <div style={{ float: 'right', maxWidth: '25%', minWidth: '25%', margin: '-40px 0px'}}> 
          <Search />
        </div>
      <WatchList/>
    </div>
  )
}