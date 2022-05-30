import React,{ useEffect, useState } from 'react';
import Order from '../../components/Delivery Exexcutive/order';
import { UserData } from "../../context";
import { Navigate } from "react-router-dom"; 

export default function DeliveryAdmin(props){
    const [orders,setOrders]=useState([]);
    const [deliveryExecutiveUser,setDeliveryExecutiveUser]=React.useContext(UserData);
    useEffect(()=>{
        fetch("http://localhost:4000/api/delivery-executive/me/ordersincity")
        .then(resp=>resp.json())
        .then(data=>{
            alert(data.orders)
            setOrders(data.orders);
            
        }).catch(error=>console.log(error));
    },[])
    const resetOrders=()=>{
        fetch("http://localhost:4000/api/delivery-executive/me/ordersincity")
        .then(resp=>resp.json())
        .then(data=>{
            setOrders(data.orders);
        }).catch(error=>console.log(error));
    }
    return(<>{(deliveryExecutiveUser.isFree)? <div style={{width:"100%",maxWidth:"1000px",margin:"auto",marginTop:"2em",padding:"1em",minHeight:"500px"}}>
    <h3>Orders in Your City</h3>
    {orders.map((order,index)=>{
        return <Order order={order} resetOrders={resetOrders}/>;
    })}
    </div>:<Navigate to={`/delivery-executive/orders/order/${deliveryExecutiveUser.currentOrder}`} />}</>);
}