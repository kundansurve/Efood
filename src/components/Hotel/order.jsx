import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

// import LoginPage from "../login";
// import "../CSS files/footer.css";

function Order(props) {
  
  const [status,setStatus] = React.useState(props.status);
  const [order,setOrder] = React.useState(props.order);
  const [dishes,setDishes] = React.useState( props.dishes);

  const onAccept = () => {
    fetch(`/api/hotel/me/acceptorder/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((data)=>{
      setOrder({...order,hotelAccepted:true});
    }).catch((error)=>{
      console.log(error);
    })
  }

  const onReject = () => {
    fetch(`/api/hotel/me/rejectorder/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
        }).then(()=>{
      setOrder({...order,hotelAccepted:false});
    }).catch((error)=>{

    })
  }
  return (
    <div
      style={{
        width: "90%",
        padding: "1.5em",
        border: "2px solid #efefef",
        borderRadius: "5px",
        margin: "1em",
      }}
    >
      <p style={{ width: "100%", textAlign: "right" }}>Date: 13/02/2022</p>
      <h5>Order Summary:</h5>
      
      <h6>Order:</h6>
      <span
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          width: "100%",
        }}
      >
        <p style={{ fontWeight: "bold" }}>Food</p>
        <p style={{ fontWeight: "bold", textAlign: "right" }}>Quantity</p>

        {dishes.map((dish) => {
          if (!order.order[dish._id]) return <></>;

          return (
            <>
              <p>{dish.name}</p>
              <p style={{ textAlign: "right" }}>
                {order.order[dish._id]}
              </p>
            </>
          );
        })}
      </span>
      <div
        style={{
          display: "flex",
          padding: "0.5em 0.5em 0",
          justifyContent: "center",
        }}
      >
        {(order.hotelAccepted==null || order.hotelAccepted==undefined)?
        <>
        <p
          type="button"
          style={{
            textAlign: "center",
            width: "5em",
            padding: "0.5em 1em",
            margin: "0 1.5em 0.5em",
            border: "1px solid green",
            borderRadius: "8px",
            color: "green",
          }}
          onClick = {onAccept}
        >
          Accept
        </p>
        <p
          type="button"
          style={{
            width: "5em",
            textAlign: "center",
            padding: "0.5em 1em",
            margin: "0 1.5em 0.5em",
            border: "1px solid red",
            borderRadius: "8px",
            color: "red",
          }}
          onClick = {onReject}
        >
          Decline
        </p></>:null}
      </div>
    </div>
  );
}

export default Order;
