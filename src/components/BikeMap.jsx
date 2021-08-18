import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import bikeData from '../data/jaxbikelanes-lines.json';
import "leaflet/dist/leaflet.css";
import "./BikeMap.css";

console.log(bikeData);

class BikeMap extends Component {
    state = {};

  componentDidMount() {
      console.log(bikeData);
  }

  bikeLaneStyle = {
    color: "red"
  }

  onEachLane = (lane, layer) => {
    
    if (lane.properties.cycleway != null) {
      console.log('lane is a cycleway');
      layer.bindPopup("cycleway");
    } else if (lane.properties["cycleway:left"] != null) {
      layer.bindPopup("cycleway:left");
    } else if (lane.properties["cycleway:right"] != null) {
      layer.bindPopup("cycleway:right");
    } else if (lane.properties.highway === "cycleway") {
      layer.bindPopup("highway = cycleway");
    }
    
  };

  render() {
    return (
        <div>
            <h1>hi</h1>
            <MapContainer style={{height: '80vh'}} zoom={10} center={[30.3, -81.6]}>
              <GeoJSON style={this.bikeLaneStyle} data={bikeData.features} onEachFeature={this.onEachLane}/>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
        </div>
      );
  }
}

export default BikeMap;
