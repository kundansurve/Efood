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
import { Link,Navigate } from "react-router-dom";
//import {data} from './store';
import ReviewPage from './views/user/reviewPage';

function App() {
  const [userData, setUserData] = useState({});

  const [city, setCity] = useState("6225d3ee02b267ae9583f1c3");
  const fetchUserInfoFunc=(setUserData)=>{
    fetch("http://localhost:4000/api/authenticate/me")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          console.log(data["error"]);
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
          console.log(data["error"]);
          return;
        }
        sessionStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
      })
      .catch((error) => console.log(error));
    sessionStorage.setItem("City", city);
  }, []);

  useEffect(() => sessionStorage.setItem("City", city));
  
  function showPosition(position) {
    if(userData.userType==='DeliveryExecutive' && position){
      fetch('http://localhost:4000/api/delivery-executive/me/tracking',{
        method: "PUT",
        body: JSON.stringify({coords:[position.coords.longitude,position.coords.latitude]}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(resp=>resp.json())
      .then((res)=>{
        console.log(res);
      }).catch(error=>{
        console.log(error);
      })
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Please give access to track your location');
    }
  }
  const traceLocation = ()=>{
    getLocation();
    setTimeout(() => {
      traceLocation();
    }, 300000);
  }

  useEffect(()=>{
    traceLocation();
  },[])

  
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
              {/* City Admin Proctected Paths*/}
                  <Route exact path="/cityAdmin" element={<CityAdmin />} />
               
              
                  {/* Hotel Admin Proctected Paths*/}
                  <Route exact path="/hotelAdmin" element={<HotelAdmin />} />
                  <Route exact path="/mycart" element={<Cart />} />
                  <Route exact path="/orders" element={<Orders />} />
                  <Route
                    exact
                    path="/orders/:orderid"
                    element={<OrderTrack />}
                  />
                  <Route exact path="/review/:orderid" element={<ReviewPage/>} />
                
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
                
              <Route exact path="*" element={<Navigate to="/" />} />
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
