import React,{Component} from 'react';

import LoginPage from '../login';
import '../CSS files/footer.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { set } from 'mongoose';

export default function Order(props){
    const [orderDetail,setOrderDetail]=React.useState(props.orderDetail);
    const [hotelData,setHotelData]=React.useState(null);
    const [dishesData,setDishesData]=React.useState([]);
    const [reviewed,setReviewed]=React.useState(true);
    useEffect(()=>{
        if(orderDetail && orderDetail.placedInHotelId){
            
            fetch("http://localhost:4000/api/hotels/hotel/" + orderDetail.placedInHotelId)
                .then((response) => response.json())
                .then((data) => {
                  setHotelData(data["hotel"]);
                })
                .catch((error) => console.log(error));
                fetch("http://localhost:4000/api/hotel/dishes/"+orderDetail.placedInHotelId)
                    .then(response=>response.json())
                    .then((data)=>{
                    setDishesData(data["dishes"]);
                }).catch(error=>console.log(error));
                fetch(`http://localhost:4000/api/isReviewedOrder/${orderDetail._id}`)
            .then(resp=>resp.json())
            .then(data=>{
                
                if(data.reviewed)setReviewed(true);
                else setReviewed(false);
            }).catch(error=>{
                console.log(error);
            })     
        }
    },[])

    return <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
    <div style={{width:"100%",margin:"0.2em",padding:"0em",justifyContent:"space-between",display:"flex",alignItems:"center"}}>
    <h6>Summary:</h6>
    <span style={{width:"100%",textAlign:"right"}}>Date: {orderDetail.placedAt.substring(0,10)}</span>
    
    </div>
    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
        <h6>Order from hotel:</h6>
        <h6 >{(hotelData)?hotelData.name:null}</h6>
    </span>
    <h6>Order:</h6>
    <span style={{display:"grid",gridTemplateColumns:"auto auto",width:"100%"}}>
    <p style={{fontWeight:"bold"}} >Food</p>
        <p style={{fontWeight:"bold",textAlign:"right"}}>Quantity</p>
        {dishesData.map((dish)=>{
        for(let orderid in orderDetail.order){
            if(orderid==dish._id)return(<><p>{dish.name}</p><p style={{textAlign:"right"}}>{orderDetail.order[orderid]}</p></>);
        }
        }
        )}
    </span>
    <div style={{width:"100%",margin:"0.2em",padding:"0em",justifyContent:"space-between",display:"flex",alignItems:"center"}}>
    <Link to={`/orders/${orderDetail._id}`}>
    <span type="button" style={{marginBottom:"0.5em",color:"blue",textAlign:"center"}}>View More</span>
    </Link>
    {(!reviewed)?<Link to={`/review/${orderDetail._id}`}>
    <span type="button" style={{marginBottom:"0.5em",color:"blue",textAlign:"center"}}>Please rate and review this order</span>
    </Link>:null}
    <span style={{marginBottom:"0.5em",color:(orderDetail.status=="Delivered")?"green":"red",float:"right"}}>{orderDetail.status}</span>
        </div>
    </div>;
}