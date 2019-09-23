import React from 'react';

//child component called in the conditional rendering of above
const ShowActivities = ({activities, setCoordinates})=>{

    //filtering businesses that are closed, we don't want to direct clients to places that are closed...
    const openBusinesses = activities.filter(el=>{
      return !el.is_closed
    })
    //sorting the ratings of the businesses via yelp (higher ratings come first)
    openBusinesses.sort((a,b)=>{
      return b.rating - a.rating;
    })
    //iterating through the activities (array of objects with data from the yelp API request) and grabbing the coordinates of each location
    const coordinates = [];
    activities.forEach(el =>{
      coordinates.push(el.coordinates)
    })
    //creates a component for each of the businesses that came in the request of the yelp API
    const displayActivities = openBusinesses.map((el, ind) =>{
      return (
      <div id="displayActivitiesComponent" key={ind} >
          <img src={`${el.image_url}`} style={{height:'75px', width:'75px'}}></img>
          <center><h3>{el.name}</h3></center>
          <h5>Rated {el.rating} out of <strong>5</strong> w/ {el.review_count} reviews</h5>
          <h5>Phone: {el.display_phone}</h5>
          <a href={`${el.url}`}>Contact Website: {el.name}</a>
      </div>
      );
    })

    return (
      <center><div id="activities">
        {displayActivities}
      </div></center>
    )
}

export default ShowActivities;
