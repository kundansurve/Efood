import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
// import "../JS files/delivery";
import mapboxgl from "mapbox-gl";
import Order from "../../components/Hotel/order";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      dishes: [],
    };
  }
  componentDidMount() {
    fetch("/api/hotel/me/orders")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ orders: data.orders });
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`/api/hotel/dishes/${window.location.pathname.split("/").pop()}`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ dishes: data.dishes });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
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
          
          {(this.state.orders.length==0)?<h3 style={{ padding: "0 1em 0" }}>No Orders</h3>:<h3 style={{ padding: "0 1em 0" }}>All Orders</h3>}
          {this.state.orders.map((order) => {
            return (
              <Order
                status="In Process"
                order={order}
                dishes={this.state.dishes}
              />
            );
          })}
        </div>
      </>
    );
  }
}
export default Orders;
