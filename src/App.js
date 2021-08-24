import React from 'react';
import './App.css';
// import Map from './components/Map';
import BikeMap from './components/BikeMap';
import Legend from './components/Legend';

const App = () => {
  return (
    <div className = 'container'>
      <BikeMap />
      {/* <Legend /> */}
    </div>
  );
};

export default App;