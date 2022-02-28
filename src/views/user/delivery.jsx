import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';

class OrderTrack extends Component{
    componentDidMount(){
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [74.7749, 20.9042], // starting position [lng, lat]
            zoom: 9 // starting zoom
            
        });
        console.log(map);
    }
    render(){
        return (
            <div style={{width:"100%",marginBottom:"2em",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div id='map' style={{minHeight:"60vh",width:"100%"}}></div>
            <div id="delivery-info" style={{width:"100%",maxWidth:"1000px",marginTop:"3em"}}>
                <h3>Order Details</h3>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",backgroundColor:"#efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Order Status:</h5>
                    <p style={{marginBottom:"0px"}}>Food is Being Prepared</p>
                    <span style={{alignItems:"center",display:"flex"}}>
                        <p style={{margin:"0px"}}></p>
                    </span>
                </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Delivery Partner:</h5>
                    <p style={{marginBottom:"0.5em"}}><img style={{marginRight:"1em"}}src="https://img.icons8.com/ultraviolet/40/000000/test-account.png"/>Kundan Surve</p>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Ratings</p>
                        <p style={{marginLeft:"0.2em",fontSize:"18px",color:"rgb(250,250,0)"}}> &#9733; &#9733; &#9733; &#9733; &#9734;</p>
                    </span>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Mobile Number:</p>
                        <p style={{marginLeft:"0.2em"}}>8623046619</p>
                    </span>
                </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Order Summary:</h5>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <h6 style={{marginLeft:"0.2em"}}>Hotel:</h6>
                        <h6 style={{marginLeft:"0.2em"}}>Rasraj Hotel</h6>
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
                <div style={{display:"flex",flexDirection:"column",width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
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
                    <p style={{textAlign:"right"}}>RS.525</p>
                </div>
                
            </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Ordering For</h5>
                    <p style={{marginBottom:"0px"}}>Kundan Surve</p>
                    <span style={{alignItems:"center",display:"flex"}}>
                        <p style={{margin:"0px"}}>8623046619</p>
                    </span>
                </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Delivery Address</h5>
                <p>Dhule,</p>
                <span style={{alignItems:"center",display:"flex"}}>
                    <p style={{margin:"0px"}}>8623046619</p>
                </span>
            </div>
            </div>
            </div>
        );
    }
}
 
export default OrderTrack;