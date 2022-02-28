import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

// import LoginPage from "../login";
// import "../CSS files/footer.css";

export default function Order(props) {
  return (
    <div
      style={{
        width: "90%",
        padding: "1.5em",
        border: "2px solid #efefef",
        borderRadius: "5px",
        margin: "1em",
      }}
    >
      <p style={{ width: "100%", textAlign: "right" }}>Date: 13/02/2022</p>
      <h5>Order Summary:</h5>
      <span
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <h6 style={{ marginLeft: "0.2em" }}>Hotel:</h6>
        <h6 style={{ marginLeft: "0.2em" }}>Rasraj Hotel</h6>
      </span>
      <h6>Order:</h6>
      <span
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          width: "100%",
        }}
      >
        <p style={{ fontWeight: "bold" }}>Food</p>
        <p style={{ fontWeight: "bold", textAlign: "right" }}>Quantity</p>
        <p>Shahi Paneer</p>
        <p style={{ textAlign: "right" }}>1</p>
      </span>
      <div
        style={{
          display: "flex",
          padding: "0.5em 0.5em 0",
          justifyContent: "center",
        }}
      >
        <p
          type="button"
          style={{
            textAlign: "center",
            width: "5em",
            padding: "0.5em 1em",
            margin: "0 1.5em 0.5em",
            border: "1px solid green",
            borderRadius: "8px",
            color: "green",
          }}
        >
          Accept
        </p>
        <p
          type="button"
          style={{
            width: "5em",
            textAlign: "center",
            padding: "0.5em 1em",
            margin: "0 1.5em 0.5em",
            border: "1px solid red",
            borderRadius: "8px",
            color: "red",
          }}
        >
          Decline
        </p>
      </div>
    </div>
  );
}
