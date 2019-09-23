import React from 'react';

const SearchBar = (props) => {
  return (
    <div id="SearchBar">
      <div id="SearchFields">
        <form onSubmit={(e)=> {
          e.preventDefault()
          const destination = document.getElementById('Destination').value;
          const departureDate = document.getElementById('DepartureDate').value;
          const returnDate = document.getElementById('ReturnDate').value;
          const dollarAmount = document.getElementById('DollarAmount').value;
          props.searchQuery(destination, departureDate, returnDate, dollarAmount)
          // document.getElementById('Destination').value = ''
          // document.getElementById('DepartureDate').value = ''
          // document.getElementById('ReturnDate').value = ''
          // document.getElementById('DollarAmount').value = ''
        }} id="form" method="post">
        <input id="Destination" type="text" placeholder="Destination" name="Destination" required={true}></input>
        <label>Depart:</label>
        <input id="DepartureDate" type="date" name="DepartureDate" required={true}></input>
        <label>Return:</label>
        <input id="ReturnDate" type="date" name="ReturnDate" required={true}></input>
        <label>Budget?:</label>
        <input id="DollarAmount" type="integer" name="DollarAmount"></input>
        <button type="submit" value="submit form">Let's Travel!</button>
      </form>
      </div>
    </div>
  )
}
export default SearchBar;