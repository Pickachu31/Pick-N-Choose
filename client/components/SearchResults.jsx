// import React from 'react';
import City from './Cities.jsx';
import ShowActivities from './ShowActivities.jsx';
import React, {useState} from 'react';

const SearchResults = (props) => {
  const [isClickedForActivities, setIsClickedForActivities] = useState(false);
  const [isCurrentLocation, setIsCurrentLocation] = useState('');

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
        <h3>Search Results</h3>
      </div>
      <div id="SearchResults">
        <div className="queryresults">
        {results}
        </div>
        <div className="displayActivities">
        <ShowActivities 
            setCoordinates={props.setCoordinates}
            location={props.location} 
            activities={props.activities}
            isClickedForActivities={isClickedForActivities}
            state={props.state}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchResults;