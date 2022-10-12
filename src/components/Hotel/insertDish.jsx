import React, { useState, useEffect } from "react";
import "../CSS files/insertDish.css";
import NotFoundPage from "../../views/notfound";

function InsertDish(props) {
  const [show, setShow] = useState(false);
  const resetDishes = props.resetDishes;
  const mainFunc = { title: props.title };
  const [action, setAction] = useState({ title: props.title });
  const [error,setError] = useState(null);
  const [dishDetails, setDishDetails] = useState({
    name: null,
    numberofRatings: null,
    price: null,
    isVeg: null,
    type: null,
  });

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
  return action.title == "Add Dish" ? (
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
        <div id="dishCard" style={{minWidth:"300px"}}>
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
              <h2>Add a Dish Info</h2>
              {/* <div className="underline-title"></div> */}
            </div>
            <form method="post" className="form">
              
              {/* <div className="form-border"></div> */}
              <label for="dish-name" style={{ paddingTop: "13px" }}>
                &nbsp;Dish Name
              </label>
              <input
                id="dish-name"
                className="form-content"
                type="text"
                name="dishName"
                autocomplete="on"
                required
                value={dishDetails.name}
                onChange={(e) =>
                  setDishDetails({
                    ...dishDetails,
                    name: e.target.value,
                  })
                }
              />
              <div className="form-border"></div>
              <label for="dish-price" style={{ paddingTop: "13px" }}>
                &nbsp;Price
              </label>
              <input
                id="dish-price"
                className="form-content"
                name="dishPrice"
                autocomplete="on"
                required
                value={dishDetails.price}
                onChange={(e) =>
                  setDishDetails({
                    ...dishDetails,
                    price: e.target.value,
                  })
                }
              />
              <div className="form-border"></div>
              <label for="dish-about" style={{ paddingTop: "13px" }}>
                &nbsp;About Dish
              </label>
              <input
                id="dishAbout"
                className="form-content"
                name="AboutDish"
                autocomplete="on"
                required
                value={dishDetails.type}
                onChange={(e) =>
                  setDishDetails({
                    ...dishDetails,
                    type: e.target.value,
                  })
                }
              />

              <div className="form-border"></div>
              <label for="meal-type" style={{ paddingTop: "22px" }}>
                &nbsp;Meal Type
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
                  for="veg"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.4em",
                  }}
                >
                  Veg
                  <input
                    id="veg"
                    className="form-content"
                    type="radio"
                    name="MealType"
                    value={"Veg"}
                    placeholder="Veg"
                    required
                    onChange={(e) =>
                      setDishDetails({
                        ...dishDetails,
                        isVeg: true,
                      })
                    }
                  />
                </label>
                <label
                  for="Nonveg"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.4em",
                  }}
                >
                  Nonveg
                  <input
                    id="nonVeg"
                    className="form-content"
                    type="radio"
                    name="MealType"
                    value={"Non-veg"}
                    required
                    onChange={(e) =>
                      setDishDetails({
                        ...dishDetails,
                        isVeg: false,
                      })
                    }
                  />
                </label>
              </div>
              <p style={{margin:"auto",color:"var(--error)"}}>{error}</p>
                
              <div className="dish_btns">
                {/* <input
                  //   onClick={signUp}
                  className="btns"
                  id="edit-btn"
                  type="button"
                  // name="submit"
                  value="Edit"
                /> */}
                <input
                  className="btns"
                  id="btn-submit"
                  type="button"
                  name="submit"
                  value="Save"
                  onClick={() => {
                    fetch("/api/hotel/me/newdish", {
                      method: "POST",
                      body: JSON.stringify(dishDetails),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if(data.error){
                          setError(data.error);
                          return;
                        }
                        resetDishes();
                        setDishDetails({
                          name: " ",
                          numberofRatings: " ",
                          price: " ",
                          isVeg: null,
                          type: " ",
                        });
                        setShow(false);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    //InsertDish
                  }}
                />
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

export default InsertDish;
