import React, { Component } from 'react';
import {Container,Button,Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg';
import InputBar from '../components/inputBar';
import HotelCard from '../components/hotelCard';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        console.log("Hello")
    }
    render(){
        return  <div  >
                <div style={{zIndex:"0",backgroundImage:`url(${homeImage})`,backgroundSize:"cover",left:"0px",top:"0px",width:"100%",height:"90vh"}}>
                <div style={{display:"flex",flexDirection:"column",margin:"0px",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",float:"left",margin:"auto",backgroundColor:"rgba(0,0,0,0.7)"}} >
                    <span style={{color:"white",fontSize:"5em",textAlign:"left"}}>
                       Foodie
                    </span>
                    <span style={{fontSize:"1.5em",color:"#bfbfbf",textAlign:"center"}}>At home we serve the kind of food we know the story behind</span>
                    <Form.Group className="mb-3" style={{backgroundColor:"white",borderRadius:"5px",width:"40%",marginTop:"1em",minWidth:"300px",display:"flex",justifyContent:"center"}}>
                       <Form.Select style={{width:"30%",borderRadius:"1 1 0 0"}}>
                          <option>Location</option>
                       </Form.Select>
                       <Form.Control type="email" placeholder="Enter any Restaurants, dish or cuisine" />
                     </Form.Group>
                </div>
                </div>
                <Container style={{display:"flex",justifyContent:"center",margin:"auto",padding:"0px",width:"100%",alignItems:"center",flexDirection:"column"}}>
                    <Container style={{marginTop:"3em",width:"100%"}}>
                    <span className='title'>Hotels Near You</span>
                    <ul className="card-wrapper"  style={{marginTop:"2em"}}>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    </ul>
                    </Container>
                    <Container style={{margin:"0px",marginTop:"3em",width:"100%"}}>
                    <span className='title'>Hotels Near You</span>
                    <ul className="card-wrapper">
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    </ul>
                    </Container>
                    
                </Container>
        </div>;
    }
}
export default Home;