import React, { Component } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import InputBar from '../components/inputBar';
import homeImage from '../assets/img/HomeImg.jpg';
import './CSS files/hotelAdmin.css';
import Dashboard from "../views/hotelAdmin/dashboard";
import Dishes from "../views/hotelAdmin/dishes";
import Orders from "../views/hotelAdmin/orders";

class HotelAdmin extends Component{
    constructor(props){
        super(props);
        this.state={key:'Dashboard'};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${homeImage})`,
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "50vh",
                zIndex: "-1",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                height: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0,0,0,0.6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  margin: "3em",
                }}
              >
                <h1>Foodie</h1>
                <span style={{ fontWeight: "1px", fontSize: "20px" }}>
                  “Ate, eating, going to eat” that’s what you must care about.
                </span>
                {/* <h6>Location</h6> */}
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{ maxWidth: "1000px", width: "100%", padding: "2em" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      width: "100%",
                      margin: "1em",
                      padding: "1em",
                    }}
                  >
                    <button
                      id="dashboard-section"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "2px",
                        padding: "1em",
                        paddingBottom: "0em",
                        border:
                          this.state.key === "Dashboard"
                            ? "2px solid #efefef"
                            : "none",
                        borderBottom:
                          this.state.key === "Dashboard"
                            ? "none"
                            : "2px solid #efefef",
                      }}
                      onClick={() => {
                        this.setState({ key: "Dashboard" });
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      id="dish-section"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "2px",
                        padding: "1em",
                        paddingBottom: "0em",
                        border:
                          this.state.key === "Dish"
                            ? "2px solid #efefef"
                            : "none",
                        borderBottom:
                          this.state.key === "Dish"
                            ? "none"
                            : "2px solid #efefef",
                      }}
                      onClick={() => {
                        this.setState({ key: "Dish" });
                      }}
                    >
                      Dish
                    </button>
                    <button
                      id="order-section"
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "2px",
                        padding: "1em",
                        paddingBottom: "0em",
                        border:
                          this.state.key === "Order"
                            ? "2px solid #efefef"
                            : "none",
                        borderBottom:
                          this.state.key === "Order"
                            ? "none"
                            : "2px solid #efefef",
                      }}
                      onClick={() => {
                        this.setState({ key: "Order" });
                      }}
                    >
                      Orders
                    </button>
                    <div
                      style={{
                        padding: "1em",
                        paddingBottom: "0em",
                        width: "100%",
                        // height: "100%",
                        borderBottom: "2px solid #efefef",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: this.state.key === "Dashboard" ? "" : "none",
                      width: "95%",
                    }}
                  >
                    <Dashboard />
                  </div>

                  <div
                    style={{
                      display: this.state.key === "Dish" ? "" : "none",
                      width: "95%",
                    }}
                  >
                    <Dishes/>
                  </div>

                  <div
                    style={{
                      display: this.state.key === "Order" ? "" : "none",
                      width: "95%",
                    }}
                  >
                    <Orders/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default HotelAdmin;