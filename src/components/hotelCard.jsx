import React from "react";
import './CSS files/hotelCard.css';



export default function HotelCard(props){
    return (   
        <div style={{ background:`url(https://static.toiimg.com/photo/52416693.cms)`,backgroundSize:"cover",backgroundRepeat:"no-repeat",width: '18rem',minHeight:"300px",boxShadow:"6px 12px 12px 6px rgba(0, 0, 255, .2)",borderRadius:"5px",margin:"1em" }}>
        <div style={{color:"wheat",padding:"1em",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)"}}>
        
          <h5>Card Title</h5>
          <p>
          </p>
        </div>
      </div>
    );
}
