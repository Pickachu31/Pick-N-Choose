//google map npm module that allows us to render a google map
import GoogleMapReact from 'google-map-react';
import React, {useState} from 'react';
const keys = require('../../apiKeys');
// map component that renders the client view of the map, it will change the view via 'center' and how close the client's view is via 'zoom'
  //default latitude and longitude (set to california)
import Marker from './Marker.jsx';
const Map = ({center, state, destination, activities})=> {
  const [isCenter, setIsCenter] = useState({lat: 36.778259, lng: -119.417931});
  //setting zoom to further away
  const [isZoomed, setIsZoomed] = useState(6);
  //checking if the center has been changed, if so, go ahead and move the center view as well as zoom in
  const [isNewCoordinates, setIsNewCoordinates] = useState(false);
  
  if (isCenter.lat !== center.lat){
    setIsCenter(center);
    setIsZoomed(10)
  }
  //mapping markers so that the business markers will display
  const setCenterObj ={};
  state.coordinates.forEach(el =>{
    setCenterObj.lat = el.latitude;
    setCenterObj.lng = el.longitude;
  })
  if (state.coordinates.length !== 0 && !isNewCoordinates){
    setIsCenter(setCenterObj);
    // setIsZoomed(8)
    setIsNewCoordinates(true);
  }
  const displayMarkers = activities.map((activity, index) =>{
    return <Marker center={{lat:activity.latitude, lng:activity.longitude}} activity={activity} lat={activity.coordinates.latitude} lng={activity.coordinates.longitude}/>
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
const mapStyle = {
  height: '250px',
  width: '80%',
  margin: '5px auto',
  padding: '5px'
}
export default Map;
