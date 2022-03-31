import React, { useState, useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
 
class SetAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            coordinates:[],
            address:'',
            detailAddress:'',
        }
        this.clickFunc=props.onclick;
        this.close=props.close;
        mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';
        
        // Add the control to the map.
        
        this.marker = new mapboxgl.Marker();
        this.add_marker = (event) => {
            var coordinates = event.lngLat;
            console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
            .then(res=>res.json())
            .then((data)=>{
                alert(JSON.stringify(this.clickFunc));
                this.clickFunc({coordinates,address:data.features[0].place_name,detailAddress:data.features[0].place_name});
                }).catch((error)=>{alert(error)});
            this.marker.setLngLat(coordinates).addTo(this.map);
        }
    }
    

    componentDidMount(){
        this.map = new mapboxgl.Map({
            container: 'addressMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-79.4512, 43.6568],
            zoom: 13
        });
        this.map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );
        this.map.on('click', this.add_marker);
    }
    
    render(){
        return( 
        <div id='addressMap' style={{zIndex:'998',position:'fixed',top:'0px',left:'0px',width:'100%',height:'100%'}}>
            <button onClick={()=>{this.close()}} style={{zIndex:'1000',backgroundColor:'var(--color1)',color:'white',padding:'1em',position:'absolute',bottom:'1em',margin:'auto 45%',borderRadius:'5px'}}>Set Adress</button>
        </div>);
    }
}

export default SetAddress;
