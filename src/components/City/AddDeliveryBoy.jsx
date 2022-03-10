import React, { useState } from "react";
import "../CSS files/addDeliveryBoy.css";
import NotFoundPage from "../../views/notfound";

function AddDeliveryBoy(props) {
  const [show, setShow] = useState(false);
  const mainFunc = { title: props.title };
  const [action, setAction] = useState({ title: props.title });
  const handleClose = (e) => {
    if (
      e.target.className == "close" ||
      e.target.className == "loginSection close"
    ) {
      setAction(mainFunc);
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);
  return action.title == "Add Delivery Boy" ? (
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
              {/* <div className="underline-title"></div> */}
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
                required
                //   value={signUpDetails.phoneNumber}
                //   onChange={(e) =>
                //     setSignUpDetails({
                //       ...signUpDetails,
                //       phoneNumber: e.target.value,
                //     })
                //   }
              />
              {/* <div className="form-border"></div> */}
              <label for="dish-name" style={{ paddingTop: "13px" }}>
                &nbsp;Name
              </label>
              <input
                id="dish-name"
                className="form-content"
                type="text"
                name="dishName"
                autocomplete="on"
                required
                //   value={signUpDetails.email}
                //   onChange={(e) =>
                //     setSignUpDetails({
                //       ...signUpDetails,
                //       email: e.target.value,
                //     })
                //   }
              />
              <div className="form-border"></div>
              <label for="dish-price" style={{ paddingTop: "13px" }}>
                &nbsp;Age
              </label>
              <input
                id="dish-price"
                className="form-content"
                name="dishPrice"
                autocomplete="on"
                required
                //   value={signUpDetails.firstName}
                //   onChange={(e) =>
                //     setSignUpDetails({
                //       ...signUpDetails,
                //       firstName: e.target.value,
                //     })
                //   }
              />
              <div className="form-border"></div>
              <label for="dish-about" style={{ paddingTop: "13px" }}>
                &nbsp;About
              </label>
              <input
                id="dishAbout"
                className="form-content"
                name="AboutDish"
                autocomplete="on"
                required
                //   value={signUpDetails.lastName}
                //   onChange={(e) =>
                //     setSignUpDetails({
                //       ...signUpDetails,
                //       lastName: e.target.value,
                //     })
                //   }
              />

              <div className="form-border"></div>
              <label for="meal-type" style={{ paddingTop: "22px" }}>
                &nbsp;Gender
              </label>
              <div
                className="meal-radio"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "1em",
                }}
              >
                <label
                  for="male"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.4em",
                  }}
                >
                  Male
                  <input
                    id="male"
                    className="form-content"
                    type="radio"
                    name="gender"
                    value={"male"}
                    placeholder="male"
                    required
                    //   value={signUpDetails.password}
                    //   onChange={(e) =>
                    //     setSignUpDetails({
                    //       ...signUpDetails,
                    //       password: e.target.value,
                    //     })
                    //   }
                  />
                </label>
                <label
                  for="Female"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.4em",
                  }}
                >
                  Female
                  <input
                    id="female"
                    className="form-content"
                    type="radio"
                    name="gender"
                    value={"Female"}
                    required
                    //   value={signUpDetails.password}
                    //   onChange={(e) =>
                    //     setSignUpDetails({
                    //       ...signUpDetails,
                    //       password: e.target.value,
                    //     })
                    //   }
                  />
                </label>
              </div>
              <div className="dish_btns">
                <input
                  //   onClick={signUp}
                  className="btns"
                  id="edit-btn"
                  type="button"
                  // name="submit"
                  value="Edit"
                />
                <input
                  //   onClick={signUp}
                  className="btns"
                  id="btn-submit"
                  type="button"
                  name="submit"
                  value="Save"
                />

                {/* <a
                  href="#"
                  id="signup"
                  onClick={() => {
                    setAction({ title: "Login" });
                  }}
                >
                  Already have an account?
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <NotFoundPage />
  );
}

export default AddDeliveryBoy;
