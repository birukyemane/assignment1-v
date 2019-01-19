import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

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

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
                  name={station.name}
                  address= {station.address}
                  evses = {station.evses}
                  position={{lat: station.latitude, lng: station.longitude}}
                  status = {station.status}
                  icon = {(station.status === 0? disconnectedIcon: (station.status === 1?availableIcon:busyIcon))} // change the marker icon based on the status 
                />
    });    

    return (
        <div>
            <VirtaMap centerAroundCurrentLocation google={this.props.google} onClick={this.mapClicked}>
                <Marker onClick={this.onMarkerClick} name={'current location'} icon={currentLocationIcon}/>
                {stationMarkers}                
            </VirtaMap>
            <Info visible={this.state.showingInfoWindow} name={this.state.selectedPlace.name} address={this.state.selectedPlace.address} evses={this.state.selectedPlace.evses}/>
        </div>
        
    );
  }
}
//                   

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB0i1q7Wfcubj6j01i7XEf-lLukuaL4A1o'
})(MapContainer);