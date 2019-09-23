import React from 'react';
import Map from '../components/Map.jsx';
import SearchArea from '../components/SearchArea.jsx';

const MainContainer = (props) => {
  return (
    <div>
      {/* Map component will render the google map's API*/}
      <Map state={props.state}
           destination={props.destination}
           center={props.center}
           activities={props.activities}/>
      <SearchArea
        setCoordinates={props.setCoordinates}
        activities={props.activities}
        findActivities={props.findActivities}
        state={props.state}
        searchQuery={props.searchQuery}/>
    </div>
  )
};

export default MainContainer;
