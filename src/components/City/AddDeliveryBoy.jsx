import React, { useState } from "react";
import "../CSS files/addDeliveryBoy.css";
import NotFoundPage from "../../views/notfound";

function AddDeliveryBoy(props) {
  const location = {...props.hotelUser.location,"type":"Point"};
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const resetDeliveryExecutives=props.resetDeliveryExecutives;
  const handleClose = (e) => {
    if (
      e.target.className == "close" ||
      e.target.className == "loginSection close"
    ) {
      setShow(false);
      setName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
    }
  };
  const onClickAdd=()=>{
    fetch("http://localhost:4000/api/city/me/new-delivery-executive", {
        method: "POST",
        body: JSON.stringify({email,name,location,password,phoneNumber}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(res=>res.json())
      .then(data=>{
        resetDeliveryExecutives();
        setShow(false);
      setName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      }).catch(error=>console.log(error))
  }
  const handleShow = () => setShow(true);
  return  (
    <>
      <div
        className="colors"
        type="button"
        style={{ color: "black", padding: "0.5em" }}
        onClick={handleShow}
      >
        {props.title}
      </div>
      <div
        className="dishSection close"
        value="close"
        onClick={handleClose}
        style={{
          display: show ? "flex" : "none",
          position: "fixed",
          top: "0px",
          zIndex: "999",
        }}
      >
        <div id="dishCard">
          <img
            className="close"
            type="button"
            src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png"
            value="close"
            style={{ width: "20px", float: "right", margin: "1em" }}
            onClick={handleClose}
            alt=""
          />
          <div id="dishCard-content">
            <div id="dishCard-title">
              <h2>Add a Delivery Boy</h2>
 
            </div>
            <form method="post" className="form">
              <label for="dish-image" style={{ paddingTop: "13px" }}>
                &nbsp;Upload Profile
              </label>
              <input
                type="file"
                id="dish-image"
                className="form-content"
                name="image"
                autocomplete="on"
                
              />
              <label for="name" style={{ paddingTop: "13px" }}>
                &nbsp;Name
              </label>
              <input
                id="name"
                className="form-content"
                type="text"
                name="name"
                autocomplete="on"
                required
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
              <div className="form-border"></div>
              <label for="email" style={{ paddingTop: "13px" }}>
                &nbsp;Email
              </label>
              <input
                id="email"
                className="form-content"
                name="email"
                autocomplete="on"
                required
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <div className="form-border"></div>
              <label for="phoneNumber" style={{ paddingTop: "13px" }}>
                &nbsp;Phone Number
              </label>
              <input
                id="phoneNumber"
                className="form-content"
                name="phoneNumber"
                autocomplete="on"
                required
                value={phoneNumber}
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
              />
              <div className="form-border"></div>
              <label for="password" style={{ paddingTop: "13px" }}>
                &nbsp;Password
              </label>
              <input
                id="password"
                className="form-content"
                name="password"
                autocomplete="on"
                required
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <div className="form-border"></div>
              <div className="dish_btns">
                <input
                  className="btns"
                  id="btn-submit"
                  type="button"
                  name="submit"
                  value="Add"
                  onClick={onClickAdd}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDeliveryBoy;
