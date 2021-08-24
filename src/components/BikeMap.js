import 'leaflet/dist/leaflet.css';
import React,{useState} from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import {features} from '../data/jaxbikelanes-lines.json';
import './BikeMap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';


const Map = ()=>{
    const [onselect, setOnselect] = useState({});
    const cyclewayObj = {};
    /* function determining what should happen onmouseover, this function updates our state*/
    const highlightFeature = (e=> {
        console.log("highlightFeature triggered");
        var layer = e.target;
        const { name, cyclewayleft, cyclewayright, cycleway, highway, maxspeed } = e.target.feature.properties;
        cyclewayObj.cyclewayleft = cyclewayleft;
        cyclewayObj.cyclewayright = cyclewayright;
        cyclewayObj.cycleway = cycleway;
        cyclewayObj.highway = highway;

        setOnselect({
            name:name,
            cyclewayleft: cyclewayleft,
            cyclewayright: cyclewayright,
            cycleway:cycleway,
            highway:highway,
            maxspeed: maxspeed
        });
        layer.setStyle({
            weight: 1,
            color: "black",
            fillOpacity: 1
        });
    });
    /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
    const resetHighlight= (e =>{
        setOnselect({});
        e.target.setStyle(style(e.target.feature));
    })
    /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
    const onEachFeature= (feature, layer)=> {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    const mapBikeLaneColorToClassification = (cyclewayClassObject) => {

        if (cyclewayClassObject.cyclewayleft !== null) {
            // return "#7fb6ef";
            return "#1e7cdc";
        } else if (cyclewayClassObject.cyclewayright !== null) {
            // return "#7fb6ef";
            return "#1e7cdc";
        } else if (cyclewayClassObject.cycleway !== null) {
            return "#1e7cdc";
        } else if (cyclewayClassObject.highway !== null) {
            // return "#0861bd";
            return "#1e7cdc";
        } else {
            return "green"
        }
    }

    const style = (feature => {
        const cyclewayClassObject = {};
        cyclewayClassObject.cyclewayleft = feature.properties.cyclewayleft;
        cyclewayClassObject.cyclewayright = feature.properties.cyclewayright;
        cyclewayClassObject.cycleway = feature.properties.cycleway;
        cyclewayClassObject.highway = feature.properties.highway;
        return ({
            // fillColor: mapPolygonColorToDensity(feature.properties.Desnity),
            weight: 3,
            opacity: 1,
            // color: 'blue',
            color: mapBikeLaneColorToClassification(cyclewayClassObject),
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    const mapStyle = {
        height: '55vh',
        width: '85%',
        margin: '0 auto',
    }
      const feature = features.map(feature=>{
        return(feature);
    });
    return(
         <div className='container'>
            <div className="header">
            <h2 className='heading'>Jacksonville Bike Lanes</h2>
            <p className="text-muted">Jacksonville Bike lanes by classification</p></div>
            <div className="">
                <div className="">
                {!onselect.name && (
                <div className="census-info-hover">
                    <strong>Jacksonville Bike Lanes</strong>
                    <p>Hover on each line for more details</p>
                </div>
                )}
                {onselect.name && (
                    <ul className="census-info">
                       {/* <li><strong>{onselect.county}</strong></li><br/> */}
                        <li>Street Name:{onselect.name}</li>
                        <li>Cycleway:{onselect.cycleway}</li>
                        <li>Highway:{onselect.highway}</li>
                        <li>Maxspeed:{onselect.maxspeed}</li>
                    </ul>
                )}
                <MapContainer zoom={10}
                 scrollWheelZoom={true} 
                  style={mapStyle} 
                   center={[30.3, -81.6]}>
                    <TileLayer
                        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    />
                   {feature && (
                    <GeoJSON data={feature} 
                    style={style} 
                    onEachFeature={onEachFeature}/>
                    )}
                </MapContainer>
                </div>
            </div>
        </div>

    )
}
export default Map;