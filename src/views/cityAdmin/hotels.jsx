import React, { Component } from "react";
import { render } from "@testing-library/react";
// import { Link } from "react-router-dom";
import InsertDish from "../../components/Hotel/insertDish";
// import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
// import DishInfo from "../../components/Hotel/dishInfo";
import CityHotel from "../../components/City/cityHotel";

class Hotels extends Component {
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
        <CityHotel/>
        <CityHotel/>
        <CityHotel/>
      </div>
    );
  }
}
export default Hotels;
