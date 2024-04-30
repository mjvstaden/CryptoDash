import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import { useSelector } from 'react-redux';
import Top10 from './topCryptos';
import WatchList from './WatchList';

interface RootState {
  idList: string[];
}

export default function App(){

  const idList = useSelector((state: RootState) => state.idList);

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