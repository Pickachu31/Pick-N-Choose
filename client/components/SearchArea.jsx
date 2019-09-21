import React from 'react';
import SearchBar from './SearchBar.jsx'
import SearchResults from './SearchResults.jsx'

const SearchArea = (props) => {
  return (
    <div>
      <SearchBar state={props.state} searchQuery={props.searchQuery} />
      <SearchResults state={props.state}/>
    </div>
  )
}

export default SearchArea;