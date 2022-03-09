import React, { Component } from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import InsertDish from "../../components/Hotel/insertDish";
// import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
import DishInfo from "../../components/Hotel/dishInfo";

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <DishInfo />
        <DishInfo />
        <DishInfo />
        <DishInfo />
        <DishInfo />
        {/* <InsertDish /> */}
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
          <InsertDish title="Add Dish" />
        </div>
      </div>
    );
  }
}
export default Dishes;
