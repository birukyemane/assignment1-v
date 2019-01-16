import React, { Component } from 'react';
import './App.css';

import MapContainer from './components/MapContainer';
import axios from 'axios';


class App extends Component {
  state = {
    stations:[]
  };

  componentDidMount () {  
      axios.get('https://api.virta.fi/v4/stations').then((response) => {
          this.setState({
              stations:response.data
          }) // error handling ? 
      })
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Virta stations</h1>
        </div>
         <MapContainer stations={this.state.stations}/>
      </div>
    );
  }
}

export default App;
