import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
// import "../JS files/delivery";
import mapboxgl from "mapbox-gl";
import Order from "../../components/Hotel/order";

function Orders() {
  const [orderDetails, setOrderDetails] = useState({
    orders: [],
  });

  useEffect(() => {
    console.log("Usefect");
    fetch("http://localhost:4000/api/hotel/dishes/6225e37a02b267ae9583f1d3", {
      method: "GET",
      // body: JSON.stringify(dishDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch Data:" + JSON.stringify(data));
        setOrderDetails(data);
        console.log(
          "First element" + JSON.stringify(orderDetails["dishes"][0])
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
        padding: "1em",
      }}
    >
      <h3 style={{ padding: "0 1em 0" }}>All Orders</h3>
      {/* {orderDetails.orders.map((orders, index) => {
        console.log("ordermap " + index + JSON.stringify(orders));
        return (
          <Order
            id={orders._id}
            name={orders.name}
            numberofRatings={orders.numberofRatings}
            price={orders.price}
            type={orders.type}
          />
        );
      })} */}
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
    </div>
  );
}
export default Orders;
