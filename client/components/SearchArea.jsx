import React from 'react';
import SearchBar from './SearchBar.jsx'
import SearchResults from './SearchResults.jsx'

const SearchArea = (props) => {
  return (
    <div>
      <SearchBar state={props.state} searchQuery={props.searchQuery} />
      <SearchResults 
          changeClientViewToBusinesses={props.changeClientViewToBusinesses}
          setCoordinates={props.setCoordinates}
          activities={props.activities} 
          state={props.state} 
          findActivities={props.findActivities}
          changeClientViewToBusinesses={props.changeClientViewToBusinesses}
        />
    </div>
  )
}

export default SearchArea;