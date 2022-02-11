import React, { Component } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg'; 
import Dish from '../components/dishCard';

class DishSection extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return (<div className="dishes" style={{display:"flex",height:"fit-content",flexDirection:"column",marginLeft:"0px",alignItems:"center"}}>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hello"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hey"/>
        <Dish id="hello"/>
    </div>);
    }
}
export default DishSection; 