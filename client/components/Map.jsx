import GoogleMapReact from 'google-map-react';
import React, {useState} from 'react';
import Marker from './Marker.jsx';
import apiKeys from '../../apiKeys.js'

const Map = ({center, state, destination, activities})=> {

  const [isCenter, setIsCenter] = useState({lat: 36.778259, lng: -119.417931});
  const [isZoomed, setIsZoomed] = useState(6);
  const [isNewCoordinates, setIsNewCoordinates] = useState(false);

  if (isCenter.lat !== center.lat){
    setIsCenter(center);
  }
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
    return <Marker activity={activity} lat={activity.coordinates.latitude} lng={activity.coordinates.longitude}/>
  })

  return <div style={mapStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKeys['googleApiKey'] }}
        center={isCenter}
        defaultZoom={isZoomed}
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
