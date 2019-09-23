import GoogleMapReact from 'google-map-react';
import React, {useState} from 'react';

const Marker = props => {
  console.log('props', props)
  const [boxVisible, setBoxVisible ] = useState(false);

  const toggleBox = () => {
    if (boxVisible) {
      setBoxVisible(false);
    } else {
      setBoxVisible(true);
    }
  }

  const content = () => {
    if (boxVisible) {
      return (
        <div>
          <img src={`${props.activity.image_url}`}></img>
          <a href={props.activity.url}><h2>{props.activity.name}</h2></a>
          <p>Rating out of 5: {props.activity.rating}</p>
          <p>Number of reviews: {props.activity.review_count}</p>
          <p>Phone: {props.activity.display_phone}</p>
        </div>
      )
    }
  }

  return <div className='marker' onClick={toggleBox} >
    <div className={boxVisible ? 'activityBox' : null} onClick={toggleBox}>{content()}</div>
    <div className="pin"></div>
    <div className="pulse"></div>
  </div>
}

export default Marker;
