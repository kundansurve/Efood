import { PromiseProvider } from "mongoose";
import React from "react";
import './CSS files/hotelCard.css';
import { Link } from 'react-router-dom';



export default function HotelCard(props){
  const [rating,setRating]=React.useState(null);
    React.useEffect(()=>{
        fetch(`http://localhost:4000/api/ratings-of/hotel/${props.id}`)
        .then(resp=>resp.json())
        .then((data)=>{
            setRating(data.rating);
        })
    },[]);
    return (
      <Link to={"/hotel/"+props.id}>  
        <div type="button" style={{ background:(props.img)?`url(${props.img})`:`url(https://img.etimg.com/thumb/msid-88860361,width-300,imgsize-75800,,resizemode-4,quality-100/restaurant.jpg)`,backgroundSize:"cover",backgroundRepeat:"no-repeat",width: '18rem',minHeight:"300px",boxShadow:"6px 12px 12px 6px rgba(0, 0, 255, .2)",borderRadius:"5px",margin:"1em" }}>
        <div style={{color:"wheat",padding:"1em",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)"}}>
        
          <h5>{props.name}</h5>
          <p>Rating: <span style={{color:"rgb(255,213,5)"}}> {[...Array(5)].map((e, i) =>{if(i<rating)return<>&#9733;</>; return<>&#9734;</>; }) }</span></p>
        </div>
      </div>
      </Link>
    );
}
