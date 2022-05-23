import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';

class Order extends Component{
    constructor(props){
        super(props)
        this.state={
            orderDetails:{},
            orderId:(window.location.pathname.split("/")[window.location.pathname.split("/").length-1])
        }
    }
    componentDidMount(){
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [74.7749, 20.9042], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        fetch(`http://localhost:4000/api/delivery-executive/me/order/${this.state.orderId}`)
        .then(resp=>resp.json())
        .then(data=>{
            this.setState({orderDetails:data.order})
        }).catch(error=>console.log(error));

    }
    render(){
        return (
            <div style={{width:"100%",marginBottom:"2em",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div id='map' style={{minHeight:"60vh",width:"100%"}}></div>
            <div id="delivery-info" style={{padding:"1em",width:"100%",maxWidth:"1000px",marginTop:"3em"}}>
                <h3>Order Details</h3>
                <div style={{width:"90%", padding:"1em",border:"2px solid #efefef",backgroundColor:"#efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Order Status:</h5>
                    <p style={{marginBottom:"0px"}}>{this.state.orderDetails.status}</p>
                    <span style={{alignItems:"center",display:"flex"}}>
                        <p style={{margin:"0px"}}></p>
                    </span>
                    <button style={{backgroundColor:"var(--color1)",color:"white",padding:"0.3em",borderRadius:"5px", border:"none",margin:"1em"}}> Recieved Order from Hotel</button>
                    <button style={{backgroundColor:"var(--color1)",color:"white",padding:"0.3em",borderRadius:"5px", border:"none",margin:"1em"}}> Delivered</button>
                </div>
                
                <div style={{width:"90%", padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Delivery To:</h5>
                    <p style={{marginBottom:"0.5em"}}><img style={{marginRight:"1em"}}src="https://img.icons8.com/ultraviolet/40/000000/test-account.png"/>Kundan Surve</p>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Mobile Number:</p>
                        <p style={{marginLeft:"0.2em"}}>8623046619</p>
                    </span>
                </div>
                <div style={{width:"90%", padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Delivery Address</h5>
                <p>Dhule,</p>
                <span style={{alignItems:"center",display:"flex"}}>
                    <p style={{margin:"0px"}}>8623046619</p>
                </span>
            </div>
                <div style={{width:"90%", padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <p style={{float:"right",textAlign:"right",color:"green"}}>Order Id: 72025926G</p>
                    <h5>Order Summary:</h5>
                    <span style={{display:"grid",gridTemplateColumns:"auto auto",maxWidth:"350px"}}>
                        <h6 >Hotel:</h6>
                        <h6 style={{fontWeight:"lighter"}}>Rasraj Hotel</h6>
                    </span>
                    <h6>Order:</h6>
                    <span style={{paddingLeft:"0.5em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto auto auto",width:"100%"}}>
                    <p style={{fontWeight:"bold"}} >Food</p>
                        <p style={{fontWeight:"bold"}}>Price</p>
                        <p style={{fontWeight:"bold"}}>Quantity</p>
                        <p style={{fontWeight:"bold"}}>Total</p>
                        <p >Shahi Paneer</p>
                        <p >200</p>
                        <p >1</p>
                        <p>200</p>
                    </span>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"90%", padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h6 style={{float:"right",textAlign:"right",color:"green"}}>Paid</h6>
                <h6 style={{float:"right",textAlign:"right",color:"#ff6666"}}>Cah on Delivery</h6>
                <h5>Billing</h5>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}}>Subtotal</h6>
                    <p style={{textAlign:"right"}}>Rs.450</p>
                </div>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}} >taxes</h6>
                    <p style={{textAlign:"right"}}>Rs.50</p>
                </div>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}} >Delivery charges:</h6>
                    <p style={{textAlign:"right"}}>Rs.25</p>
                </div>
                <hr />
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}}>Grand Total</h6>
                    <p style={{textAlign:"right"}}>RS.525 <br/><span style={{color:"#ff6666"}}>(Cash To Be Collected)</span></p>
                </div>
            </div>
                
            </div>
            </div>
        );
    }
}
 
export default Order;