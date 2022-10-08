import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
// import "../JS files/delivery";
import mapboxgl from "mapbox-gl";
import Order from "../../components/Hotel/order";
import LoadingSpinner from "../../components/loading";

function Orders() {
    const [orders,setOrders] = React.useState(null);
    const [dishes,setDishes] = React.useState(null);

 useEffect(()=>{
    fetch("/api/hotel/me/orders")
      .then((resp) => resp.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`/api/hotel/me/dishes`)
      .then((resp) => resp.json())
      .then((data) => {
        setDishes(data.dishes);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  return (
      <>
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "auto",
            padding: "1em",
          }}
        >
          
          {(orders && dishes )?((orders.length==0)?<h3 style={{ padding: "0 1em 0" }}>No Orders</h3>:<h3 style={{ padding: "0 1em 0" }}>All Orders</h3>):<LoadingSpinner/>}
          {(orders && dishes)?orders.map((order) => {
            return (
              <Order
                status={order.status}
                order={order}
                dishes={dishes}
              />
            );
          }):null}
        </div>
      </>
    );
}
export default Orders;
