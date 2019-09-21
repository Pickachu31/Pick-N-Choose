import React, { Component } from 'react';
import MainContainer from './MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      todos: [],
    };
  }

  searchQuery (e) {
    const destination = e.target.Destination.value;
    const departDate = e.target.DepartureDate.value;
    const returnDate = e.target.ReturnDate.value;
    const budget = e.target.DollarAmount.value;
    fetch('/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({username: userName, email: eMail, cohort: coHort})
    })
    .then(res => res.json())
    .then(res => this.setState());
  }

  render() {
    return (
      <div>
        <div id="Header">
        <img src="Pikachu img"></img>
        <h1>Pick_and_Choose Budget Travel</h1>
        </div>
        <MainContainer state={this.state} searchQuery={this.searchQuery}/>
      </div>
    )
  }
}

export default App;