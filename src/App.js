import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import MapContainer from './components/VirtaMap';


class App extends Component {
  state = {
    stations:[]
  };

  componentDidMount () {  
      let stations = [];
      let stationsWithStatus = [];
      axios.get('https://api.virta.fi/v4/stations').then((response) => {
         stations = response.data;
         axios.get('https://api.virta.fi/v4/stations/status').then((response) => {
            stationsWithStatus = response.data;
            stations = stations.map(station=>{
              let result = stationsWithStatus.filter((stationWithStatus)=>{
                return station.id === stationWithStatus.id; 
              })
              if(result.length >0) {               
                station.status = result[0].evses[0].status; // determine the status based on only the status of the first element of the evses.  
              } else {
                station.status = 0;
              }
            return station;
            })    
            this.setState({
              stations: stations
            })
         }).catch(function (error) {
              console.log('stations status error',error);
         }) // error   
      }).catch(function (error) {
          console.log('stations error', error);
      })   // error     
  }

  render() {
    return (
      <div className="App">             
        <MapContainer stations={this.state.stations}/>
      </div>
    );
  }
}

export default App;
