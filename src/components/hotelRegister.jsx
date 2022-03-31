import React, { useState, useEffect } from "react";
import "./CSS files/login.css";
import axios from "axios";

function RegisterHotel(props) {
  const [show, setShow] = useState(false);
  const mainFunc = { title: props.title };
  const [action, setAction] = useState({ title: props.title });
  const handleClose = (e) => {
    // alert(e.target.className);
    if (
      e.target.className == "close" ||
      e.target.className == "loginSection close"
    ) {
      setAction(mainFunc);
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

  const login = () => {
    try {
      fetch("http://localhost:4000/api/sessions/", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          // setTimeout(() => {
             fetch("http://localhost:4000/api/authenticate/me")
               .then((response) => response.json())
               .then((data) => {
                 alert(JSON.stringify(data));
                 sessionStorage.setItem("userData", JSON.stringify(data));
                 handleClose();
               })
               .catch((error) => alert(error));
           //}, 4000);
        })
        .catch((error) => alert(error));
    } catch (err) {
      alert(err);
    }
  };
  const signUp = () => {
    try {
      fetch('http://localhost:4000/api/user/me/signUp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(signUpDetails),
}).then(response=>response.json())
        .then((data) => {
          sessionStorage.setItem("userData", JSON.stringify(data));
          handleClose();
        });
    } catch (err) {
      alert(err);
    }
  };

    return (
        <>
        <div className="colors"  type="button" style={{color:props.buttonColor,padding:"0.5em"}} onClick={handleShow}>
          {props.title}
        </div>
        <div className="loginSection" style={{display:(show)?"flex":"none",position:"fixed",top:"0px",zIndex:"999"}} >
        <div id="logincard" >
        <img type="button" className="close" src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" name="close" style={{width:"20px",float:"right",margin:"1em"}} onClick={handleClose}/>
    <div id="logincard-content">
    
      <div id="logincard-title">
        <h2 >SIGN UP</h2>
        <div className="underline-title"></div>

            </div>
            <form method="post" className="form">
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
                &nbsp;First Name
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
              <label for="user-last-name" style={{ paddingTop: "13px" }}>
                &nbsp;Last Name
              </label>
              <input
                id="user-last-name"
                className="form-content"
                name="lastName"
                autocomplete="on"
                required
                value={signUpDetails.lastName}
                onChange={(e) =>
                  setSignUpDetails({
                    ...signUpDetails,
                    lastName: e.target.value,
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
                onClick={signUp}
                id="submit-btn"
                type="button"
                name="submit"
                value="SIGNUP"
              />
              <a
                href="#"
                id="signup"
                onClick={() => {
                  setAction({ title: "Login" });
                }}
              >
                Already have an account?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterHotel;
