import React, { Component } from "react";
import { render } from "@testing-library/react";
// import "../JS files/delivery";
import mapboxgl from "mapbox-gl";
import Order from "../../components/Hotel/order";

class Orders extends Component {
  componentDidMount() {}
  render() {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "auto",
          padding: "1em",
        }}
      >
        <h3 style={{padding: "0 1em 0"}}>All Orders</h3>
        <Order status="Delivered" />
        <Order status="Cancelled" />
        <Order status="In Process" />
        <Order/>
        <Order/>
        <Order/>
      </div>
    );
  }
}
export default Orders;
