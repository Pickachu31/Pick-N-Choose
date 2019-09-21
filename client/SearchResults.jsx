import React from 'react';

const SearchResults = (props) => {

  let results = [];

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