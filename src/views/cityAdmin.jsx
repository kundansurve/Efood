import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import InputBar from '../components/inputBar';
import homeImage from "../assets/img/HomeImg.jpg";
import "./CSS files/hotelAdmin.css";
// import Dashboard from "../views/hotelAdmin/dashboard";
import Hotels from "./cityAdmin/hotels";
import DeliveryExecutive from "./cityAdmin/deliveryExcecutive";
// import Orders from "../views/hotelAdmin/orders";
import { UserData } from "../context";

function CityAdmin(props){
    const [key,setKey] = React.useState("Hotel");
    const [hotelUser,setHotelUser]=React.useContext(UserData);
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
            <div style={{ maxWidth: "1000px", width: "100%", padding: "2em" }}>
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
                  id="hotels-section"
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "2px",
                    padding: "1em",
                    paddingBottom: "0.5em",
                    border:
                      key === "Hotel" ? "2px solid #efefef" : "none",
                    borderBottom:
                      key === "Hotel" ? "none" : "2px solid #efefef",
                  }}
                  onClick={() => {
                    setKey( "Hotel" );
                  }}
                >
                  Hotels
                </button>
                <button
                  id="delivery_boy-section"
                  style={{
                      minWidth: "180px",
                    backgroundColor: "transparent",
                    borderRadius: "2px",
                    padding: "1em",
                    paddingBottom: "0.5em",
                    border:
                      key === "Delivery_Executive"
                        ? "2px solid #efefef"
                        : "none",
                    borderBottom:
                      key === "Delivery_Executive"
                        ? "none"
                        : "2px solid #efefef",
                  }}
                  onClick={() => {
                    setKey("Delivery_Executive" );
                  }}
                >
                  Delivery Executive
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
                  display:key === "Hotel" ? "" : "none",
                  width: "95%",
                }}
              >
                {/* <Dashboard /> */}
                <Hotels/>
              </div>

              <div
                style={{
                  display:
                    key === "Delivery_Executive" ? "" : "none",
                  width: "95%",
                }}
              >
                <DeliveryExecutive hotelUser={hotelUser}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}
export default CityAdmin;
