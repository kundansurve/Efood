import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9vZGllMjM2IiwiYSI6ImNreTgzMTFkOTE2eWgydnMxMHJ1ZzVqZ3MifQ.KHB9VYX_nKPKaN5RkSnoeQ';

class OrderTrack extends Component{
    constructor(props){
        super(props);
        this.state={
            orderDetails:{},
            dishes:[],
            hotel:{},
            deliveryExecutive:{}
        }
    }
    
    componentDidMount(){
        fetch("http://localhost:4000/api/user/me/orders/"+window.location.pathname.split('/')[2])
        .then(response=>response.json())
        .then(data=>{
            this.setState({orderDetails:data['OrderDetail']});
            console.log('OrderDetails: '+JSON.stringify(data['OrderDetail']));
            //if(data['OrderDetail']==="Food is Being Processed"){
                const map = new mapboxgl.Map({
                    container: 'map', // container ID
                    style: 'mapbox://styles/mapbox/streets-v11', // style URL
                    center: [74.7749, 20.9042], // starting position [lng, lat]
                    zoom: 12 // starting zoom
                    
                });
            //}
            fetch("http://localhost:4000/api/hotels/hotel/" + data['OrderDetail'].placedInHotelId)
                .then((response) => response.json())
                .then((data) => {
                  this.setState({hotel:data["hotel"]});
                })
                .catch((error) => console.log(error));
                fetch("http://localhost:4000/api/hotel/dishes/"+data['OrderDetail'].placedInHotelId)
                    .then(response=>response.json())
                    .then((data)=>{
                    this.setState({dishes:data["dishes"]});
                }).catch(error=>console.log(error));
            fetch("http://localhost:4000/api/deliveryBoy/"+data['OrderDetail'].assignedToDeliveryBoyId)
            .then((response) => response.json())
                .then((data) => {
                  this.setState({deliveryExecutive:data["deliveryBoy"]});
                }).catch(error=>{
                    console.log(error);
                })
        }).catch(error=>{
            console.log(error);
        })
        
        
    }
    render(){
        return (
            <div style={{width:"100%",marginBottom:"1em",display:"flex",marginTop:"4em",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
{(this.state.orderDetails.status=="Delivered")?<h4 style={{width:"90%",borderRadius:"5px",textAlign:"center",margin:".2em",padding:"0.5em",backgroundColor:"#cefad0",color:"#00c04b"}}>Delivered</h4>:null}
                {(this.state.orderDetails.status=="Canceled")?<h4 style={{width:"90%",borderRadius:"5px",textAlign:"center",margin:".2em",padding:"0.5em",backgroundColor:"#ffcccb",color:"#ff4f4b"}}>Canceled</h4>:null}
            
            {(this.state.orderDetails.status!="Delivered" && this.state.orderDetails.status!="Canceled" )?<div id='map' style={{minHeight:"60vh",width:"100%"}}></div>:null}
            <div id="delivery-info" style={{width:"100%",maxWidth:"1000px",marginTop:"2em"}}>
                <h3>Order Details</h3>
                
                {(this.state.orderDetails.status!="Delivered" && this.state.orderDetails.status!="Canceled" )?(<div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",backgroundColor:"#efefef",borderRadius:"5px",margin:"1em"}}><h5>Order Status:</h5>
                    <p style={{marginBottom:"0px"}}>{this.state.orderDetails.status}</p>
                    <span style={{alignItems:"center",display:"flex"}}>
                        <p style={{margin:"0px"}}></p>
                    </span></div>)
                    :null}
                
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Delivery Partner:</h5>
                    <p style={{marginBottom:"0.5em"}}><img style={{marginRight:"1em"}}src="https://img.icons8.com/ultraviolet/40/000000/test-account.png"/>{this.state.deliveryExecutive.name}</p>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Ratings</p>
                        <p style={{marginLeft:"0.2em",fontSize:"18px",color:"rgb(250,250,0)"}}>{[...Array(5)].map((e, i) => { if (i < this.state.deliveryExecutive.ratings) return <>&#9733;</>; return <>&#9734;</>; })}</p>
                    </span>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <p style={{marginLeft:"0.2em"}}>Mobile Number:</p>
                        <p style={{marginLeft:"0.2em"}}>{this.state.deliveryExecutive.phoneNumber}</p>
                    </span>
                </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Order Summary:</h5>
                    <span style={{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
                        <h6 style={{marginLeft:"0.2em"}}>Hotel:</h6>
                        <h6 style={{marginLeft:"0.2em"}}>{this.state.hotel.name}</h6>
                    </span>
                    <h6>Order:</h6>
                    <span style={{paddingLeft:"0.5em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto auto auto",width:"100%"}}>
                    <p style={{fontWeight:"bold"}} >Food</p>
                        <p style={{fontWeight:"bold"}}>Price</p>
                        <p style={{fontWeight:"bold"}}>Quantity</p>
                        <p style={{fontWeight:"bold"}}>Total</p>
                        {this.state.dishes.map((dish)=>{
        for(let orderid in this.state.orderDetails.order){
            if(orderid==dish._id){
                return(<><p >{dish.name}</p>
            <p >{dish.price}</p>
            <p >{this.state.orderDetails.order[orderid]}</p>
            <p>{this.state.orderDetails.order[orderid]*dish.price}</p></>);
            }
        }
        }
        )}
                        
                    </span>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Billing</h5>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}}>Subtotal</h6>
                    <p style={{textAlign:"right"}}>Rs.{this.state.orderDetails.totalPrice-75}</p>
                </div>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}} >taxes</h6>
                    <p style={{textAlign:"right"}}>Rs.50</p>
                </div>
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}} >Delivery charges:</h6>
                    <p style={{textAlign:"right"}}>Rs.{this.state.orderDetails.deliveryCharges}</p>
                </div>
                <hr />
                <div style={{padding:"0.2em",textAlign:"center",display:"grid",gridTemplateColumns:"auto auto"}}>
                    <h6 style={{textAlign:"left"}}>Grand Total</h6>
                    <p style={{textAlign:"right"}}>RS.{this.state.orderDetails.totalPrice}</p>
                </div>
                
            </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                    <h5>Ordering For</h5>
                    <p style={{marginBottom:"0px"}}>{(this.state.orderDetails.userInfo)?this.state.orderDetails.userInfo["username"]:null}</p>
                    <span style={{alignItems:"center",display:"flex"}}>
                        <p style={{margin:"0px"}}>{(this.state.orderDetails.userInfo)?this.state.orderDetails.userInfo["phoneNumber"]:null}</p>
                    </span>
                </div>
                <div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Delivery Address</h5>
                <p>{(this.state.orderDetails.deliveryLocation)?this.state.orderDetails.deliveryLocation.address:null}</p>
            </div>
            </div>
            </div>
        );
    }
}
 
export default OrderTrack;