//google map npm module that allows us to render a google map
import GoogleMapReact from 'google-map-react';
import React, {useState} from 'react';
const keys = require('../../apiKeys');
// map component that renders the client view of the map, it will change the view via 'center' and how close the client's view is via 'zoom'
const Map = ({center, state})=> {
  //default latitude and longitude (set to california)
  const [isCenter, setIsCenter] = useState({lat: 36.778259, lng: -119.417931});
  //setting zoom to further away
  const [isZoomed, setIsZoomed] = useState(6);
  //checking if the center has been changed, if so, go ahead and move the center view as well as zoom in
  if (isCenter.lat !== center.lat){
    setIsCenter(center);
    setIsZoomed(12)
  }
  //mapping markers so that the business markers will display
  const displayMarkers = state.coordinates.map((obj,index) =>{
    return <Marker center={{lat:obj.latitude, lng:obj.longitude}} lat={obj.latitude} lng={obj.longitude}/>
  })
  // native component to google-map-react, using the key that I generated, please generate your own key and use that instead
  return <div style={mapStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keys.googleAPIkey }}
        center={isCenter}
        zoom={isZoomed}
      >
      {displayMarkers}
      </GoogleMapReact>
    </div>
    
}
const Marker = () => {
  return <div>
    <div className="pin"></div>
    <div className="pulse"></div>
  </div>
}
const mapStyle = {
  height: '250px',
  width: '80%',
  margin: '5px auto',
  padding: '5px'
}
export default Map;
