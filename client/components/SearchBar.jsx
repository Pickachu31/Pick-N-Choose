import React from 'react';
import DateQuery from './dateSelector.jsx'

const SearchBar = (props) => {
  return (
    <div id="SearchBar">
      <div id="SearchFields">
        <form onSubmit={(e)=> {
        e.preventDefault()
        props.searchQuery(e)
        document.getElementById('Destination').value = ''
        document.getElementById('DepartureDate').value = ''
        document.getElementById('ReturnDate').value = ''
        document.getElementById('DollarAmount').value = ''
        }} id="form" method="post">
        <input id ="Destination" type="text" placeholder="Destination" name="Destination" required= {true} ></input>
        <DateQuery id="DepartureDate" name="DepartureDate" requires={true} state={props.state} />
        <DateQuery id="ReturnDate" name="ReturnDate" requires={true} state={props.state} />
        {/* <input id = "DepartureDate" type="text"  name="DepartureDate" required= {true} ></input>
        <input id = "ReturnDate" type="text" name="ReturnDate" required= {true} ></input> */}
        <input id = "DollarAmount" type="number" name="DollarAmount"></input>
        <button type="submit" value="submit form">Let's Travel!</button>
      </form>
      </div>
    </div>
  )
}


export default SearchBar;