import React, { Component } from 'react';
import MainContainer from './MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [{}],
      todos: [],
    };
  }

  searchQuery (e) {
    
    const destination = e.target.Destination.value;
    const departDate = e.target.DepartureDate.value;
    const returnDate = e.target.ReturnDate.value;
    const budget = e.target.DollarAmount.value;
    fetch('/airportFetch', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({destination, departDate, returnDate, budget})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    // .then(res => this.setState({destinations: res}));
  }

  render() {
    return (
      <div id='outercontainer'>
        <div id="Header">
        <img src="./client/Pikachu-PNG-HD.png"></img>
        <h1>Pick_and_Choose Budget Travel</h1>
        </div>
        <MainContainer state={this.state} searchQuery={this.searchQuery}/>
      </div>
    )
  }
}

export default App;