import React, { Component } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "@testing-library/react";
import Img from "../../assets/img/homeImage.jpg";
import "../CSS files/dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
  }
  componentDidMount(){

  }
  
  render() {
    return (
      <div>
        <div
          style={{
            width: "80%",
            padding: "1em",
            minWidth: "360px",
            maxwWidth: "600px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "70%",
              padding: "1em",
              paddingLeft: "2em",
              border: "2px solid #efefef",
              borderRadius: "5px",
              margin: "1em",
              alignItems: "flex-start",
            }}
          >
            <h5
              style={{
                paddingBottom: "0.5em",
              }}
            >
              Hotel Name
            </h5>
            <input
              type="text"
              style={{
                marginLeft: "1em",
                border: "none",
                borderBottom: "1px solid black",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
              placeholder="Rasraj Hotel"
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "70%",
              padding: "1em",
              paddingLeft: "2em",
              border: "2px solid #efefef",
              borderRadius: "5px",
              margin: "1em",
              alignItems: "flex-start",
            }}
          >
            <h5
              style={{
                paddingBottom: "0.5em",
              }}
            >
              Address
            </h5>
            <input
              type="text"
              style={{
                marginLeft: "1em",
                border: "none",
                borderBottom: "1px solid black",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
              placeholder="Address"
            />
          </div>

          <div
            style={{
              width: "70%",
              padding: "1em",
              paddingLeft: "2em",
              border: "2px solid #efefef",
              borderRadius: "5px",
              margin: "1em",
            }}
          >
            <select
              style={{
                width: "30%",
                padding: "0.5em",
                borderRadius: "5px 0 0 5px",
              }}
            >
              <option>City</option>
              <option>City</option>
              <option>City</option>
            </select>
          </div>
          <div
            style={{
              width: "70%",
              padding: "1em",
              paddingLeft: "2em",
              border: "2px solid #efefef",
              borderRadius: "5px",
              margin: "1em",
              display: "flex",
              alignContent: "center",
            }}
          >
            <h5
              style={{
                paddingRight: "1em",
              }}
            >
              Opens :
            </h5>
            <input
              type="time"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            />
          </div>
          <div
            style={{
              width: "70%",
              padding: "1em",
              paddingLeft: "2em",
              border: "2px solid #efefef",
              borderRadius: "5px",
              margin: "1em",
              display: "flex",
              alignContent: "center",
            }}
          >
            <h5
              style={{
                paddingRight: "1em",
              }}
            >
              Closes :
            </h5>
            <input
              type="time"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            />
          </div>

          <div
            style={{
              height: "fit-content",
              width: "70%",
              display: "flex",
              alignItems: "center",
              margin: "1em",
            }}
          >
            <input id="submit-btn" type="submit" name="submit" value="Save" />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
