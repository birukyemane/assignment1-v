import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';

import VirtaMap from './Map';
import availableIcon from '../assets/available.png';
import busyIcon from '../assets/busy.png';
import disconnectedIcon from '../assets/disconnected.png';
import currentLocationIcon from '../assets/currentLocation.png';
import Info from './Info';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

   mapClicked = (props) => {
    console.log('map clicked');
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    // create markers for each station
    const stationMarkers = this.props.stations.map((station,index) =>{
        return <Marker key={index+1} onClick={this.onMarkerClick}
                  id = {station.id}
                  title = {station.id}
                  position={{lat: station.latitude, lng: station.longitude}}
                  status = {station.status}
                  icon = {(station.status === 0? disconnectedIcon: (station.status === 1?availableIcon:busyIcon))} // change the marker icon based on the status 
                />
    });    

    return (
        <div>
            <VirtaMap centerAroundCurrentLocation google={this.props.google} onClick={this.mapClicked}>
                <Marker title={'current location'} name={'current location'} icon={currentLocationIcon}/>
                {stationMarkers}                
            </VirtaMap>
            <Info visible={this.state.showingInfoWindow} stationId ={this.state.selectedPlace.id}/>
        </div>
        
    );
  }
}
//                   

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB0i1q7Wfcubj6j01i7XEf-lLukuaL4A1o'
})(MapContainer);