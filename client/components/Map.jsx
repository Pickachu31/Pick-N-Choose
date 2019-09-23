import GoogleMapReact from 'google-map-react';
import React, {useState} from 'react';

const Map = ({center, state})=> {
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
  const displayMarkers = state.coordinates.map((obj,index) =>{
    return <Marker lat={obj.latitude} lng={obj.longitude}/>
  })
  return <div style={mapStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCkWXqlnmxZr60qyhXg6BUkT_N33xyL8E0' }}
        center={isCenter}
        defaultZoom={isZoomed}
      >
      {displayMarkers}
      </GoogleMapReact>
    </div>

}
const Marker = props => {
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
