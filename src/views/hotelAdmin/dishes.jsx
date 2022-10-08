import React, { Component, useEffect, useState } from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import InsertDish from "../../components/Hotel/insertDish";
// import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
import DishInfo from "../../components/Hotel/dishInfo";
import LoadingSpinner from "../../components/loading";

function Dishes(props) {
  const [dishDetails, setDishDetails] = useState({
    dishes: [],
  });

  const [_id,setId] = useState();
  useEffect(()=>{
    fetch('/api/authenticate/me')
    .then(response=>response.json())
    .then((data)=>{
      console.log("HotelAdmin"+data);
      setId(data.user._id);
      resetDishes(data.user._id);
    }).catch(error=>{
      if(error){
        alert(error);
      }else{
        alert("Server Error");
      }
    })
  },[])
  const resetDishes = (id) => {
    fetch(`/api/hotel/dishes/${id}`, {
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
      {(!dishDetails.dishes) ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "100%",
      }}
    >
      <LoadingSpinner/>
    </div>):null}
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
        <InsertDish title="Add Dish" resetDishes={()=>{resetDishes(_id)}} />
      </div>
    </div>
  );
}
export default Dishes;
