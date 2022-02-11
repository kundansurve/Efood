import React, { Component } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from '../components/inputBar';
import homeImage from '../assets/img/HomeImg.jpg';
import Dish from '../components/dishCard'; 
import Review from '../components/reviewCard';
import './CSS files/hotel.css';
import DishSection from '../section/dishSection';
import ReviewSection from '../section/reviews';

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
            <div style={{width:"100%",height:"50vh",display:"flex",justifyContent:"center",alignItems:"center",background:"rgba(0,0,0,0.6)"}}>
                
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"white",margin:"3em"}}>
                  <h1>Hotel Name</h1>
                  <span style={{fontWeight:"1px",fontSize:"20px"}}>Ratings</span>
                  <h6>Location</h6>
                </div>
              </div>
              <div>
            <div style={{display:"flex",backgroundColor:"white",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <div style={{maxWidth:"1000px",width:"100%",padding:"2em"}}>
                <div style={{display:"flex",justifyContent:"center", alignContent:"center",width:"100%",margin:"1em",padding:"1em"}}>
                  <button id="dish-section" style={{backgroundColor:"transparent",borderRadius:"2px",padding:"1em",paddingBottom:"0em",border:(this.state.key==='Dishes')?"2px solid #efefef":"none",borderBottom:(this.state.key==='Dishes')?"none":"2px solid #efefef"}} onClick={()=>{this.setState({key:"Dishes"});}}>Dishes</button>
                  <button id="review-section" style={{backgroundColor:"transparent",borderRadius:"2px",padding:"1em",paddingBottom:"0em",border:(this.state.key==='Reviews')?"2px solid #efefef":"none",borderBottom:(this.state.key==='Reviews')?"none":"2px solid #efefef"}} onClick={()=>{this.setState({key:"Reviews"})}}>Reviews</button>
                  <div style={{padding:"1em",paddingBottom:"0em",width:"100%",hieght:"100%",borderBottom:"2px solid #efefef"}}></div>
                </div>
        <div style={{display:(this.state.key==='Dishes')?"":"none",width:"95%" }} >
        <DishSection/>
        </div>

        <div style={{display:(this.state.key==='Reviews')?"":"none",width:"95%"}}>
          <ReviewSection/>
        </div>
        </div>
        </div>
        </div>
        </div>
        );
    }
}
export default Hotel;