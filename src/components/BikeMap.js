import 'leaflet/dist/leaflet.css';
import React,{useState} from 'react';
import { withLeaflet, MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import {features} from '../data/jaxbikelanes-lines.json';
// import {bikeParking} from '../data/bikeparking.json';

import './BikeMap.css';
import { mapStyle, createStyle, setLaneStyle } from './util/BikeMapUtil'
// import overpassQuery from './query/overpassQuery';




const Map = ()=> {
    let activeSegment;
    const [onselect, setOnselect] = useState({});
    // const [activeSegment, setActiveSegment] = useState();
    let cyclewayObj = {};
    /* function determining what should happen onmouseover, this function updates our state*/
    const highlightFeature = (e=> {
        let layer = e.target;
        const { name, cyclewayleft, cyclewayright, cycleway, highway, maxspeed, amenity } = e.target.feature.properties;

        cyclewayObj = {
            cyclewayleft: cyclewayleft,
            cyclewayright: cyclewayright,
            cycleway: cycleway,
            highway: highway,
            amenity: amenity
    
        }

        setOnselect({
            name:name,
            cyclewayleft: cyclewayleft,
            cyclewayright: cyclewayright,
            cycleway:cycleway,
            amenity: amenity,
            highway:highway,
            maxspeed: maxspeed
        });
        layer.setStyle({
            weight: 10,
            color: "black",
            fillOpacity: 1
        });

        activeSegment = layer;

    });
    /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
    const resetHighlight = (e =>{
        setOnselect({});
        e.setStyle(createStyle(e.feature));
    })

    const handleClick = (e => {
        if (activeSegment) {
            // reset previous activeSegment style
            resetHighlight(activeSegment)
            highlightFeature(e);
        } else {
            
            highlightFeature(e);
        }
    })

    /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
    const onEachFeature= (feature, layer)=> {
        layer.on({
            // mouseover: highlightFeature,
            // mouseout: resetHighlight,
            // click: highlightFeature,
            click: handleClick,
        });
    }




    const feature = features.map(feature => {
        return(feature);
    });

    // const bikeParkingAm = bikeParking.map(parkingSpot => {
    //     return parkingSpot;
    // })


    return(
         <div className='container'>
            {/* <div className="header">
            <h2 className='heading'>Jacksonville Bike Lanes</h2>
            <p className="text-muted">Jacksonville Bike lanes by classification</p>
            </div> */}
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
                        <li>CyclewayLeft:{onselect.cyclewayleft}</li>
                        <li>CyclewayRight:{onselect.cyclewayright}</li>
                        <li>HighwayCycleway:{onselect.highway}</li>
                        <li>Bike Parking:{onselect.amenity}</li>
                        <li>Maxspeed:{onselect.maxspeed}</li>
                    </ul>
                )}
                <MapContainer zoom={12}
                 scrollWheelZoom={true} 
                  style={mapStyle} 
                   center={[30.3, -81.6]}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                   {feature && (
                    <GeoJSON data={feature}
                    // <GeoJSON data={overPassResults} 
                    style={createStyle} 
                    onEachFeature={onEachFeature}/>
                    )}

                    {/* {bikeParkingAm && (
                    <GeoJSON data={bikeParkingAm}
                    // <GeoJSON data={overPassResults} 
                    />
                    )} */}
                </MapContainer>
                </div>
            </div>
        </div>

    )
}
export default Map;