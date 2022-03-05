import './App.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import Home from "./views/home";
import Hotel from "./views/hotel";
import NavbarInstance from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Cart from './views/user/cart';
import OrderTrack from './views/user/delivery';
import Orders from './views/user/orders';
import NotFoundPage from './views/notfound';
import DeliveryAdmin from './views/deliveryExecutive/orders';
import OrdersForDeliveryExecutive from './views/deliveryExecutive/order';
import PrevOrders from './views/deliveryExecutive/prevOrders';
import HotelAdmin from './views/hotelAdmin';
import {UserType} from './context';
//import {data} from './store';

function App() {
  const [data,setData]=useState({
    userType:sessionStorage.getItem('userType'),
    setUserType:function(type){
        alert(this.userType);
        this.userType=type;
        alert(this.userType);
    }
});
useEffect(()=>{
      sessionStorage.setItem('userType',data['userType']);
})
  return (
    <>
    <UserType.Provider value={[data,setData]}>
    <NavbarInstance/>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/hotel/:hotelName" element={<Hotel/>}/>
      <Route exact path="/hotel/" element={<HotelAdmin/>}/>
      <Route exact path="/user/mycart" element={<Cart/>}/>
      <Route exact path="/user/orders" element={<Orders/>}/>
      <Route exact path="/user/orders/order/:orderid" element={<OrderTrack/>}/>
      <Route exact path='/delivery-executive/orders' element={<DeliveryAdmin/>}/>
      <Route exact path='/delivery-executive/orders/previous' element={<PrevOrders/>}/>
      <Route exact path='/delivery-executive/orders/order/:orderid' element={<OrdersForDeliveryExecutive/>}/>
      <Route  exact path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
    <Footer/>
  </UserType.Provider>
    </>
  );
}

export default App;