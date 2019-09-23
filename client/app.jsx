import React, { Component } from 'react';

import MainContainer from './containers/MainContainer.jsx';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [{placeId: 'Las Vegas', min: 50}, {placeId:'Montana', min: 75}],
      todos: [],
    };
  }
  
  componentDidMount () {

  }

  componentDidUpdate () {

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

    console.log('in app component', this.state)
    return (
      <div id='outercontainer'>
        <div id="Header">
        <img id="pikaImg" src="./client/Pikachu-PNG-HD.png"></img>
        <h1>Pickn'Choose Budget Travel</h1>
        </div>
        <MainContainer state={this.state} searchQuery={this.searchQuery}/>
      </div>
    )
  }
}

export default App;