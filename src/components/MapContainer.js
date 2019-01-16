import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

/*  - chekout the documentation for google-maps-react from https://www.npmjs.com/package/google-maps-react   
    - A Google Maps API Key : you can get it from here https://developers.google.com/maps/documentation/javascript/get-api-key
*/

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
 
  render() {
    const stationMarkers = this.props.stations.map((station,index) =>{
      return <Marker key={index+1} onClick={this.onMarkerClick}
                name={station.name}
                position={{lat: station.latitude, lng: station.longitude}} />
    });
    return (
      <Map google={this.props.google}
          onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} 
                position={{lat: 37.778519, lng: -122.405640}} />
        {stationMarkers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({  // 
  apiKey: 'AIzaSyB0i1q7Wfcubj6j01i7XEf-lLukuaL4A1o' // YOUR_GOOGLE_API_KEY_GOES_HERE
})(MapContainer);