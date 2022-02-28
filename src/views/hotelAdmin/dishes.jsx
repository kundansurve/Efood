import React, { Component } from "react";
import { render } from "@testing-library/react";
// import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
import DishInfo from "../../components/Hotel/dishInfo"

class Dishes extends Component {
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
        <DishInfo />
        <DishInfo />
        <DishInfo />
        <DishInfo />
        <DishInfo />
      </div>
    );
  }
}
export default Dishes;
