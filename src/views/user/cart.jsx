import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../CSS files/cart.css';
import Dish from '../../components/user/dishCard';

class Cart extends React.Component{
    render(){
        return (<div style={{paddingBottom:"4em"}}>
            <h2 style={{margin:"1em"}}>Checkout</h2>
            <div style={{display:"flex",flexWrap:"wrap",width:"100%",justifyContent:"center"}}>
                
            <div style={{width:"50%", minWidth:"360px",alignItems:"center",padding:"1em",margin:"1em"}}>
                <div style={{padding:"1em", margin:"1em",backgroundColor:"#efefef",borderRadius:"5px",width:"90%"}}>
                    <h5>Order From</h5>
                    <p style={{padding:"2px",marginBottom:"0px"}}>Hotel Name</p>
                    <span style={{alignItems:"center",display:"flex"}}><img src="https://img.icons8.com/office/16/000000/marker.png"/><p style={{margin:"0px"}}>location</p></span>
                </div>
                <div style={{width:"90%"}}>
                <h5 style={{width:"100%",padding:"0.5em",marginTop:"0.5em"}}>Order Summary</h5>
                </div>
                <div style={{width:"100%",display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",height:"500px",overflowY:"scroll",paddingTop:"1em",paddingBottom:"1em"}}>
                <Dish/>
                <Dish/>
                <Dish/>
                <Dish/>
                </div>
                <div style={{marginTop:"2em",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",width:"100%"}}>
                <img style={{float:"right"}} src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"/>
                    <h5>Select Payment Method </h5>
                    <p>Credit Card</p>
                    
                </div>
            </div>
            <div style={{width:"35%",padding:"1em",minWidth:"360px"}}>
            <div style={{width:"90%",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Kundan Surve</h5>
                <p>You are securely logged in</p>
            </div>
            <div style={{width:"90%",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Offers</h5>
                <span style={{alignItems:"center",flexWrap:"wrap",display:"flex"}}>
                    <img  style= {{width:"30px"}} src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-offer-business-and-finance-icongeek26-outline-gradient-icongeek26.png"/>
                    <input type="text" style={{border:"none",borderBottom:"1px solid black",paddingLeft:"1em",paddingRight:"1em"}} placeholder="First Delivery" />
                    <button style={{margin:"auto auto",background:"transparent",border:"none", textDecoration:"underline", textAlign:"center"}}>View Offers</button>
                </span>
            </div>
            <div style={{width:"90%",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Delivery Address</h5>
                <p>Dhule,</p>
                <button style={{margin:"auto auto",background:"transparent",border:"none", textDecoration:"underline", textAlign:"center"}}>Change Address</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"90%",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Billing</h5>
                <div style={{padding:"0.2em"}}>
                    <h6 style={{float:"left",textAlign:"left"}}>Subtotal</h6>
                    <p style={{float:"right",textAlign:"right"}}>Rs.450</p>
                </div>
                <div style={{padding:"0.2em"}}>
                    <h6 style={{float:"left",textAlign:"left"}}>taxes</h6>
                    <p style={{float:"right",textAlign:"right"}}>Rs.50</p>
                </div>
                <div style={{padding:"0.2em"}}>
                    <h6 style={{float:"left",textAlign:"left"}}>Delivery charges:</h6>
                    <p style={{float:"right",textAlign:"right"}}>Rs.25</p>
                </div>
                <hr />
                <div style={{padding:"0.2em"}}>
                    <h6 style={{float:"left",textAlign:"left"}}>Grand Total</h6>
                    <p style={{float:"right",textAlign:"right"}}>RS.525</p>
                </div>
                
            </div>
            <div style={{width:"90%",padding:"1em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
                <h5>Ordering For</h5>
                <p style={{marginBottom:"0px"}}>Kundan Surve</p>
                <span style={{alignItems:"center",display:"flex"}}><p style={{margin:"0px"}}>8623046619</p>
                </span>
            </div>
            <button style={{textAlign:"center",border:"none",background:"var(--color1)",color:"white",width:"100%",paddingTop:"1em",paddingBottom:"1em",borderRadius:"5px"}}>Place Order</button>
            </div >
            
            </div>
        </div>);
    }
}
export default Cart;