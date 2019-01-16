import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import './App.css';


const mapStyles = {
  width: '100%',
  height: '100%'
};

class App extends Component {
  render() {
    return (
      <div className="App">
         <MapContainer />
      </div>
    );
  }
}

export default App;
