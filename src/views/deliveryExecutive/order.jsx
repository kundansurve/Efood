import React, { Component, useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';
import { Navigate } from "react-router-dom";

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';

function Order(props) {
    const [orderDetails, setOrderDetails] = React.useState({ order: [] });
    const [orderId, setOrderId] = React.useState(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
    const [deliverTo, setDeliverTo] = React.useState({});
    const [orderFromHotel, setOrderFromHotel] = React.useState({});
    const [dishes, setDishes] = React.useState([]);
    const [orderLocation, setOrderLocation] = useState([]);
    const [map, setMap] = useState(undefined);

    const apiCall = () => {
        fetch(`http://localhost:4000/api/delivery-executive/me/order/${orderId}`)
            .then(resp => resp.json())
            .then(data => {
                setOrderDetails(data.order);
                fetch(`http://localhost:4000/api/users/user/${data.order.placedByUserId}`)
                    .then(resp => resp.json())
                    .then((deliverTo) => {
                        setDeliverTo(deliverTo);
                    }).catch(error => console.log(error))
                fetch(`http://localhost:4000/api/hotels/hotel/${data.order.placedInHotelId}`)
                    .then(resp => resp.json())
                    .then((hotelData) => {
                        setOrderFromHotel(hotelData.hotel);
                    }).catch(error => console.log(error))
                fetch(`http://localhost:4000/api/hotel/dishes/${data.order.placedInHotelId}`)
                    .then(resp => resp.json())
                    .then((dishes) => {
                        setDishes(dishes.dishes);
                    }).catch(error => console.log(error))
            }).catch(error => console.log(error));
    }

    useEffect(() => {
        
        apiCall();
        
    }, [])
    useEffect(() => {
        if( orderDetails.status != "Delivery Executive Out for Order" && orderDetails.status != "Food is Being Processed")setMap(undefined)
        else if(!map) setMap(new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [74.7749, 20.9042],
            zoom: 12
        }))
        if (!map) return;
        if (!orderDetails.deliveryLocation || !orderFromHotel.location) return;
        if (window.navigator.geolocation && orderDetails.deliveryLocation) {
            window.navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                if (orderLocation == [longitude, latitude]) return;
                setOrderLocation([longitude, latitude]);
                getRoute([longitude, latitude], map)
            })
        }


        function getRoute(start, map) {
            let route = `${start[0]},${start[1]};${orderFromHotel.location.coordinates[1]},${orderFromHotel.location.coordinates[0]};${orderDetails.deliveryLocation.coordinates[1]},${orderDetails.deliveryLocation.coordinates[0]}`;
            if(orderDetails.status == "Delivery Executive Out for Order")route = `${start[0]},${start[1]};${orderDetails.deliveryLocation.coordinates[1]},${orderDetails.deliveryLocation.coordinates[0]}`
            fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${route}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            ).then(resp => resp.json())
                .then((jsonData) => {
                    const data = jsonData.routes[0];
                    const route = data.geometry.coordinates;
                    const geojson = {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        }
                    };

                    if (map.getSource('route')) {
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
                                                coordinates: start
                                            }
                                        }
                                    ]
                                }
                            },
                            paint: {
                                'circle-radius': 10,
                                'circle-color': '#3887be'
                            }
                        });
                    }
                }).catch(error => console.log(error))

        }


    })
    const recievedFromHotel = () => {
        fetch("http://localhost:4000/api/delivery-executive/me/order/recieved-from-hotel", {
            method: "PUT",
            body: JSON.stringify({ recieved: true }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
            .then(status => {
                apiCall();
            }).catch(error => console.log(error));
    }
    const delivered = () => {
        fetch("http://localhost:4000/api/delivery-executive/me/order/delivered", {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
            .then(status => {
                apiCall();
            }).catch(error => console.log(error));
    }
    return (
        <div style={{ width: "100%", marginBottom: "2em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div id='map' style={{ minHeight: "60vh", width: "100%",display:(orderDetails.status != "Delivery Executive Out for Order" && orderDetails.status != "Food is Being Processed")?"none":""}}></div>
            <div id="delivery-info" style={{ padding: "1em", width: "100%", maxWidth: "1000px", marginTop: "3em" }}>
                <h3>Order Details</h3>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", backgroundColor: "#efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Order Status:</h5>
                    <p style={{ marginBottom: "0px" }}>{orderDetails.status}</p>
                    <span style={{ alignItems: "center", display: "flex" }}>
                        <p style={{ margin: "0px" }}></p>
                    </span>
                    {(orderDetails.status == "Food is Being Processed") ? <button style={{ backgroundColor: "transparent", color: "black", padding: "0.3em", borderRadius: "5px", border: "1px solid black", margin: "1em" }} onClick={recievedFromHotel}> Recieved Order from Hotel</button> : <></>}
                    {(orderDetails.status == "Delivery Executive Out for Order") ? <button style={{ backgroundColor: "transparent", color: "black", padding: "0.3em", borderRadius: "5px", border: "1px solid black", margin: "1em" }} onClick={delivered}> Delivered</button> : <></>}
                </div>

                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Delivery To:</h5>
                    <p style={{ marginBottom: "0.5em" }}><img style={{ marginRight: "1em" }} src="https://img.icons8.com/ultraviolet/40/000000/test-account.png" />{deliverTo.firstName} {deliverTo.lastName}</p>
                    <span style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", alignItems: "center" }}>
                        <p style={{ marginLeft: "0.2em" }}>Mobile Number:</p>
                        <p style={{ marginLeft: "0.2em" }}>{deliverTo.phoneNumber}</p>
                    </span>
                </div>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Delivery Address</h5>
                    <p>Dhule,</p>
                    <span style={{ alignItems: "center", display: "flex" }}>
                        <p style={{ margin: "0px" }}>8623046619</p>
                    </span>
                </div>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    <p style={{ float: "right", textAlign: "right", color: "green" }}>Order Id: 72025926G</p>
                    <h5>Order Summary:</h5>
                    <span style={{ display: "grid", gridTemplateColumns: "auto auto", maxWidth: "350px" }}>
                        <h6 >Hotel:</h6>
                        <h6 style={{ fontWeight: "lighter" }}>{orderFromHotel.name}</h6>
                    </span>
                    <h6>Order:</h6>
                    <span style={{ paddingLeft: "0.5em", textAlign: "center", display: "grid", gridTemplateColumns: "auto auto auto auto", width: "100%" }}>
                        {dishes.map((dish) => {
                            if (!orderDetails.order[dish._id]) return <></>;
                            return <><p style={{ fontWeight: "bold" }} >Food</p>
                                <p style={{ fontWeight: "bold" }}>Price</p>
                                <p style={{ fontWeight: "bold" }}>Quantity</p>
                                <p style={{ fontWeight: "bold" }}>Total</p>
                                <p >{dish.name}</p>
                                <p >{dish.price}</p>
                                <p >{orderDetails.order[dish._id]}</p>
                                <p>{dish.price * orderDetails.order[dish._id]}</p></>
                        })}
                    </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    {(orderDetails.isPaid) ? <h6 style={{ float: "right", textAlign: "right", color: "green" }}>Paid</h6> :
                        <h6 style={{ float: "right", textAlign: "right", color: "#ff6666" }}>Cah on Delivery</h6>}
                    <h5>Order Bill</h5>

                    <div style={{ padding: "0.2em", textAlign: "center", display: "grid", gridTemplateColumns: "auto auto" }}>
                        <h6 style={{ textAlign: "left" }}>Total</h6>
                        {(!orderDetails.isPaid && !orderDetails.status=="Delivered") ? <p style={{ textAlign: "right" }}>RS. {orderDetails.totalPrice} <br /><span style={{ color: "#ff6666" }}>(Cash To Be Collected)</span></p> : <></>}
                        {(orderDetails.status=="Delivered")?<p style={{ textAlign: "right" }}>RS. {orderDetails.totalPrice} <br /><span style={{ color: "#ff6666" }}>(Cash Collected)</span></p> : <></>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Order;