import React, { Component } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg'; 
import Review from '../components/reviewCard';

class ReviewSection extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return (<section id="testimonials">
            <div class="testimonial-box-container">
                <Review invert="invert(0%)" />
                <Review invert="invert(100%)"/>
            </div>
        </section>);
    }
}
export default ReviewSection; 