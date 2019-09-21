import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
  render() {
    return (
      <div className="map">
        <Map style={mapStyle} google={this.props.google} zoom={8}>
        <Marker onClick={this.onMarkerClick}
            name={'California'} />
        </Map>
      </div>
    );
  }
}
const mapStyle = {
  height: '250px',
  width: '80%',
  margin: '5px auto',
  padding: '5px'
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCkWXqlnmxZr60qyhXg6BUkT_N33xyL8E0'
})(MapContainer)