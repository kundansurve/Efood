import React, { Component } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from '../components/inputBar';
import homeImage from '../assets/img/HomeImg.jpg';
import Dish from '../components/dishCard'; 
import Review from '../components/reviewCard';
import './CSS files/hotel.css'

class Hotel extends Component{
    constructor(props){
        super(props);
        this.state={key:'Dishes'};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return ( 
          <div >
            <div  style={{backgroundImage:`url(${homeImage})`,position:"absolute",top:"0px",left:"0px",width:"100%",height:"70vh",zIndex:"-1"}}></div>
            <div style={{width:"100%",height:"50vh",display:"flex",justifyContent:"flex-start",alignItems:"center",background:"rgba(0,0,0,0.6)"}}>
                
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",color:"white",margin:"3em"}}>
                  <h2>Hotel Name</h2>
                  <span style={{fontWeight:"1px",fontSize:"20px"}}>Ratings</span>
                  <p>Location</p>
                </div>
              </div>
            <div style={{display:"flex",backgroundColor:"white",justifyContent:"center",alignItems:"center",width:"100%"}}>
              
            <div style={{width:"100%",maxWidth:"1000px",marginTop:"2em"}}>
            <Tabs
      id="controlled-tab-example"
      activeKey={this.state.key}
      onSelect={(k) => this.setState({key:k})}
      className="mb-3"
      
    >
        <Tab eventKey="Dishes" title="Dishes" >
        <div >
            <div style={{display:"flex",width:'100%',padding:"1em"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="text" placeholder="Search for a dish" />
  </Form.Group>
  <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Filter
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#hello">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  </div>
        <Container className="dishes" style={{display:"flex",height:"fit-content",flexDirection:"column",marginLeft:"0px"}}>
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
        </Container>
        </div>
        </Tab>
        <Tab eventKey="Reviews" title="Reviews">
        <section id="testimonials">
        
        <div class="testimonial-box-container">
        <Review invert="invert(0%)" />
        <Review invert="invert(100%)"/>
        </div>
        </section>
        </Tab>
        
        </Tabs>
        </div>
        </div>
        </div>
        );
    }
}
export default Hotel;