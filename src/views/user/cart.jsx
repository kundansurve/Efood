import React, { Component, useContext, useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import '../CSS files/cart.css';
import Dish from '../../components/user/dishCard';
import SetAddress from '../../components/map';
import { UserData } from '../../context';
import axios from 'axios';
import fetchUserInfoFunc from '../fetch';
import LoadingSpinner from '../../components/loading';

function Cart(props) {
    //super(props);
    const [userData, setUserData] = useContext(UserData);
    const [hotel, setHotel] = useState(null);
    const [hotelData, setHotelData] = useState({});
    const [city, setCity] = useState();

    const [dishesData, setDishesData] = useState(null);
    const [state, setState] = useState({
        openModal: false,
        address: {
            coordinates: [],
            address: null,
            detailAddress: null
        }
    });
    useEffect(() => {
        changeUserData();
    }, [])
    const changeUserData = () => {
        fetch("/api/authenticate/me")
            .then((response) => response.json())
            .then((data) => {
                if (data["error"]) {
                    return;
                }
                sessionStorage.setItem("userData", JSON.stringify(data));
                setUserData(data);
                setHotel((data.user.cart["hotelId"]) ? data.user.cart["hotelId"] : "")
                setState({ openModal:false, address: { coordinates: data.user.cart.deliveryLocation.lnglat.coordinates, address: data.user.cart.deliveryLocation.address, detailAddress: data.user.cart.deliveryLocation.detailAddress } })
                if (!data.user.cart["hotelId"]) {
                    return;
                }
                fetch(
                    "/api/hotels/hotel/" + data.user.cart["hotelId"]
                )
                    .then((response) => response.json())
                    .then((HOTELDATA) => {
                        setHotelData(HOTELDATA["hotel"]);
                        fetch("/api/hotel/dishes/" + data.user.cart["hotelId"])
                            .then(response => response.json())
                            .then((DISHDATA) => {
                                setDishesData(DISHDATA["dishes"]);
                            }).catch(err => alert(err))
                        fetch("/api/cities/city/" + HOTELDATA["hotel"].cityId)
                            .then(response => response.json())
                            .then((CITYDATA) => {
                                setCity(CITYDATA['city']);
                            }).catch(err => alert(err));
                    }).catch(err => alert(err));
            })
            .catch((error) => console.log(error));
        sessionStorage.setItem("City", city);
    }

    const changeAddress = (data) => {
        const deliveryLocation = {
            address: data.address,
            detailAddress: data.detailAddress,
            lnglat: {
                type: {
                    type: String,
                    enum: ['Point'],
                },
                coordinates: data.coordinates,
            }
        };
        fetch("/api/user/me/changeaddress", {
            method: "PUT",
            body: JSON.stringify(deliveryLocation),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(data => {
            setState({ address:state.address,detailAddress:state.detailAddress,lnglat:state.lnglat, openModal: false })
            changeUserData();
            console.log(data)
        })
            .catch(error => console.log(error));
    }



    const handlePayment = async () => {
        try {
            if (!state.address.coordinates) {
                alert("Please set address");
                return;
            }
            if (state.address.coordinates[0] > state.address.coordinates[0] + 0.1 || state.address.coordinates[1] < state.address.coordinates[1] > 0.1 || state.address.coordinates[0] < state.address.coordinates[0] - 0.1 || state.address.coordinates[1] < state.address.coordinates[1] - 0.1) {
                alert("Sorry this hotel orders cannot be placed at selected address");
                return;
            }
            const orderUrl = "/api/user/me/placeorder";
            const { data } = await axios.post(orderUrl, {});
            console.log(data);
            initPayment(data);
        } catch (error) {
            alert(error);
        }
    }
    const initPayment = (data) => {
        const options = {
            key: process.env.KEY_ID,
            amount: data.data.amount,
            currency: "INR",
            name: "Foodie",
            order_id: data.data.id,
            handler: async (response) => {

                try {
                    const verifyUrl = "/api/user/me/payment/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    window.location = "/orders/"
                } catch (error) {
                    console.log(error);
                }
            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    return (
        (state.openModal) ? <>
            <SetAddress onClose={() => { setState({ address:state.address,detailAddress:state.detailAddress,lnglat:state.lnglat, openModal: false }) }} onclick={(address) => { setState({ ...state, openModal: false, address: address }); changeAddress(address) }} bounds={[[city.location.coordinates[1] - 0.1, city.location.coordinates[0] - 0.1], [city.location.coordinates[1] + 0.1, city.location.coordinates[0] + 0.1]]} center={[city.location.coordinates[1], city.location.coordinates[0]]} /></>
            : <div style={{ paddingBottom: "4em", marginTop: "3em" }}>
                <h2 style={{ margin: "1em", marginTop: "3em", marginBottom: "0em", paddingBottom: "0em" }}>Checkout</h2>
                <div style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
                    <div style={{ width: "50%", minWidth: "340px", alignItems: "center", padding: "1em", margin: "1em" }}>
                        <div style={{ padding: "1em", margin: "1em", backgroundColor: "#efefef", borderRadius: "5px", width: "90%" }}>
                            <h5>Order From</h5>
                            {(hotel && !hotelData) ? <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "60vh",
                                    width: "100%",
                                }}
                            >
                                <LoadingSpinner />
                            </div> : null}
                            {(!hotel || !city) ? <>None</> : <><p style={{ padding: "2px", marginBottom: "0px" }}>{hotelData.name}</p>
                                <span style={{ alignItems: "center", display: "flex" }}><img src="https://img.icons8.com/office/16/000000/marker.png" /><p style={{ margin: "0px" }}>{city.name}</p></span></>}
                        </div>
                        <div style={{ width: "90%" }}>
                            <h5 style={{ width: "100%", padding: "0.5em", marginTop: "0.5em" }}>Order Summary</h5>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", height: "550px", overflowY: "scroll", paddingTop: "1em", paddingBottom: "1em" }}>
                            {(!hotel) ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}><h5>Cart is Empty</h5></div> : null}
                            {(hotel && !dishesData) ? <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "60vh",
                                    width: "100%",
                                }}
                            >
                                <LoadingSpinner />
                            </div> : null}
                            {(dishesData)?
                                dishesData.map((data) => {
                                    if (userData.user && userData.user.cart.items[data._id]) {
                                        return <Dish login={userData.userType} name={data.name} ratings={data.ratings} noOfRatings={data.numberofRatings} type={data.type} id={data._id} price={data.price} isVeg={data.isVeg} img={data.img} count={userData.user.cart.items[data._id]} />
                                    } else return null;
                                }
                                ):null}
                        </div>

                    </div>
                    <div style={{ width: "35%", padding: "1em", minWidth: "340px" }}>
                        <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>{(userData.user) ? userData.user.firstName + " " + userData.user.lastName : null}</h5>
                            <p>You are securely logged in</p>
                        </div>
                        {/*<div style={{width:"90%",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Offers</h5>
                <span style={{alignItems:"center",flexWrap:"wrap",display:"flex"}}>
                    <img  style= {{width:"30px"}} src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-offer-business-and-finance-icongeek26-outline-gradient-icongeek26.png"/>
                    <input type="text" style={{border:"none",borderBottom:"1px solid black",paddingLeft:"1em",paddingRight:"1em"}} placeholder="First Delivery" />
                    <button style={{margin:"auto auto",background:"transparent",border:"none", textDecoration:"underline", textAlign:"center"}}>View Offers</button>
                </span>
            </div>*/}
                        <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>Delivery Address</h5>
                            <p>{(userData.user) ? userData.user.cart.deliveryLocation.address : null}</p>
                            <button style={{ margin: "auto auto", background: "transparent", border: "none", textDecoration: "underline", textAlign: "center" }} onClick={() => { if (!hotel || hotel == "") { return; } setState({ ...state, openModal: true }) }}>Change Address</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>Billing</h5>
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>Subtotal</h6>
                                <p style={{ float: "right", textAlign: "right" }}>Rs. {(userData.user) ? userData.user.cart.price : null}</p>
                            </div>
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>taxes</h6>
                                <p style={{ float: "right", textAlign: "right" }}>Rs. {(!userData.user || userData.user.cart.price === 0) ? "0" : "50"}</p>
                            </div>
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>Delivery charges:</h6>
                                <p style={{ float: "right", textAlign: "right" }}>Rs. {(!userData.user || userData.user.cart.price === 0) ? "0" : "25"}</p>
                            </div>
                            <hr />
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>Grand Total</h6>
                                <p style={{ float: "right", textAlign: "right" }}>RS. {(!userData.user || userData.user.cart.price === 0) ? "0" : (userData.user.cart.price + 75)}</p>
                            </div>

                        </div>
                        <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>Ordering For</h5>
                            <p style={{ marginBottom: "0px" }}>{(userData.user) ? userData.user.firstName + " " + userData.user.lastName : null}</p>
                            <span style={{ alignItems: "center", display: "flex" }}><p style={{ margin: "0px" }}>{(userData.user) ? userData.user.phoneNumber : null}</p>
                            </span>
                        </div>
                        <button onClick={handlePayment} style={{ textAlign: "center", border: "none", background: "var(--color1)", color: "white", width: "100%", paddingTop: "1em", paddingBottom: "1em", borderRadius: "5px" }}>Proceed for payment</button>
                    </div >

                </div>
            </div>);
}
export default Cart;