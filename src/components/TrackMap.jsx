import React, { Component } from "react";

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';


class TrackMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: props.start,
            
            center:[props.center[1],props.center[0]],
            outForDelivery:props.outForDelivery,
            route:`${props.start[1]},${props.start[0]};${props.dropPoint[1]},${props.dropPoint[0]}`
        }
        
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: this.state.center,
            zoom: 12
        });
        //let route = `${this.state.start[0]},${this.state.start[1]};${this.state.pickUpPoint[0],this.state.pickUpPoint[1]};${this.state.dropPoint[0]},${this.state.dropPoint[1]}`;
        //if(this.state.outForDelivery)route = `${this.state.start[0]},${this.state.start[1]};${this.state.dropPoint[0]},${this.state.dropPoint[1]}`
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${this.state.route}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        ).then(resp => resp.json())
            .then((jsonData) => {

                const data = jsonData.routes[0];
                
                const Route = data.geometry.coordinates;
                
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: Route
                    }
                };

                map.on('load',()=>{if (map.getSource('route')) {
                    map.getSource('route').setData(geojson);
                }
                // otherwise, we'll make a new request
                else {
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: geojson
                        },
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': 4,
                            'line-opacity': 0.75
                        }
                    });
                    map.addLayer({
                        id: 'point',
                        type: 'circle',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: 'Point',
                                            coordinates: this.state.start.reverse()
                                        }
                                    }
                                ]
                            }
                        },
                        paint: {
                            'circle-radius': 8,
                            'circle-color': '#3887be'
                        }
                    });
                }

            })}).catch(error => console.log(error))
    }

componentDidUpdate(){
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: this.state.center,
        zoom: 12
    });
    //let route = `${this.state.start[0]},${this.state.start[1]};${this.state.pickUpPoint[0],this.state.pickUpPoint[1]};${this.state.dropPoint[0]},${this.state.dropPoint[1]}`;
    //if(this.state.outForDelivery)route = `${this.state.start[0]},${this.state.start[1]};${this.state.dropPoint[0]},${this.state.dropPoint[1]}`
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${this.state.route}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    ).then(resp => resp.json())
        .then((jsonData) => {

            const data = jsonData.routes[0];
            
            const Route = data.geometry.coordinates;
            
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: Route
                }
            };

            map.on('load',()=>{if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
                console.log(map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 4,
                        'line-opacity': 0.75
                    }
                }));
                console.log(map.addLayer({
                    id: 'point',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'Point',
                                        coordinates: this.state.start.reverse()
                                    }
                                }
                            ]
                        }
                    },
                    paint: {
                        'circle-radius': 8,
                        'circle-color': '#3887be'
                    }
                }));
            }

        })}).catch(error => console.log(error))
}    
    render() {
        return (<div id='map' style={{ minHeight: "60vh", width: "100%" }}></div>);
    }
}
export default TrackMap;