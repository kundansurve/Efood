import React from "react";
import { Link } from 'react-router-dom';

function TopDish(props){
    const [rating,setRating]=React.useState(null);
    React.useEffect(()=>{
        fetch(`http://localhost:4000/api/ratings-of/dish/${props._id}`)
        .then(resp=>resp.json())
        .then((data)=>{
            setRating(data.rating);
        })
    },[]);
    return(<><Link to={`/hotel/${props.hotelId}`}>                         <div style={{color:"black",margin:"0.5em",padding:"1em",display:"flex",width:"210px",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    <div style={{height:"150px",width:"170px",borderRadius:"10px",backgroundImage:`url(${props.img})`,backgroundRepeat: "no-repeat",backgroundSize: "170px 150px"}} ></div>
    <h6 style={{textAlign:"center",marginBottom:"0px"}}>{props.name}</h6>
    <span style={{color:"rgb(255,213,5)"}}> {[...Array(5)].map((e, i) =>{if(i<rating)return<>&#9733;</>; return<>&#9734;</>; }) }</span>
  </div>
  </Link></>);
}
export default TopDish;