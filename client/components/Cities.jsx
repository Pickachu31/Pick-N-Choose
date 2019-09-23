import React, {useState} from 'react';
import ShowActivities from './ShowActivities.jsx'
//used react hooks, sorry for the inconsistency(from react -> react hooks), but here is a link: https://reactjs.org/docs/hooks-intro.html
// thankfully the documentation for react hooks are very helpful.
const City = (props) => {
  const [isClickedForActivities, setIsClickedForActivities] = useState(false);
  const [isCurrentLocation, setIsCurrentLocation] = useState('');

  //using conditional rendering to check if the isCurrentLocation is either T:F (depending on the state, it will render a respective component)
  return (
<<<<<<< HEAD
    <div id="city">
      <h3>{props.location}</h3>
      {/* <div> */}
      <h2>{props.price}</h2>
      {/* <p></p> */}
      {/* </div> */}
    </div>
=======
    !isCurrentLocation?
      (<div id="city">
        <button style={{width:'auto',height:'20px'}} onClick={ ()=>{
          // this button onclick will fire off the findActivities method in our app.jsx (parent) component, it will route to the server.js file,
          //where the yelp API will fetch the first 15 activities;
          props.findActivities(props.location)
          //changes the isCurrentLocation state from falsey (empty string) to truthy (a string length > 0);
          setIsCurrentLocation(props.location);
        }}>
        Find some activities! </button>
          <h3>{props.location}</h3>
          <h2>{props.price}</h2>
          <h6>Disclaimer: Prices do not include fees and Taxes</h6>
      </div>) : (
          <ShowActivities 
            setCoordinates={props.setCoordinates}
            location={props.location} 
            activities={props.activities}
            isClickedForActivities={isClickedForActivities}
            state={props.state}
          />)
>>>>>>> master
  );
}
export default City;