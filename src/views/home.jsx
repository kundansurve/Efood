import React, { Component } from 'react';
import { Carousel,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return  <Container
        className='carousel'
        >
        </Container>;
    }
}
export default Home;