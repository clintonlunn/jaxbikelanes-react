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
      
      layer.options.color = "blue";
      layer.bindPopup(JSON.stringify(lane.properties));
    
    } else if (lane.properties["cycleway:left"] != null) {

      layer.options.color = "blue";
      layer.options.dashArray = "5,10";
      
      layer.bindPopup(JSON.stringify(lane.properties));
    } else if (lane.properties["cycleway:right"] != null) {

      layer.bindPopup(JSON.stringify(lane.properties));
      layer.options.color = "blue";
      layer.options.dashArray = "5,10";
      
    } else if (lane.properties.highway === "cycleway") {
      
      layer.bindPopup(JSON.stringify(lane.properties));
      layer.options.color = "blue";
    
    } else if (lane.properties.bicycle === "designated") {
      layer.bindPopup(JSON.stringify(lane.properties));
      layer.options.color = "blue";
      layer.options.dashArray = "5,5";
    }
    
  };

  render() {
    return (
        <div>
            <h1>hi</h1>
            <MapContainer style={{height: '80vh'}} zoom={10} center={[30.3, -81.6]}>
              <GeoJSON data={bikeData.features} onEachFeature={this.onEachLane}/>
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
