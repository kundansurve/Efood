import React, {Component} from 'react';
import { render } from '@testing-library/react';
import '../JS files/delivery';
import mapboxgl from 'mapbox-gl';
import Order from '../../components/user/order';

class Orders extends Component{
    constructor(props){
        super(props);
        this.state={
            orders:null
        }
    }
    componentDidMount(){
        fetch("http://localhost:4000/api/user/me/orders")
            .then((response) => response.json())
            .then((data) => {
                this.setState({orders:data.orders});
            })
            .catch(error=>{
                alert(error);
            })
    }
    render(){
        return (
            <div style={{width:"100%",maxWidth:"1000px",margin:"auto",marginTop:"3em",padding:"1em"}}>
            <h3>All Orders</h3>
            {this.state.orders &&
                this.state.orders.map((orderDetail)=>{
                    return <Order orderDetail={orderDetail} />;
                })
            }
            </div>
        )
    }
}
export default Orders;