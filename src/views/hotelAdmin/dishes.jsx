import React, { Component, useEffect, useState } from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import InsertDish from "../../components/Hotel/insertDish";
// import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
import DishInfo from "../../components/Hotel/dishInfo";

function Dishes(props) {
  const [dishDetails, setDishDetails] = useState({
    dishes: [],
  });

  const resetDishes = () => {
    fetch("http://localhost:4000/api/hotel/dishes/6225e37a02b267ae9583f1d3", {
      method: "GET",
      // body: JSON.stringify(dishDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDishDetails(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    resetDishes();
  }, []);
  // componentDidMount() {}
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
      {dishDetails.dishes.map((dishes, index) => {
        return (
          <DishInfo
            id={dishes._id}
            name={dishes.name}
            numberofRatings={dishes.numberofRatings}
            price={dishes.price}
            type={dishes.type}
          />
        );
      })}
      {/* <DishInfo {...dishDetails} />
      <DishInfo />
      <DishInfo />
      <DishInfo /> */}

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
        <InsertDish title="Add Dish" resetDishes={resetDishes} />
      </div>
    </div>
  );
}
export default Dishes;
