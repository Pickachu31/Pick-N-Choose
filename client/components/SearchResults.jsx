import React from 'react';
import City from './Cities.jsx'

const SearchResults = (props) => {
  let results = props.state.destinations.map((city, ind) => (
    <City 
      setCoordinates={props.setCoordinates} 
      state={props.state} 
      activities={props.activities} 
      key={`${ind}`} 
      location={city.placeId} 
      price={city.min} 
      findActivities={props.findActivities}
    />
    )
  );
  return (
    <div>
      <div id="SearchAreaTitle">
        <h4>Search Results</h4>
      </div>
      <div id="SearchResults">
        <div>
        {results}
        </div>
      </div>
    </div>
  )
}

export default SearchResults;