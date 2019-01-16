import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

/*  The Map component takes in some optional props such as style(the CSS style object),
    Zoom(number value representing a tighter focus on the map's center) and initialCenter(an object 
    containing latitude and longitude coordinates).

    GoogleApiWrapper is a Higher Order Component(HOC) that provides wrapper around Google APIs.
    
    A Google Maps API Key : you can get it from here https://developers.google.com/maps/documentation/javascript/get-api-key
*/

const mapStyles = {  
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({  // 
  apiKey: 'AIzaSyB0i1q7Wfcubj6j01i7XEf-lLukuaL4A1o' // YOUR_GOOGLE_API_KEY_GOES_HERE
})(MapContainer);