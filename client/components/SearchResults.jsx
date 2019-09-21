import React from 'react';
import City from './Cities.jsx'

const SearchResults = (props) => {
  console.log('in search results', props.state)

  let results = props.state.destinations.map((city, ind) => (
    <City key={ind} location={city.placeId} price={city.min}/>)
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