import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';
import Order from '../../components/Delivery Exexcutive/order';


class Orders extends Component{
    componentDidMount(){

    }
    render(){
        return (
            <div style={{width:"100%",maxWidth:"1000px",margin:"auto",padding:"1em"}}>
                <h3>Orders in Your City</h3>
                <Order/>
                <Order/>
                <Order/>
                <Order/>
            </div>
        )
    }
}
export default Orders;