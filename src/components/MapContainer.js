import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import markerIcon from '../assets/marker.png' // a custom icon.

/*  - chekout the documentation for google-maps-react from https://www.npmjs.com/package/google-maps-react   
    - A Google Maps API Key : you can get it from here https://developers.google.com/maps/documentation/javascript/get-api-key
*/

const style = {
  width: '100%',
  height: '100%',  
}

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
                id= {station.id} // pass ID of the station. this is to test if we can pass additional props 
                position={{lat: station.latitude, lng: station.longitude}}
                icon = {(station.latitude < 0? markerIcon:'')} //if its in south hemisphere use custom icon else use default icon
                />
    });
    return (
      <Map google={this.props.google}
          onClick={this.onMapClicked}
          style={style}
            zoom={14}   // the higher the no. it zoom in more 
            initialCenter={{  // center th map at Helsinki center
              lat: 60.166772,
              lng: 24.933648
            }}>
       
        {stationMarkers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.id}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({  // 
  apiKey: 'AIzaSyB0i1q7Wfcubj6j01i7XEf-lLukuaL4A1o' // YOUR_GOOGLE_API_KEY_GOES_HERE
})(MapContainer);