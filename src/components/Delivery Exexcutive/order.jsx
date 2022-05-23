import { useEffect, useState } from "react";

export default function Order(props){
    const order=props.order;
    const [hotel,setHotel]=useState();
    const resetOrders = props.resetOrders;
    useEffect(()=>{
        fetch(`http://localhost:4000/api/hotel/${order.placedInHotelId}`)
        .then(resp=>resp.json())
        .then(hotelData=>{
            setHotel(hotelData.hotel);
        }).catch(error=>console.log(error))
    },[])

    const onClickAccept=()=>{
        
        fetch(`http://localhost:4000/api/delivery-executive/me/accept/order/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(resp=>resp.json())
      .then(data=>{
          alert(JSON.stringify(data));
          resetOrders();
      }).catch(error=>console.log(error));
    }
    return (<div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
    <h5>Delivery Details:</h5>
    <span style={{display:"flex",marginLeft:"2em",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
        <span style={{display:"flex",marginRight:"3em",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
        <h6 >Order Pickup Point:</h6>
        <p >{(hotel)?hotel.name:null}</p>
    </span>
    <span style={{display:"flex",marginRight:"3em",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
        <h6 >Order Drop Point:</h6>
        <p>__</p>
    </span>
    <span style={{display:"flex",marginRight:"3em",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
        <h6 >Total Distance:</h6>
        <p>__</p>
    </span>
    <span style={{display:"flex",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
    <h6 >Rewards:</h6>
    <p>__</p>
    </span>
    </span>
    
    <div style={{display:"flex",justifyContent:"flex-end"}} >
        <button style={{padding:"0.5rem",margin:"0.5rem",borderRadius:"5px",color:"white",backgroundColor:"var(--color1)",border:"none"}} onClick={onClickAccept}>Accept</button>
    </div>
</div>);
}