import React, { useState, useEffect } from "react";
import "./CSS files/login.css";
import axios from "axios";
import SetAddress from "./map";
//import SetAddress from "./map";

function RegisterHotel(props) {
  const [show, setShow] = useState(false);
  const mainFunc = { title: props.title };
  const [cityList,setCityList]=useState([]); 
  const [hotelCity,setHotelCity]=useState(null);
  const [openModal,setOpenModal]=useState(false);
  const [address,setAddress]=useState(
    {
      coordinates:[],
      address:'',
      detailAddress:'',
  });

  const onChangeCity=(e)=>{
        
    fetch('http://localhost:4000/api/hotels/'+e, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
      .then((data)=>{
        //alert(data);

      }).catch(error=>alert("hotelerror: "+error));
  };
  useEffect(()=>
  {
    fetch('http://localhost:4000/api/cities/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(response => response.json())
        .then((data)=>{
            setCityList(data.cities);
        }).catch(error=>alert("cityError: "+error))
        onChangeCity(hotelCity);
      }
  ,[]);


  const handleClose = (e) => {
    // alert(e.target.className);
    if (
      e.target.className == "close" ||
      e.target.className == "loginSection close"
    ) {
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);

  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  

    return (
      (openModal)?<>
        <SetAddress close={()=>{setOpenModal(false)}} onclick={(address)=>{setAddress(address)}}/></>:
        <>
        <div className="colors"  type="button" style={{color:"white",borderRadius:"5px",border:"1px solid white",padding:"0.3em",margin:'0.5em'}} onClick={handleShow}>
          Register Hotel
        </div>
        <div className="loginSection" style={{display:(show)?"flex":"none",position:"fixed",top:"0px",zIndex:"999"}} >
        <div id="logincard" >
        <img type="button" className="close" src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" name="close" style={{width:"20px",float:"right",margin:"1em"}} onClick={handleClose}/>
    <div id="logincard-content" style={{height:"650px"}}>
    
      <div id="logincard-title">
        <h2 >Register Hotel</h2>
        <div className="underline-title"></div>

            </div>
            <form method="post" className="form" style={{width:"100%",height:"100%"}}>
              <label for="user-email" style={{ paddingTop: "13px" }}>
                &nbsp;Email
              </label>
              <input
                id="user-email"
                className="form-content"
                type="email"
                name="email"
                autocomplete="on"
                required
                value={signUpDetails.email}
                onChange={(e) =>
                  setSignUpDetails({ ...signUpDetails, email: e.target.value })
                }
              />
              <div className="form-border"></div>
              <label for="user-first-name" style={{ paddingTop: "13px" }}>
                &nbsp;Name
              </label>
              <input
                id="user-first-name"
                className="form-content"
                name="firstName"
                autocomplete="on"
                required
                value={signUpDetails.firstName}
                onChange={(e) =>
                  setSignUpDetails({
                    ...signUpDetails,
                    firstName: e.target.value,
                  })
                }
              />
              <div className="form-border"></div>
              <label for="user-phone-number" style={{ paddingTop: "13px" }}>
                &nbsp;Phone Number
              </label>
              <input
                id="user-phone-number"
                className="form-content"
                name="phoneNumber"
                autocomplete="on"
                required
                value={signUpDetails.phoneNumber}
                onChange={(e) =>
                  setSignUpDetails({
                    ...signUpDetails,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <div className="form-border"></div>
              <label for="city-id" style={{ paddingTop: "22px" }}>
                &nbsp;City 
              </label>
              <select
                id="city-id"
                className="form-content"
                type="password"
                name="password"
                required
                value={signUpDetails.password}
                onChange={(e) =>
                  'cityId'
                }
              >
                {(cityList.map((data)=>{
                            return <option id={data._id} value={data._id} name={data.name}>{data.name}</option>;
                          }))}
              </select>
              <div className="form-border"></div>
              <label for="location" style={{ paddingTop: "22px" }}>
                &nbsp;Location
              </label>
              <span
                id="location"
                className="form-content"
                name="address"
                required
                value={address.address}
                onClick={(e) =>
                  setOpenModal(true)
                }
              >Choose Address</span>
              
              <div className="form-border"></div>
              
              <label for="user-password" style={{ paddingTop: "22px" }}>
                &nbsp;Password
              </label>
              <input
                id="user-password"
                className="form-content"
                type="password"
                name="password"
                required
                value={signUpDetails.password}
                onChange={(e) =>
                  setSignUpDetails({
                    ...signUpDetails,
                    password: e.target.value,
                  })
                }
              />
              
              <div className="form-border"></div>
              
              <input
                onClick={null}
                id="submit-btn"
                type="button"
                name="submit"
                value="SIGNUP"
                style={{margin:"1em auto"}}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterHotel;
