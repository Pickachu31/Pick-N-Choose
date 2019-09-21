import React from 'react';
import Map from '/Map';
import SearchArea from '/SearchArea`';

const MainContainer = (props) => {

  return (
    <div>
      <Map state= {props.state}/>
      <SearchArea state= {props.state} searchQuery={props.searchQuery}/>
    </div>
  )
};

export default MainContainer;