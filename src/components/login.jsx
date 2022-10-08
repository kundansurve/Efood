import React, { useState, useEffect, useContext } from "react";
import "./CSS files/login.css";
import axios from "axios";
import { City, UserType,UserData,fetchUserInfo } from "../context";

function LoginPage(props) {
  const [userData,setUserData]=useContext(UserData);
  const [show, setShow] = useState(false);
  const mainFunc = { title: props.title };
  const [action, setAction] = useState({ title: props.title });
  const [error,setError] = useState("");
  const fetchUserInfoFunc = useContext(fetchUserInfo);
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
      fetch("/api/sessions/", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(res=>res.json())
        .then((resp) => {
          if(resp && resp.error){
            setError(resp.error);
            return;
          }
          setAction(mainFunc);
          setShow(false);
          fetch("/api/authenticate/me")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"]) {
          console.log(data["error"]);
          alert(data.error || data.errormassege || data.message)
          return;
        }
        sessionStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
      })
      .catch((error) => console.log(error));
        })
        .catch((error) => alert(error));
    } catch (err) {
      alert(err);
    }
  };
  const signUp = () => {
    try {
      fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data && data.error){
            setError(data.error);
            return;
          }
          sessionStorage.setItem("userData", JSON.stringify(data));
          setAction(mainFunc);
          setUserData(data);
          setShow(false);
        });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(()=>{
    setError("");
  },[loginDetails,signUpDetails]);
  
  useEffect(()=>{
    setSignUpDetails({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
    });
    setLoginDetails({
      email: "",
      password: "",
    });
  },[show])
  return action.title == "Login" ? (
    <>
      <div
        className="colors"
        type="button"
        style={{ color: props.buttonColor, padding: "0.5em" }}
        onClick={handleShow}
      >
        {props.title}
      </div>
      <div
        className="loginSection"
        style={{
          display: show ? "flex" : "none",
          position: "fixed",
          top: "0px",
          zIndex: "999",
        }}
      >
        <div id="logincard">
          <img
            type="button"
            alt=""
            className="close"
            src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png"
            name="close"
            style={{ width: "20px", float: "right", margin: "1em" }}
            onClick={handleClose}
          />
          <div id="logincard-content">
            <div id="logincard-title">
              <h2>LOGIN</h2>
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
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
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
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
              />
              <div className="form-border"></div>
              <a href="#">
                <legend id="forgot-pass">Forgot password?</legend>
              </a>
              <p style={{color:"var(--error)",textAlign:"center"}}>{error}</p>
              <input
                id="submit-btn"
                onClick={login}
                type="button"
                name="submit"
                value="LOGIN"
                style={{ margin: "1em auto" }}
              />
              <a
                href="#"
                id="signup"
                onClick={() => {
                  setAction({ title: "SignUp" });
                }}
              >
                Don't have account yet?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        className="colors"
        type="button"
        style={{ color: props.buttonColor, padding: "0.5em" }}
        onClick={handleShow}
      >
        {props.title}
      </div>
      <div
        className="loginSection"
        style={{
          display: show ? "flex" : "none",
          position: "fixed",
          top: "0px",
          zIndex: "999",
        }}
      >
        <div id="logincard">
          <img
            type="button"
            className="close"
            src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png"
            name="close"
            style={{ width: "20px", float: "right", margin: "1em" }}
            onClick={handleClose}
          />
          <div id="logincard-content">
            <div id="logincard-title">
              <h2>SIGN UP</h2>
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
              <p style={{color:"var(--error)",textAlign:"center"}}>{error}</p>
              <input
                onClick={signUp}
                id="submit-btn"
                type="button"
                name="submit"
                value="SIGNUP"
                style={{ margin: "1em auto" }}
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
export default LoginPage;
