import { PromiseProvider } from "mongoose";
import React from "react";
import './CSS files/hotelCard.css';
import { Link } from 'react-router-dom';



export default function HotelCard(props){
    return (
      <Link to={"/hotel/"+props.id}>  
        <div type="button" style={{ background:`url(https://static.toiimg.com/photo/52416693.cms)`,backgroundSize:"cover",backgroundRepeat:"no-repeat",width: '18rem',minHeight:"300px",boxShadow:"6px 12px 12px 6px rgba(0, 0, 255, .2)",borderRadius:"5px",margin:"1em" }}>
        <div style={{color:"wheat",padding:"1em",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)"}}>
        
          <h5>{props.name}</h5>
          <p>Rating: <span style={{color:"rgb(255,213,5)"}}> {[...Array(5)].map((e, i) =>{if(i<props.ratings)return<>&#9733;</>; return<>&#9734;</>; }) }</span></p>
        </div>
      </div>
      </Link>
    );
}
