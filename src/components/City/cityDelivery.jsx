import React, { Component } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "@testing-library/react";
import Img from "../../assets/img/HomeImg.jpg";
import "../CSS files/cityDelivery.css";

class CityDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0, id: props.id };
  }
  render() {
    return (
      <div
        className="dish_box"
        id={this.state.id}
        style={{
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
            <h6>Person Name</h6>
            <p style={{ marginBottom: "0.1em" }}>
              <span style={{ color: "rgb(255,213,5)" }}>
                {" "}
                &#9733;&#9734;&#9734;&#9734;&#9734;
              </span>
            </p>
            <div className="hotel_details">
              <p style={{ marginBottom: "0.1em" }}>Gender</p>
              <p style={{ marginBottom: "0.1em" }}>
                Address : Bibwewadi, East, Pune
              </p>
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
          <div className="quantity">
            <input id="submit-btn" type="submit" name="submit" value="About" />
          </div>
        </div>
      </div>
    );
  }
}
export default CityDelivery;
