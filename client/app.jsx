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
    //binding the context of the state to these methods
    this.searchQuery = this.searchQuery.bind(this);
    this.findActivities = this.findActivities.bind(this);
    this.setCoordinates = this.setCoordinates.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.changeClientViewToBusinesses = this.changeClientViewToBusinesses.bind(this);
  }

  //when the user passes in these arguments and clicks 'Let's Travel' than it will trigger this function
  searchQuery(destination, departureDate, returnDate, dollarAmount){
    //this will grab the destination's latitude and longitude via the npm module 'react-places-autocomplete'
    geocodeByAddress(destination)
    .then(results => getLatLng(results[0]))
    .then(({lat,lng}) =>{
      //setting the state to center so that the map can center in on the area
      this.setState({ center: {lat, lng}})
    });
    //fetching airport data

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
  //fetching activities data check server.js for routes
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
  //setting the coordinates so that the markers can appear

  setCoordinates(arrayOfCoordinates){
    this.setState({coordinates: arrayOfCoordinates});
  }
  //checking if the input username & input password matches the hashed password stored in PG
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
  changeClientViewToBusinesses(coordinates){
    // console.log('here in change client view', coordinatesAtIndex0);
    this.setState({center: {lat:coordinates.latitude, lng: coordinates.longitude}})
  }
  render() {
    return (
      !this.state.isLoggedIn ? <div id="page">
        <div id="login">
          <div id="loginImageAndTitle">
            <img id="pikaImg" src="./assets/Pikachu-PNG-HD.png"></img>
            <div id="loginMainTitle">
            <h1>Pickn'Choose</h1><h5>Budget Travel</h5>
            </div>
          </div>
        </div>
      <Login isLoggedIn={this.isLoggedIn} loginValidation={this.loginValidation}></Login>
      </div> :
      <div id='outercontainer'>
        <div id="Header">
          <div id="imageAndTitle">
            <img id="pikaImg" src="./assets/Pikachu-PNG-HD.png"></img>
            <div id="mainTitle">
            <h1>Pickn'Choose</h1>
            <h5>Budget Travel</h5>
            </div>
            <img id="pikaImg" src="./assets/Pikachu-PNG-HD.png"></img>
          </div>
        </div>
        <MainContainer
          destination={this.state.destination}
          center = {this.state.center}
          state={this.state}
          searchQuery={this.searchQuery}
          findActivities={this.findActivities}
          activities={this.state.activities}
          setCoordinates={this.setCoordinates}
          changeClientViewToBusinesses={this.changeClientViewToBusinesses}
          />
      </div>
    )
  }
}

export default App;
