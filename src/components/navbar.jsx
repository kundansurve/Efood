import React,{useState,useEffect,useContext} from 'react';
import './CSS files/navbar.css';
import { Link } from 'react-router-dom';
import LoginPage from './login';
import {UserData,City} from './../context';
import RegisterHotel from './hotelRegister';
import './navbar.css';


function NavbarInstance(props){
  const [userData,setUserData]=useContext(UserData);
  
  const [openHamburger,setOpenHamburger]=useState(false);

  const logout = () =>{
    sessionStorage.removeItem("userData");
    setUserData({});
    fetch('http://localhost:4000/api/sessions/me',{
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(resp=>resp.json())
    .then((data)=>{
      alert(JSON.stringify(data));
    }).catch(error=>{
      alert(error);
    })
    setOpenHamburger(false);
    //window.location.href = "http://localhost:3000/";
  }

      return (<>
        <nav className="navbar" style={{width:"100%",height:"4em",background:"var(--color1)",position:"fixed",left:"0px",top:"0px"}}>
          <a href="http://localhost:3000/"><div style={{height:"100%",width:"5em",color:"white",fontSize:"25px",fontWeight:"500",display:"flex",justifyContent:"center",alignItems:"center",float:"left"}}>Foodie</div>
          </a><div style={{float:"right",marginRight:"1em",padding:"0.5em",display:"none",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <img src="https://img.icons8.com/ultraviolet/40/000000/test-account.png"/>
          <button style={{color:"wheat",zIndex:"4"}}>Register Hotel</button>
          </div>
          <div className="largeDevice" style={{float:"right",color:"white",marginRight:"1em",height:"100%",justifyContent:"center",alignItems:"center"}}>
          {(userData['userType'] && userData['userType']==='User')?
          <>
          <a href='http://localhost:3000/'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Home
        </div></a>
          <a href='/mycart'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Cart
        </div></a>
        <a href='/orders'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Orders
        </div></a>

        </>:null}

        {(userData['userType'] && userData['userType']==='Hotel')?
          <>
          <a href='http://localhost:3000/'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Home
        </div></a>
        <a href='/hotelAdmin'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Admin Page
        </div></a>
        <></>
        </>:null}

        {(userData['userType'] && userData['userType']==='City')?
          <>
          <a href='http://localhost:3000/'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Home
        </div></a>
        <a href='/cityAdmin'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Admin Page
        </div></a>
        <></>
        </>:null}

        {(userData['userType'] && userData['userType']==='DeliveryExecutive')?
          <>
          <a href='http://localhost:3000/'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Home
        </div></a>
          <a href='/delivery-executive/orders'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Orders
        </div></a>
        <a href='/delivery-executive/orders/previous'>
          <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
            Previous Orders
        </div></a>

        </>:null}
        
          {(userData['userType'])?
          <>
          <div style={{width:"200px",margin:"0px"}}> 
          <div class="dropdown" style={{width:"100%"}}>
        <span className="dropbtn" style={{padding:"10px"}}><img  style={{margin:"5px"}} src="https://img.icons8.com/color/30/26e07f/test-account.png"/>Hello! {userData['user']['firstName'] || userData['user']['name']}</span>

    <div className="dropdown-content">
      <a href="#" onClick={logout}>Logout</a>
      </div></div>
          
        </div>
            </>:<>
            <RegisterHotel/>
            <LoginPage  title="Login" buttonColor={'white'}/>
            <LoginPage  title="SignUp" buttonColor={'white'}/></>
            }
          </div>
          <div className="smallDevice" style={{float:"right",marginRight:"1em",height:"100%",justifyContent:"center",alignItems:"center"}}>
            <img className='hamburgerOption' src="https://img.icons8.com/external-gradak-royyan-wijaya/24/ffffff/external-hamburger-menu-basic-interface-iii-gradak-royyan-wijaya.png" onClick={()=>setOpenHamburger(true)}/>
          </div>

          
        </nav>
        <div className="hamburger" style={{display:(openHamburger)?"flex":"none", backgroundColor:"rgba(0,0,0,0.4)",position:"fixed",left:"0px",top:"0px",width:"100%",height:"100%",zIndex:"500"}}>

        <div className="Links" style={{backgroundColor:"var(--color1)",maxWidth:"300px",minWidth:"300px",height:"100%"}}>
        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png" style={{float:"right",margin:"1em"}} onClick={()=>setOpenHamburger(false)}/>
          <div style={{display:"flex",backgroundColor:"var(--color1)",justifyContent:"flex-start",alignItems:"center",padding:"1em",flexDirection:"column",width:"100%",height:"100%"}}>
          <img style={{margin:"1em"}} src="https://img.icons8.com/color/80/26e07f/test-account.png"/>
          {(userData['userType'])?<p style={{color:"white"}}>Hello! {userData['user']['firstName']|| userData['user']['name']}</p>:null}
          {(userData['userType'])?
      <> </>:<>
        <RegisterHotel/>
        <LoginPage  title="Login" buttonColor={'white'}/>
        <LoginPage  title="SignUp" buttonColor={'white'}/></>
        }
        {(userData['userType'] && userData['userType']==='User')?
      <>
      <a href='http://localhost:3000/'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Home
    </div></a>
      <a href='/mycart'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Cart
    </div></a>
    <a href='/orders'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Orders
    </div></a>

    </>:null}

    {(userData['userType'] && userData['userType']==='Hotel')?
      <>
      <a href='http://localhost:3000/'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Home
    </div></a>
    <a href='/hotelAdmin'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Admin Page
    </div></a>
    <></>
    </>:null}

    {(userData['userType'] && userData['userType']==='City')?
      <>
      <a href='http://localhost:3000/'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Home
    </div></a>
    <a href='/cityAdmin'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Admin Page
    </div></a>
    <></>
    </>:null}

    {(userData['userType'] && userData['userType']==='DeliveryExecutive')?
      <>
      <a href='http://localhost:3000/'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Home
    </div></a>
      <a href='/delivery-executive/orders'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Orders
    </div></a>
    <a href='/delivery-executive/orders/previous'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Previous Orders
    </div></a>
    
    <a href='/delivery-executive/orders/previous'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}}>
        Previous Orders
    </div></a>
    </>:null}
    <a href='#'>
      <div  className="colors" type="button" style={{color:'white',padding:"0.5em"}} onClick={logout}>
        LOGOUT
    </div></a>
          </div>
        </div>
      </div>
        </>
      );
  }

export default NavbarInstance;
