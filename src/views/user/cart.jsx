import React, { Component, useContext, useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import '../CSS files/cart.css';
import Dish from '../../components/user/dishCard';
import SetAddress from '../../components/map';
import { UserData } from '../../context';

function Cart(props) {
    //super(props);
    const [userData, setUserData] = useContext(UserData);
    const [hotel, setHotel] = useState((userData.user.cart["hotelId"]) ? userData.user.cart["hotelId"] : "");
    const [hotelData, setHotelData] = useState({});
    const [state, setState] = useState({
        openModal: false,
        address: {
            coordinates: [],
            address: '',
            detailAddress: '',
        }
    });
    const changeUserData = () => {
        fetch("http://localhost:4000/api/authenticate/me")
            .then((response) => response.json())
            .then((data) => {
                if (data["error"]) {
                    alert(data["error"]);
                    return;
                }
                sessionStorage.setItem("userData", JSON.stringify(data));
                setUserData(data);
            })
            .catch((error) => console.log(error));
        sessionStorage.setItem("City", city);
    }
    const [city, setCity] = useState();

    const [dishesData, setDishesData] = useState([]);
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
        fetch("http://localhost:4000/api/user/me/changeaddress", {
            method: "PUT",
            body: JSON.stringify(deliveryLocation),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(data => {
            changeUserData()
            console.log(data)})
            .catch(error => console.log(error));
        }

    useEffect(() => {
        if (!hotel) {
            return;
        }
        fetch(
            "http://localhost:4000/api/hotels/hotel/" + hotel
        )
            .then((response) => response.json())
            .then((data) => {
                setHotelData(data["hotel"]);
                fetch("http://localhost:4000/api/hotel/dishes/" + hotel)
                    .then(response => response.json())
                    .then((data) => {
                        setDishesData(data["dishes"]);
                    }).catch(err => alert(err))
                fetch("http://localhost:4000/api/cities/city/" + data["hotel"].cityId)
                    .then(response => response.json())
                    .then((data) => {
                        setCity(data['city']);
                    }).catch(err => alert(err));
            }).catch(err => alert(err));
    }, []);

    return (
        (state.openModal) ? <>
            <SetAddress close={() => { }} onclick={(address) => { setState({ ...state, openModal: false, address: address }); changeAddress(address) }} bounds={[[city.location.coordinates[1]-0.04462452399, city.location.coordinates[0]-0.04736856406600], [city.location.coordinates[1]+0.04462452399, city.location.coordinates[0]+0.04736856406356]]} center={[city.location.coordinates[1], city.location.coordinates[0] ]} /></>
            : <div style={{ paddingBottom: "4em" }}>
                <h2 style={{ margin: "1em" }}>Checkout</h2>
                <div style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center" }}>

                    <div style={{ width: "50%", minWidth: "360px", alignItems: "center", padding: "1em", margin: "1em" }}>
                        <div style={{ padding: "1em", margin: "1em", backgroundColor: "#efefef", borderRadius: "5px", width: "90%" }}>
                            <h5>Order From</h5>
                            {(!hotel || !city) ? <>None</> : <><p style={{ padding: "2px", marginBottom: "0px" }}>{hotelData.name}</p>
                                <span style={{ alignItems: "center", display: "flex" }}><img src="https://img.icons8.com/office/16/000000/marker.png" /><p style={{ margin: "0px" }}>{city.name}</p></span></>}
                        </div>
                        <div style={{ width: "90%" }}>
                            <h5 style={{ width: "100%", padding: "0.5em", marginTop: "0.5em" }}>Order Summary</h5>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", height: "400px", overflowY: "scroll", paddingTop: "1em", paddingBottom: "1em" }}>
                            {(!hotel) ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}><h5>Cart is Empty</h5></div> : null}
                            {
                                dishesData.map((data) => {
                                    if (userData.user.cart.items[data._id]) {
                                        return <Dish login={userData.userType} name={data.name} ratings={data.ratings} noOfRatings={data.numberofRatings} type={data.type} id={data._id} price={data.price} isVeg={data.isVeg} img={data.img} count={userData.user.cart.items[data._id]} />
                                    } else return null;
                                }
                                )}
                        </div>
                        <div style={{ marginTop: "2em", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", width: "100%" }}>
                            <img style={{ float: "right" }} src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" />
                            <h5>Select Payment Method </h5>
                            <p>Credit Card</p>

                        </div>
                    </div>
                    <div style={{ width: "35%", padding: "1em", minWidth: "360px" }}>
                        <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>{userData.user.firstName + " " + userData.user.lastName}</h5>
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
                            <p>{userData.user.cart.deliveryLocation.address}</p>
                            <button style={{ margin: "auto auto", background: "transparent", border: "none", textDecoration: "underline", textAlign: "center" }} onClick={() => { if (!hotel || hotel == "") { return; } setState({ ...state, openModal: true }) }}>Change Address</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>Billing</h5>
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>Subtotal</h6>
                                <p style={{ float: "right", textAlign: "right" }}>Rs. {userData.user.cart.price}</p>
                            </div>
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>taxes</h6>
                                <p style={{ float: "right", textAlign: "right" }}>Rs. {(userData.user.cart.price === 0) ? "0" : "50"}</p>
                            </div>
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>Delivery charges:</h6>
                                <p style={{ float: "right", textAlign: "right" }}>Rs. {(userData.user.cart.price === 0) ? "0" : "25"}</p>
                            </div>
                            <hr />
                            <div style={{ padding: "0.2em" }}>
                                <h6 style={{ float: "left", textAlign: "left" }}>Grand Total</h6>
                                <p style={{ float: "right", textAlign: "right" }}>RS. {(userData.user.cart.price === 0) ? "0" : (userData.user.cart.price + 75)}</p>
                            </div>

                        </div>
                        <div style={{ width: "90%", padding: "1em", border: "2px solid #efefef", borderRadius: "5px", margin: "1em" }}>
                            <h5>Ordering For</h5>
                            <p style={{ marginBottom: "0px" }}>{userData.user.firstName + " " + userData.user.lastName}</p>
                            <span style={{ alignItems: "center", display: "flex" }}><p style={{ margin: "0px" }}>8623046619</p>
                            </span>
                        </div>
                        <button disabled style={{ textAlign: "center", border: "none", background: "var(--color1)", color: "white", width: "100%", paddingTop: "1em", paddingBottom: "1em", borderRadius: "5px" }}>Place Order</button>
                    </div >

                </div>
            </div>);
}
export default Cart;