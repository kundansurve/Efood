import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import TrackMap from './../../components/TrackMap';
import { useEffect } from 'react';
import { UserData } from '../../context';
import { useContext } from 'react';
import fetchUserInfoFunc from '../fetch';
import LoadingSpinner from '../../components/loading';


function OrderTrack(){
    const [userData,setUserData]=useContext(UserData);
    const [orderDetails, setOrderDetails] = React.useState(null);
    const [orderId, setOrderId] = React.useState(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
    const [deliveryExecutive, setDeliveryExecutive] = React.useState(null);
    const [orderFromHotel, setOrderFromHotel] = React.useState(null);
    const [dishes, setDishes] = React.useState(null);
    const [orderLocation, setOrderLocation] = React.useState([27.0000,73.1111111]);
    const [cityDetails,setCityDetails] = React.useState();

    useEffect(()=>{
        fetchUserInfoFunc(setUserData);
    },[])

    const apiCall = () => {
        fetch(`/api/user/me/orders/${orderId}`)
            .then(resp => resp.json())
            .then(data => {
                if(!data['OrderDetail']){
                    alert("No such Order id present");
                    window.location="/";
                }
                setOrderDetails(data['OrderDetail']);
                
            if(data['OrderDetail'].assignedToDeliveryBoyId){fetch("/api/deliveryBoy/"+data['OrderDetail'].assignedToDeliveryBoyId)
            .then((response) => response.json())
                .then((deliveryExecutiveData) => {
                  setDeliveryExecutive(deliveryExecutiveData["deliveryBoy"]);
                }).catch(error=>{
                    console.log(error);
                })}
        
                fetch(`/api/hotels/hotel/${data['OrderDetail'].placedInHotelId}`)
                    .then(resp => resp.json())
                    .then((hotelData) => {
                        setOrderFromHotel(hotelData.hotel);
                    }).catch(error => console.log(error))
                    fetch(`/api/cities/city/${data['OrderDetail'].cityId}`)
                    .then(resp => resp.json())
                    .then((CityDetails) => {
                        setCityDetails(CityDetails['city']);
                        
                    }).catch(error => console.log(error))
                    fetch(`/api/hotel/dishes/${data['OrderDetail'].placedInHotelId}`)
                    .then(resp => resp.json())
                    .then((dishes) => {
                        setDishes(dishes.dishes);
                    }).catch(error => console.log(error))
            }).catch(error => console.log(error));
    }

    React.useEffect(() => {
        
        apiCall();
        
    }, [])
    return (
        <div style={{ width: "100%", marginBottom: "2em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {(orderDetails && orderDetails.status && orderFromHotel && orderDetails.deliveryLocation && cityDetails &&cityDetails.location && orderDetails.status!="Delivered" && orderDetails.status!="Canceled" )?<TrackMap start={(deliveryExecutive && deliveryExecutive.location)?deliveryExecutive.location:orderFromHotel.location} pickUpPoint={orderFromHotel.location} center={cityDetails.location.coordinates} dropPoint={orderDetails.deliveryLocation.lnglat.coordinates} outForDelivery={(orderDetails.status!="Food is Being Processed")}/>:null}
            <div id="delivery-info" style={{ padding: "1em", width: "100%", maxWidth: "1000px", marginTop: "3em" }}>
                {(orderDetails)?<><h3>Order Details</h3>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", backgroundColor: "#efefef", borderRadius: "5px", margin: "1em" }}>
                    <h5>Order Status:</h5>
                    <p style={{ marginBottom: "0px" }}>{orderDetails.status}</p>
                    {(orderDetails.hotelAccepted==false)?<p style={{ marginBottom: "0px" }}>OOPS! Hotel wasn't able to complete this Order.</p>:null}
                    <span style={{ alignItems: "center", display: "flex" }}>
                        <p style={{ margin: "0px" }}></p>
                    </span>
                </div>
                </>:<LoadingSpinner/>}

                
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    {(orderDetails)?<><h5>Delivery Partner:</h5>
                    {(deliveryExecutive)?<><p style={{marginBottom:"0.5em"}}><img style={{marginRight:"1em"}}src="https://img.icons8.com/ultraviolet/40/000000/test-account.png"/>{deliveryExecutive.name}</p>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Ratings</p>
                        <p style={{marginLeft:"0.2em",fontSize:"18px",color:"rgb(250,250,0)"}}>{[...Array(5)].map((e, i) => { if (i < deliveryExecutive.ratings) return <>&#9733;</>; return <>&#9734;</>; })}</p>
                    </span>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Mobile Number:</p>
                        <p style={{marginLeft:"0.2em"}}>{deliveryExecutive.phoneNumber}</p>
                    </span></>:<>NOT ASSIGNED YET</>}</>:<LoadingSpinner/>}
                </div>
                <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                    {(orderDetails && dishes && orderFromHotel)?<><p style={{ float: "right", textAlign: "right", color: "green" }}>Order Id: {orderId}</p>
                    <h5>Order Summary:</h5>
                    <span style={{ display: "grid", gridTemplateColumns: "auto auto", maxWidth: "350px" }}>
                        <h6 >Hotel:</h6>
                        <h6 style={{ fontWeight: "lighter" }}>{orderFromHotel.name}</h6>
                    </span>
                    <h6>Order:</h6>
                    <span style={{ paddingLeft: "0.5em", textAlign: "left", display: "grid", gridTemplateColumns: "auto auto auto auto", width: "100%" }}>
                    <p style={{ fontWeight: "bold" }} >Food</p>
                                <p style={{ fontWeight: "bold" }}>Price</p>
                                <p style={{ fontWeight: "bold" }}>Quantity</p>
                                <p style={{ fontWeight: "bold" }}>Total</p>
                        {dishes.map((dish) => {
                            if (!orderDetails.order[dish._id]) return <></>;
                            return <>
                                <p >{dish.name}</p>
                                <p >{dish.price}</p>
                                <p >{orderDetails.order[dish._id]}</p>
                                <p>{dish.price * orderDetails.order[dish._id]}</p></>
                        })}
                    </span></>:<LoadingSpinner/>}
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                {(orderDetails)?<><h5>Billing</h5>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}}>Subtotal</h6>
                    <p style={{textAlign:"right"}}>Rs.{orderDetails.totalPrice}</p>
                </div>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}} >taxes</h6>
                    {(orderDetails.totalPrice && orderDetails.totalPrice >=0 )?<p style={{textAlign:"right"}}>Rs.50</p>:<p style={{textAlign:"right"}}>Rs.0</p>}
                </div>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}} >Delivery charges:</h6>
                    <p style={{textAlign:"right"}}>Rs.{orderDetails.deliveryCharges}</p>
                </div>
                <hr />
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}}>Grand Total</h6>
                    <p style={{textAlign:"right"}}>RS.{(orderDetails.totalPrice+75)}</p>
                </div></>:<LoadingSpinner/>}
            </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    {(orderDetails)?<><h5>Ordering For</h5>
                    <p style={{marginBottom:"0px"}}>{(orderDetails.userInfo)?orderDetails.userInfo["username"]:null}</p>
                    <span style={{alignItems:"center",display:"flex"}}>
                        <p style={{margin:"0px"}}>{(orderDetails.userInfo)?orderDetails.userInfo["phoneNumber"]:null}</p>
                    </span></>:<LoadingSpinner/>}
                </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                {(orderDetails)?<><h5>Delivery Address</h5>
                <p>{(orderDetails.deliveryLocation)?orderDetails.deliveryLocation.address:null}</p>
                </>:<LoadingSpinner/>}
            </div>

            </div>
        </div>
    );
}
 
export default OrderTrack;