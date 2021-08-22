import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import bikeData from '../data/jaxbikelanes-lines.json';
import "leaflet/dist/leaflet.css";
import "./BikeMap.css";

console.log(bikeData);

class BikeMap extends Component {
    state = {};

    onEachLane = (lane, layer) => {
    
      if (lane.properties.cycleway != null) {
        layer.setStyle({
          color: "blue"
        })
        
        layer.bindPopup(JSON.stringify(lane.properties));
      } else if (lane.properties["cycleway:left"] != null) {
        layer.setStyle({
          color: "blue",
          dashArray: "5,10"
        });
        
        layer.bindPopup(JSON.stringify(lane.properties));
      } else if (lane.properties["cycleway:right"] != null) {
        layer.setStyle({
          color: "blue",
          dashArray: "5,10"
        });
  
        layer.bindPopup(JSON.stringify(lane.properties));
      } else if (lane.properties.highway === "cycleway") {
        layer.setStyle({
          color: "blue",
        });
  
        layer.bindPopup(JSON.stringify(lane.properties));
      } else if (lane.properties.bicycle === "designated") {
        layer.setStyle({
          color: "blue",
          dashArray: "5,5"
        });
        layer.bindPopup(JSON.stringify(lane.properties));
  
      }
      
    };

  componentDidMount() {
      console.log(bikeData);
  }

  bikeLaneStyle = {
    color: "red"
  }

  // laneTypeLookup = (lane, layer) => {

    // lookup tables to return case type to feed into setStyle function
    // take in lane and output lane type
    // maybe match to lane designation
  // }

  // function setLaneStyle(lane, layer, case) {
  //   console.log(case);
  //   // take in case and output style
  // }
    
};





  // populatePopup = (lane, layer) => {

  // }

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
