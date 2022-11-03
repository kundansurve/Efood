import React, { Component, useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';
import { Navigate } from "react-router-dom";
import TrackMap from './../../components/TrackMap';
import LoadingSpinner from './../../components/loading';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';

function Order(props) {
    const [orderDetails, setOrderDetails] = React.useState(null);
    const [orderId, setOrderId] = React.useState(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
    const [deliverTo, setDeliverTo] = React.useState(null);
    const [orderFromHotel, setOrderFromHotel] = React.useState(null);
    const [dishes, setDishes] = React.useState(null);
    const [orderLocation, setOrderLocation] = useState(null);
    const [currLocation,setCurrLocation] = useState(null);
    const [cityDetails,setCityDetails] = React.useState(null);
    
    const apiCall = () => {
        fetch(`http://foodiiee.herokuapp.com/api/delivery-executive/me/order/${orderId}`)
            .then(resp => resp.json())
            .then(data => {
                setOrderDetails(data.order);
                fetch(`http://foodiiee.herokuapp.com/api/users/user/${data.order.placedByUserId}`)
                    .then(resp => resp.json())
                    .then((deliverTo) => {
                        setDeliverTo(deliverTo);
                    }).catch(error => console.log(error))
                fetch(`http://foodiiee.herokuapp.com/api/hotels/hotel/${data.order.placedInHotelId}`)
                    .then(resp => resp.json())
                    .then((hotelData) => {
                        setOrderFromHotel(hotelData.hotel);
                    }).catch(error => console.log(error))
                    fetch(`http://foodiiee.herokuapp.com/api/cities/city/${data.order.cityId}`)
                    .then(resp => resp.json())
                    .then((CityDetails) => {
                        setCityDetails(CityDetails['city']);
                        
                    }).catch(error => console.log(error))
                    
                fetch(`http://foodiiee.herokuapp.com/api/hotel/dishes/${data.order.placedInHotelId}`)
                    .then(resp => resp.json())
                    .then((dishes) => {
                        setDishes(dishes.dishes);
                    }).catch(error => console.log(error))
            }).catch(error => console.log(error));
    }

    useEffect(() => {
        
        apiCall();
        
    }, [])

    const recievedFromHotel = () => {
        setOrderDetails({...orderDetails,status:"Delivery Executive Out for Order"})
        fetch("http://foodiiee.herokuapp.com/api/delivery-executive/me/order/recieved-from-hotel", {
            method: "PUT",
            body: JSON.stringify({ recieved: true }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
            .then(status => {
                //setOrderDetails({...orderDetails,status:status});
            }).catch(error => console.log(error));
    }
    const delivered = () => {
        setOrderDetails({...orderDetails,status:"Delivered"})
        fetch("http://foodiiee.herokuapp.com/api/delivery-executive/me/order/delivered", {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
            .then(status => {
                window.location.reload();
                //setOrderDetails({...orderDetails,status:status})
            }).catch(error => console.log(error));
            
    }
    function showPosition(position) {
        if(position){
            setCurrLocation({coordinates:[position.coords.latitude,position.coords.longitude]});
        }else{
            //alert("Allow Location Access");
            getLocation()
        }
      }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert('Please give acess to track your location');
        }
      }
      const traceLocation = ()=>{
        getLocation();
        setTimeout(() => {
          traceLocation();
        }, 300000);
      }
    useEffect(()=>{
        traceLocation();
       
    },[])
    return (
        <div style={{ width: "100%", marginBottom: "2em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {/*(currLocation && currLocation.length==2 && orderFromHotel.location && orderDetails.deliveryLocation && cityDetails.location && orderDetails.status!="Delivered" && orderDetails.status!="Canceled" )?<TrackMap start={currLocation} pickUpPoint={orderFromHotel.location} center={cityDetails.location.coordinates} dropPoint={orderDetails.deliveryLocation.lnglat.coordinates} outForDelivery={(orderDetails.status!="Food is Being Processed")}/>:null*/}
            {
                (orderDetails && orderFromHotel && currLocation && cityDetails)?(orderDetails.status==='Delivery Executive Out for Order')?<TrackMap start={currLocation} center={cityDetails.location.coordinates} outForDelivery={(orderDetails.status!="Food is Being Processed")} dropPoint={orderDetails.deliveryLocation.lnglat.coordinates} />:(orderDetails.status==='Food is Being Processed')?<TrackMap start={currLocation} outForDelivery={(orderDetails.status!="Food is Being Processed")} center={cityDetails.location.coordinates} dropPoint={orderFromHotel.location.coordinates} />:null:null
            }
            <div id="delivery-info" style={{ padding: "1em", width: "100%", maxWidth: "1000px", marginTop: "3em" }}>
                <h3>Order Details</h3>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", backgroundColor: "#efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Order Status:</h5>
                    <p style={{ marginBottom: "0px" }}>{(orderDetails)?(orderDetails.status == "Food is Being Processed") ?"Collect Order From Hotel":(orderDetails.status == "Delivery Executive Out for Order")?"Deliver the order to the deliver Address":orderDetails.status:null}</p>
                    <span style={{ alignItems: "center", display: "flex" }}>
                        <p style={{ margin: "0px" }}></p>
                    </span>
                    {(!orderDetails)?<LoadingSpinner/>:null}
                    {(orderDetails && orderDetails.status == "Food is Being Processed") ? <button style={{ backgroundColor: "transparent", color: "black", padding: "0.3em", borderRadius: "5px", border: "1px solid black", margin: "1em" }} onClick={recievedFromHotel}> Recieved Order from Hotel</button> : <></>}
                    {(orderDetails && orderDetails.status == "Delivery Executive Out for Order") ? <button style={{ backgroundColor: "transparent", color: "black", padding: "0.3em", borderRadius: "5px", border: "1px solid black", margin: "1em" }} onClick={delivered}> Delivered</button> : <></>}
                </div>

                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Delivery To:</h5>
                   {(deliverTo)?<> <p style={{ marginBottom: "0.5em" }}><img style={{ marginRight: "1em" }} src="https://img.icons8.com/ultraviolet/40/000000/test-account.png" />{deliverTo.firstName} {deliverTo.lastName}</p>
                    <span style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", alignItems: "center" }}>
                        <p style={{ marginLeft: "0.2em" }}>Mobile Number:</p>
                        <p style={{ marginLeft: "0.2em" }}>{deliverTo.phoneNumber}</p>
                    </span>
                    </>:<LoadingSpinner/>}
                </div>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Delivery Address</h5>
                    <p>{(cityDetails)?cityDetails.name:null},</p>
                    <span style={{ alignItems: "center", display: "flex" }}>
                        {(!orderDetails && !cityDetails)?<LoadingSpinner/>:null}
                        {(cityDetails && orderDetails && orderDetails.deliveryLocation)?orderDetails.deliveryLocation.address:null}
                    </span>
                </div>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    <p style={{ float: "right", textAlign: "right", color: "green" }}>Order Id: {orderId}</p>
                    <h5>Order Summary:</h5>
                    {(orderDetails && orderFromHotel && dishes)?<><span style={{ display: "grid", gridTemplateColumns: "auto auto", maxWidth: "350px" }}>
                        <h6 >Hotel: {(orderFromHotel)?orderFromHotel.name:null}</h6>
                    </span>
                    <h6>Order:</h6>
                    <span style={{ paddingLeft: "0.5em", textAlign: "center", display: "grid", gridTemplateColumns: "auto auto auto auto", width: "100%" }}>
                    <><p style={{ fontWeight: "bold" }} >Food</p>
                                <p style={{ fontWeight: "bold" }}>Price</p>
                                <p style={{ fontWeight: "bold" }}>Quantity</p>
                                <p style={{ fontWeight: "bold" }}>Total</p>
                        {dishes.map((dish) => {

                            if (!orderDetails.order[dish._id]) return null;
                            return <>
                                <p >{dish.name}</p>
                                <p >{dish.price}</p>
                                <p >{orderDetails.order[dish._id]}</p>
                                <p>{dish.price * orderDetails.order[dish._id]}</p></>
                        })}
                        </>
                    </span></>:<LoadingSpinner/>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    {(orderDetails && orderDetails.isPaid) ? <h6 style={{ float: "right", textAlign: "right", color: "green" }}>Paid</h6> :
                        <h6 style={{ float: "right", textAlign: "right", color: "#ff6666" }}>Cah on Delivery</h6>}
                    <h5>Order Bill</h5>
                    {(orderDetails )?
                    <div style={{ padding: "0.2em", textAlign: "center", display: "grid", gridTemplateColumns: "auto auto" }}>
                        <h6 style={{ textAlign: "left" }}>Total</h6>
                        {( orderDetails.isPaid && !orderDetails.status=="Delivered")?<p style={{ textAlign: "right" }}>RS. {orderDetails.totalPrice}</p>:<></>}
                        {( !orderDetails.isPaid && !orderDetails.status=="Delivered") ? <p style={{ textAlign: "right" }}>RS. {orderDetails.totalPrice} <br /><span style={{ color: "#ff6666" }}>(Cash To Be Collected)</span></p> : <></>}
                        {( orderDetails.status=="Delivered")?<p style={{ textAlign: "right" }}>RS. {orderDetails.totalPrice} <br /><span style={{ color: "green" }}>(Cash Collected)</span></p> : <></>}
                    </div>
                    :<LoadingSpinner/>}
                </div>

            </div>
        </div>
    );
}

export default Order;