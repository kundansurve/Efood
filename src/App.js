import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./views/home";
import Hotel from "./views/hotel";
import NavbarInstance from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Cart from "./views/user/cart";
import OrderTrack from "./views/user/delivery";
import Orders from "./views/user/orders";
import NotFoundPage from "./views/notfound";
import DeliveryAdmin from "./views/deliveryExecutive/orders";
import OrdersForDeliveryExecutive from "./views/deliveryExecutive/order";
import PrevOrders from "./views/deliveryExecutive/prevOrders";
import HotelAdmin from "./views/hotelAdmin";
import CityAdmin from "./views/cityAdmin";
import { UserData, City, fetchUserInfo} from "./context";
//import {data} from './store';

function App() {
  const [userData, setUserData] = useState({
    userType: "User",
    user:{
      "_id":"622ee28c71f99c3c14dcfa91",
      "email": "kundansurve01@gmail.com",
      "firstName": "Kundan",
      "lastName": "Surve",
      "location": {
        "coordinates": []
      },
      "phoneNumber": "8623046619",
      "orders": [],
      "pastSearches": [],
      "cart": {
        "orderingFor": {},    "hotelId": "6225e37a02b267ae9583f1d3",    "items": {      "62261a02d3140ef33b6f438d": 2,      "622619f6d3140ef33b6f438c": 2    },
        "offer": null,
        "price": 1040,
        "isPaid": false,
        "deliveryLocation": {
          "address": "DHULE PRABHAT NAGAR",
          "detailAddress": null,
          "lnglat": {
            "type": null,
            "coordinates": null
          }
        }
      },
      "createdAt": "null",
      "updatedAt": "null",
      "__v": 0
    },
    location: { coordinates: [20.933614859088873, 74.77857721534356] },
    isFree: true,
    currentOrder: "",
  });

  const [city, setCity] = useState("6225d3ee02b267ae9583f1c3");
  const fetchUserInfoFunc=()=>{
    fetch("http://localhost:4000/api/authenticate/me")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          alert(data["error"]);
          return;
        }
        sessionStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
      })
      .catch((error) => console.log(error));
    sessionStorage.setItem("City", city);
  }

  useEffect(() => {
    // fetching the data of user if user is login
    fetch("http://localhost:4000/api/authenticate/me")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          alert(data["error"]);
          return;
        }
        sessionStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
      })
      .catch((error) => console.log(error));
    sessionStorage.setItem("City", city);
  }, []);

  useEffect(() => sessionStorage.setItem("City", city));
  return (
    <>
      <UserData.Provider value={[userData, setUserData]}>
        <City.Provider value={[city, setCity]}>
          <fetchUserInfo.Provider value={fetchUserInfoFunc}>
          <NavbarInstance />
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/hotel/:hotelName" element={<Hotel />} />
              {userData && userData.userType === "City" ? (
                <>
                  {/* City Admin Proctected Paths*/}
                  <Route exact path="/cityAdmin/" element={<CityAdmin />} />
                </>
              ) : null}
              {userData && userData.userType === "Hotel" ? (
                <>
                  {/* Hotel Admin Proctected Paths*/}
                  <Route exact path="/hotelAdmin/" element={<HotelAdmin />} />
                </>
              ) : null}
              {userData && userData.userType === "User" ? (
                <>
                  {/* User Proctected Paths*/}
                  <Route exact path="/mycart" element={<Cart />} />
                  <Route exact path="/orders" element={<Orders />} />
                  <Route
                    exact
                    path="/orders/:orderid"
                    element={<OrderTrack />}
                  />
                </>
              ) : null}
              {userData && userData.userType === "DeliveryExecutive" ? (
                <>
                  {/* User Proctected Paths*/}
                  <Route
                    exact
                    path="/delivery-executive/orders"
                    element={<DeliveryAdmin />}
                  />
                  <Route
                    exact
                    path="/delivery-executive/orders/previous"
                    element={<PrevOrders />}
                  />
                  <Route
                    exact
                    path="/delivery-executive/orders/order/:orderid"
                    element={<OrdersForDeliveryExecutive />}
                  />
                </>
              ) : null}
              <Route exact path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Footer />
          </fetchUserInfo.Provider>
        </City.Provider>
      </UserData.Provider>
    </>
  );
}

export default App;
