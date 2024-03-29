import React, { useState, useEffect } from "react";
import "./CSS files/login.css";
import axios from "axios";
import SetAddress from "./map";
//import SetAddress from "./map";

function RegisterHotel(props) {
  const [show, setShow] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [hotelCity, setHotelCity] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [cityIndex,setCityIndex] = useState(0);
  const [error,setError] = useState("");
  const [address, setAddress] = useState(
    {
      coordinates: [],
      address: '',
      detailAddress: '',
    });


  const registerHotel = () => {
    const hotelData = { email: signUpDetails.email, name: signUpDetails.name, phoneNumber: signUpDetails.phoneNumber, cityId: signUpDetails.city._id, location: address, password: signUpDetails.password };
    try {
      fetch("/api/hotel/register", {
        method: "POST",
        body: JSON.stringify(hotelData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(response=>response.json())
      .then((d)=>{
        if(d.error){
          setError(d.error);
          return;
        }
        setOpenModal(false);
        setShow(false);
        
      }).catch((error)=>{
        console.log(error);
        setError(error);
      })
    }catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetch('/api/cities/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then((data) => {
        setCityList(data.cities);
        setSignUpDetails({ ...signUpDetails, city: data.cities[0] })
        
      }).catch(error => console.log("cityError: " + error))
  }
    , []);


  const handleClose = (e) => {
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
    name:"",
    password: "",
    phoneNumber: "",
    city: cityList[0]
  });

  useEffect(()=>{
    setError("");
  },[cityList,hotelCity,cityIndex,address])

  useEffect(()=>{
    setSignUpDetails({email: "",
    name:"",
    password: "",
    phoneNumber: "",
    city: cityList[0]
  });
  setAddress({
    coordinates: [],
    address: '',
    detailAddress: '',
  });
  },[show]);

  return (
    (openModal) ? <>
      <SetAddress close={() => { setOpenModal(false) }} onclick={(address) => { setAddress(address);setOpenModal(false); }} bounds={[[signUpDetails.city.location.coordinates[1]-0.1, signUpDetails.city.location.coordinates[0]-0.1], [signUpDetails.city.location.coordinates[1]+0.1, signUpDetails.city.location.coordinates[0]+0.1]]} center={[signUpDetails.city.location.coordinates[1], signUpDetails.city.location.coordinates[0] ]} /></> :
      <>
        <div className="colors" type="button" style={{ color: "white", borderRadius: "5px", border: "1px solid white", padding: "0.3em", margin: '0.5em' }} onClick={handleShow}>
          Register Hotel
        </div>
        <div className="loginSection" style={{ display: (show) ? "flex" : "none", position: "fixed", top: "0px", zIndex: "999" }} >
          <div id="logincard" >
            <img type="button" className="close" src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" name="close" style={{ width: "20px", float: "right", margin: "1em" }} onClick={handleClose} />
            <div id="logincard-content" style={{ height: "fit-content" }}>

              <div id="logincard-title">
                <h2 >Register Hotel</h2>
                <div className="underline-title"></div>

              </div>
              <form method="post" className="form" style={{ width: "100%", height: "100%" }}>
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
                  name="name"
                  autocomplete="on"
                  required
                  value={signUpDetails.name}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      name: e.target.value,
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
                  value={cityIndex[0]}
                  onChange={(e) => {
                    setAddress({
                      coordinates: [],
                      address: '',
                      detailAddress: '',
                    });
                    setCityIndex(e.target.value);
                    setSignUpDetails({
                      ...signUpDetails,
                      city: cityList[e.target.value]
                    })
                    
                  }}
                >
                  {(cityList.map((data, index) => {
                    return <option id={data._id} value={index} name={data.name}>{data.name}</option>;
                  }))}
                </select>
                <div className="form-border"></div>
                <label for="location" style={{ paddingTop: "22px" }}>
                  &nbsp;Location
                </label>
                <span type="button"
                  id="location"
                  className="form-content"
                  name="address"
                  required
                  value={address.address}
                  onClick={(e) =>
                    setOpenModal(true)
                  }
                >{(address.address && address.address.length>0)?address.address.substring(0, 30):"Add Your Hotel Location"}...</span>

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
                <p style={{color:"var(--error)",textAlign:"center"}}>{error}</p>

                <input
                  onClick={registerHotel}
                  id="submit-btn"
                  type="button"
                  name="submit"
                  value="REGISTER"
                  style={{ margin: "1em auto" }}
                />
              </form>
            </div>
          </div>
        </div>
      </>
  );
}
export default RegisterHotel;
