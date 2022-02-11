import React, {Component} from 'react';
import { render } from '@testing-library/react';
import './JS files/delivery';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';

class OrderTrack extends Component{
    componentDidMount(){
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [74.7749, 20.9042], // starting position [lng, lat]
            zoom: 9 // starting zoom
            
        });
        console.log(map);
    }
    render(){
        return (
            <>
            <div id='map' style={{height: "100vh", width:"100%"}}></div>
            
                {()=>{
                
    }}
    <div id="instructions"></div>
    </>
        );
    }
}
 
export default OrderTrack;