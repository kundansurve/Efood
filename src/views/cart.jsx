import React, {Component} from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';
import './CSS files/cart.css';
import Dish from './../components/dishCard';

class Cart extends React.Component{
    render(){
        return (<Container>
            <div style={{display:"flex",flexWrap:"wrap",width:"100%",justifyContent:"center"}}>
            <div style={{width:"50%"}}>
                <h3>Order Summary</h3>
                <Dish/>
                <Dish/>
                <Dish/>
            </div>
            <div>
            <div>
                <h5>Delivery Adress</h5>
            </div>
            <div>
                <h5>Delivery Adress</h5>
            </div>
            <div>
                <h5>Delivery Adress</h5>
            </div>
            </div>
            
            </div>
        </Container>);
    }
}
export default Cart;