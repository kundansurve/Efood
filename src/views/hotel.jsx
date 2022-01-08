import React, { Component } from 'react';
import {Container,Button,Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg';
import InputBar from '../components/inputBar';
import Dish from '../components/dishCard'; 

class Hotel extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return <><Dish/> </>;
    }
}
export default Hotel;