import React, { Component } from "react";
import { render } from "@testing-library/react";
import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
import CityDelivery from "../../components/City/cityDelivery";
import AddDeliveryBoy from "../../components/City/AddDeliveryBoy";

class DeliveryExecutive extends Component {
  componentDidMount() {}
  render() {
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
       <CityDelivery/>
       <CityDelivery/>
       <CityDelivery/>
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
            width: "20%",
            // color: "#24c64f",
          }}
        >
          {/* <InsertDish title="Add Dish" /> */}
          <AddDeliveryBoy title="Add Delivery Boy" />
        </div>
      </div>
    );
  }
}
export default DeliveryExecutive;
