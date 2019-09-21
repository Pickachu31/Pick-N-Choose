import React from 'react';

const SearchResults = (props) => {

  let results = props.state.destinations.map((city, ind) => (
    <City key={ind} location={city.CityName} price={city.MinPrice}/>)
  );

  return (
    <div>
      <div id="SearchAreaTitle">
        <h4>Search Results</h4>
      </div>
      <div id="SearchResults">
        {results}
      </div>
    </div>
  )
}

export default SearchResults;