import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';
import Order from '../../components/Delivery Exexcutive/prevOrder';
import Loading from './../../components/loading';

function Orders(props){
    const [orders,setOrders]=React.useState(null);
    React.useEffect(()=>{
        fetch(`${window.location.origin}/api/delivery-executive/me/pastorders`)
        .then(resp=>resp.json())
        .then(data=>{
            setOrders(data.orders);
        }).catch(error=>console.log(error));
    },[])
        return (
            <div style={{width:"100%",maxWidth:"1000px",margin:"auto",marginTop:"3em",minHeight:"400px",padding:"1em"}}>
                <h3>Previous Orders</h3>
                {(orders)?orders.map((order,index)=>{
                    return <Order order={order}/>
                }):<Loading/>}
                {(orders && orders.length===0)?<div style={{width:"100%",height:"100%",maxHeight:"200px",justifyContent:"center",alignItems:"center"}}><h6>you haven't assigned or completed any Order</h6></div>:null}
            </div>
        )
}
export default Orders;