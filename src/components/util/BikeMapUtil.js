// general map styling
const mapStyle = {
    height: '100vh',
    width: '100%',
    margin: '0 auto',
}

const setLaneStyle = (cyclewayClassObject) => {
    console.log(cyclewayClassObject);

    // dedicated lane
    if (cyclewayClassObject.highway == 'cycleway') {
        return {            
            weight: 3,
            opacity: 1,
            color: "#0000ce",
            dashArray: "25,25",
            fillOpacity: 0.5
        }
    } else if (cyclewayClassObject.cyclewayright == 'lane' || (cyclewayClassObject.cyclewayleft == 'lane')) {
        return {            
            weight: 3,
            opacity: 1,
            color: "#0000ce",
            dashArray: "10,15",
            fillOpacity: 0.5
        }
    } else if (cyclewayClassObject.cycleway == 'lane') {
        return {            
            weight: 3,
            opacity: 1,
            color: "#0000ce",
            // dashArray: "10,15",
            fillOpacity: 0.5
        }
    } else { // default obj
        return {            
            weight: 3,
            opacity: 1,
            color: "red",
            // dashArray: "10,15",
            fillOpacity: 0.5
        }
    }
}

const createStyle = (feature => {
    const cyclewayClassObject = {};
    cyclewayClassObject.cyclewayleft = feature.properties.cyclewayleft;
    cyclewayClassObject.cyclewayright = feature.properties.cyclewayright;
    cyclewayClassObject.cycleway = feature.properties.cycleway;
    cyclewayClassObject.highway = feature.properties.highway;
    return (setLaneStyle(cyclewayClassObject));
});


export { mapStyle, setLaneStyle, createStyle }