import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "@testing-library/react";
import LoginPage from "./login";
import RegisterPage from "./signUp.jsx";

class NavbarInstance extends Component {
  render() {
    return (
      <nav
        style={{ width: "100%", height: "4em", background: "var(--color1)" }}
      >
        <div
          style={{
            height: "100%",
            width: "5em",
            color: "white",
            fontSize: "25px",
            fontWeight: "500",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            float: "left",
          }}
        >
          Foodie
        </div>
        <div
          style={{
            float: "right",
            marginRight: "1em",
            padding: "0.5em",
            display: "none",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://img.icons8.com/ultraviolet/40/000000/test-account.png"
            alt=""
          />
        </div>
        <div
          style={{
            float: "right",
            marginRight: "1em",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginPage title="Login" />
          <LoginPage title="SignUp" />
        </div>
        <div className="hamburger"></div>
      </nav>
    );
  }
}
export default NavbarInstance;
