import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';
import Order from '../../components/Delivery Exexcutive/order';


function Orders(props){
    const [orders,setOrders]=React.useState([]);
    React.useEffect(()=>{
        fetch("http://localhost:4000/api/delivery-executive/me/pastorders")
        .then(resp=>resp.json())
        .then(data=>{
            setOrders(data.orders);
        }).catch(error=>console.log(error));
    },[])
        return (
            <div style={{width:"100%",maxWidth:"1000px",margin:"auto",marginTop:"2em",minHeight:"400px",padding:"1em"}}>
                <h3>Previous Orders</h3>
                {orders.map((order,index)=>{
                    return <Order order={order}/>
                })}
            </div>
        )
}
export default Orders;