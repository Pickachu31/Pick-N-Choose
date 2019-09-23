import React from 'react';
import Map from '../components/Map.jsx';
import SearchArea from '../components/SearchArea.jsx';

//technically the parent component but oh well. this basically prop drills to the child components
const MainContainer = (props) => {
  return (
    <div>
      {/* Map component will render the google map's API*/}
      <Map state= {props.state} center={props.center} />
      <SearchArea 
        changeClientViewToBusinesses={props.changeClientViewToBusinesses}
        setCoordinates={props.setCoordinates}
        activities={props.activities} 
        findActivities={props.findActivities} 
        state={props.state} 
        searchQuery={props.searchQuery}/>
    </div>
  )
};

export default MainContainer;