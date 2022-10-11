import React, { Component } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "@testing-library/react";
import Img from "../../assets/img/HomeImg.jpg";
import "../CSS files/cityHotel.css";
import { Link } from "react-router-dom";

function CityHotel(props) {
  const [hotel,setHotel]=React.useState(props.hotel);
    return (
      <Link to={`/hotel/${hotel._id}`}>
      <div
        className="dish_box"
        id={hotel.id}
        style={{
          color:"black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1em",
          height: "fit-content",
          borderRadius: "5px 5px 5px 5px",
          boxShadow: "0 0 10px rgba(0, 0, 255, .2)",
          width: "95%",
          maxWidth: "900px",
          padding: "1em 2em 1em 1em",
          alignContent: "center",
        }}
      >
        <div
          className="dish_box1"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{
              alignSelf: "center",
              height: "4.5em",
              borderRadius: "5px 5px 5px 5px",
              opacity: "1",
            }}
            src={Img}
            alt=""
          />
          <div
            style={{ width: "95%", padding: "0.5em 0.5em" }}
            className="hotel_info"
          >
            <h6>{hotel.name}</h6>
            <p style={{ marginBottom: "0.1em" }}>
              <span style={{ color: "rgb(255,213,5)" }}>
              {[...Array(5)].map((e, i) => {
                if (i < hotel.ratings) return <>&#9733;</>;
                return <>&#9734;</>;
              })}
              </span>
            </p>
            <div className="hotel_details">
              <p style={{ marginBottom: "0.1em" }}>Phone Number: {hotel.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
        </div>
      </div>
      </Link>
    );
  
}
export default CityHotel;
