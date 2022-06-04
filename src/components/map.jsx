import React, { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
 
function SetAddress(props){
        const [state,setState]=useState({
            coordinates:[],
            address:'',
            detailAddress:'',
        })
        let map={};
        mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';
        
        // Add the control to the map.
        
        const marker = new mapboxgl.Marker();
        const add_marker = (event) => {
            var coordinates = event.lngLat;
            console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(res=>res.json())
            .then((data)=>{
                setState({coordinates:[coordinates.lat,coordinates.lng],address:data.features[0].place_name,detailAddress:data.features[0].place_name});
                }).catch((error)=>{alert(error)});
            marker.setLngLat(coordinates).addTo(map);
        }
    

    useEffect(()=>{
        map = new mapboxgl.Map({
            container: 'addressMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: props.center,
            zoom: 13
        });
        
         map.setMaxBounds(props.bounds);
        map.on('click', add_marker);
    },[])
    

        return( 
        <div id='addressMap' style={{zIndex:'998',position:'fixed',top:'0px',left:'0px',width:'100%',height:'100%'}}>
            <button onClick={()=>{props.onclick(state);props.close()}} style={{zIndex:'1000',backgroundColor:'var(--color1)',color:'white',padding:'1em',position:'absolute',bottom:'1em',margin:'auto 45%',borderRadius:'5px'}}>Set Adress</button>
        </div>);
}

export default SetAddress;
