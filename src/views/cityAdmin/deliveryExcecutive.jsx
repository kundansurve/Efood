import React, { Component, useEffect } from "react";
import { render } from "@testing-library/react";
import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
import CityDelivery from "../../components/City/cityDelivery";
import AddDeliveryBoy from "../../components/City/AddDeliveryBoy";

function DeliveryExecutive(props) {
  const hotelUser=props.hotelUser;
  const [deliveryExecutives,setdeliveryExecutives] = React.useState([]); 
  useEffect(()=>{
    fetch("http://localhost:4000/api/city/me/delivery-executives")
    .then((resp)=>resp.json())
    .then(data=>{
      setdeliveryExecutives(data.deliveryExecutives);
    }).catch(error=>console.log(error))
  },[])

  const resetDeliveryExecutives=()=>{
    fetch("http://localhost:4000/api/city/me/delivery-executives")
    .then((resp)=>resp.json())
    .then(data=>{
      setdeliveryExecutives(data.deliveryExecutives);
    }).catch(error=>console.log(error))
  }
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "auto",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {deliveryExecutives.map(deliveryExecutive=>{
          return <CityDelivery deliveryExecutive={deliveryExecutive}/>
        })}
        <div
          className="add"
          type="button"
          value="add"
          style={{
            float: "unset",
            margin: "1.1em",
            fontSize: "1em",
            fontWeight: "600",
            color: "black",
            padding: "0.2em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 1px 5px #24c64f",
            borderRadius: "10px",
            width: "20%"
          }}
        >
          {/* <InsertDish title="Add Dish" /> */}
          <AddDeliveryBoy title="Add Delivery Boy" hotelUser={hotelUser} resetDeliveryExecutives={resetDeliveryExecutives}/>
        </div>
      </div>
    );
}
export default DeliveryExecutive;
