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
    fetch("http://localhost:4000/api/hotel/me/orders")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ orders: data.orders });
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://localhost:4000/api/hotel/dishes/6225e37a02b267ae9583f1d3")
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
          <h3 style={{ padding: "0 1em 0" }}>All Orders</h3>
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
