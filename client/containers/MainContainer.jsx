import React from 'react';
import MapContainer from '../components/Map.jsx';
import SearchArea from '../components/SearchArea.jsx';

const MainContainer = (props) => {
  return (
    <div>
      <MapContainer state= {props.state}/>
      <SearchArea state= {props.state} searchQuery={props.searchQuery}/>
    </div>
  )
};

export default MainContainer;