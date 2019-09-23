import React, { Component } from 'react';
//this is for google map's API to grab the longitude/latitude of an input string(useful in searchQuery method)
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [{placeId: 'Los Angeles', min: '2900000'}, {placeId: 'Las vegas', min: '3201'}],
      activities: [],
      coordinates: [],
      //this center property within the state is centered on california
      center: {lat: 36.778259, lng: -119.417931},
      isLoggedIn: false,
    };
    this.searchQuery = this.searchQuery.bind(this);
    this.findActivities = this.findActivities.bind(this);
    this.setCoordinates = this.setCoordinates.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  searchQuery(destination, departureDate, returnDate, dollarAmount){
    geocodeByAddress(destination)
    .then(results => getLatLng(results[0]))
    .then(({lat,lng}) =>{
      this.setState({ center: {lat, lng}});
    }
    );

    fetch('/airportFetch', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({destination, departureDate, returnDate, dollarAmount})
    })
    .then(res => res.json())
    .then(result => {
      let tempDestinations = [];
      result.prices.forEach(destinationObj=>{
        if (destinationObj.price !== null) {
          tempDestinations.push({placeId: destinationObj.city, min: JSON.stringify(destinationObj.price)})
        }
      })
      this.setState({destinations: tempDestinations})
    })
    .catch(err =>{
      console.log('Error in search Query in Map Component.');
      return new Error(err);
    })
  }

  findActivities(destination){
    fetch('/events&activities', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({destination})
    })
    .then(res =>{
      return res.json();
    })
    .then(result =>{
      console.log('here in find activities parent component', result.activities);
      this.setState({activities: result.activities})
    })
  }

  setCoordinates(arrayOfCoordinates){
    this.setState({coordinates: arrayOfCoordinates});
  }
  loginValidation(username, password){
    fetch('/loginValidation', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(res =>{
      return res.json();
    })
    .then(result =>{
      if (result.authenticated){
        this.setState({isLoggedIn:true});
      }
    })
    .catch(err =>{
      return new Error(err);
    })
  }
  isLoggedIn(boolean){
    if (boolean){
      this.setState({isLoggedIn:true});
    }
  }
  render() {
    return (
      !this.state.isLoggedIn ? <div>
      <span><img id="pikaImg" src="./assets/Pikachu-PNG-HD.png"></img></span>
      <h1>Pickn'Choose</h1><h6>Budget Travel</h6>
      <Login isLoggedIn={this.isLoggedIn} loginValidation={this.loginValidation}></Login>
      </div> :
      <div id='outercontainer'>
        <div id="Header">
        <span><img id="pikaImg" src="./assets/Pikachu-PNG-HD.png"></img></span>
        <h1>Pickn'Choose</h1><h6>Budget Travel</h6>
        </div>
        <MainContainer
          destination={this.state.destination}
          center = {this.state.center}
          state={this.state}
          searchQuery={this.searchQuery}
          findActivities={this.findActivities}
          activities={this.state.activities}
          setCoordinates={this.setCoordinates}
          />
      </div>
    )
  }
}

export default App;
