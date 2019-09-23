import GoogleMapReact from 'google-map-react';
import React, {useState} from 'react';

const Marker = props => {
  // console.log('props', props)
  const [boxVisible, setBoxVisible ] = useState(false);

  const toggleBox = () => {
    if (boxVisible) {
      setBoxVisible(false);
    } else {
      setBoxVisible(true);
    }
  }

  const boxStyle = {
    display: 'none', /* Hidden by default */
    position: 'fixed', /* Stay in place */
    'z-index': '1', /* Sit on top */
    left: '0',
    top: '0',
    width: '100%', /* Full width */
    height: '100%', /* Full height */
    overflow: 'auto', /* Enable scroll if needed */
    'background-color': 'rgb(0,0,0)', /* Fallback color */
    'background-color': 'rgba(0,0,0,0.4)' /* Black w/ opacity */
    
  }

  return <div className={boxVisible ? 'marker' : null} onClick={toggleBox} >
    <div className="pin"></div>
    <div className="pulse"></div>
  </div>
}

export default Marker;
