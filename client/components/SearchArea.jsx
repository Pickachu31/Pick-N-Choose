import React from 'react';
import SearchBar from './SearchBar.jsx'
import SearchResults from './SearchResults.jsx'

const SearchArea = (props) => {
  return (
    <div>
      <SearchBar state={props.state} searchQuery={props.searchQuery} />
      <SearchResults 
        setCoordinates={props.setCoordinates}
        activities={props.activities} 
        state={props.state} 
        findActivities={props.findActivities}/>
    </div>
  )
}

export default SearchArea;