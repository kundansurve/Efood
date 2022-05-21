import React, { Component } from "react";
import { render } from "@testing-library/react";
// import "../JS files/delivery";
import mapboxgl from "mapbox-gl";
import Order from "../../components/Hotel/order";

class Orders extends Component {
  constructor(props){
    super(props);
    this.state={
      orders:[]
    }
  }
  componentDidMount() {
    fetch("http://localhost:4000/api/hotel/me/orders")
    .then(resp=>resp.json())
    .then(data=>{
      console.log(data.orders);
      this.setState({orders:data.orders});
    }).catch(error=>{
      console.log(error);
    })
  }
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
        {this.state.orders.map(order=>{
          console.log()
          return <Order status="In Process" />
        })}
      </div>
    );
  }
}
export default Orders;
