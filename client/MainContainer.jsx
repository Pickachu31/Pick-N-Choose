import React from 'react';
import Map from './Map.jsx';
import SearchArea from './SearchArea.jsx';

const MainContainer = (props) => {

  return (
    <div>
      <Map state= {props.state}/>
      <SearchArea state= {props.state} searchQuery={props.searchQuery}/>
    </div>
  )
};

export default MainContainer;