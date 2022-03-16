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
import CityAdmin from './views/cityAdmin';
import {UserData,City} from './context';
//import {data} from './store';

function App() {
  
  const [userData,setUserData]=useState({
    userType:null,
  });
  
  const [city,setCity] = useState("6225d3ee02b267ae9583f1c3");

  useEffect(()=>{
    // fetching the data of user if user is login
    fetch('http://localhost:4000/api/authenticate/me')
    .then(response => response.json())
    .then((data)=>{
      if(data['error']){
        alert(data['error']);
        return;
      }
      sessionStorage.setItem('userData',JSON.stringify(data));
      setUserData(data);
      
    }).catch(error=>console.log(error));
    sessionStorage.setItem('City',city);
  },[]);

  useEffect(()=>sessionStorage.setItem('City',city));
  return (
    <>
    <UserData.Provider value={[userData,setUserData]}>
    <City.Provider value={[city,setCity]}>
    <NavbarInstance/>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/hotel/:hotelName" element={<Hotel/>}/>
      {(userData && userData.userType==='City')?(
        <>{/* City Admin Proctected Paths*/}
          <Route exact path="/cityAdmin/" element={<CityAdmin/>}/>
        </>)
        :null
      }
      {(userData && userData.userType==='Hotel')?(
        <>{/* Hotel Admin Proctected Paths*/}
          <Route exact path="/hotelAdmin/" element={<HotelAdmin/>}/>
        </>)
        :null
      }
      {(userData && userData.userType==='User')?(
        <>{/* User Proctected Paths*/}
          <Route exact path="/mycart" element={<Cart/>}/>
          <Route exact path="/orders" element={<Orders/>}/>
          <Route exact path="/orders/order/:orderid" element={<OrderTrack/>}/>
        </>):
        null
      }
      {(userData && userData.userType==='DeliveryExecutive')?(
        <>{/* User Proctected Paths*/}
          <Route exact path='/delivery-executive/orders' element={<DeliveryAdmin/>}/>
          <Route exact path='/delivery-executive/orders/previous' element={<PrevOrders/>}/>
          <Route exact path='/delivery-executive/orders/order/:orderid' element={<OrdersForDeliveryExecutive/>}/>
        </>):
        null
      }
        <Route  exact path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
    <Footer/>
    </City.Provider>
    </UserData.Provider>
    </>
  );
}

export default App;