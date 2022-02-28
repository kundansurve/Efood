import React, { Component } from 'react';

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
                <div style={{display:"flex",flexDirection:"column",margin:"0px",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)"}} >
                    <span style={{color:"white",fontSize:"5em",textAlign:"left"}}>
                       Foodie
                    </span>
                    <span style={{fontSize:"1.5em",color:"#bfbfbf",textAlign:"center"}}>At home we serve the kind of food we know the story behind</span>
                    <form  style={{borderRadius:"5px",width:"40%",marginTop:"1em",minWidth:"300px",display:"flex",justifyContent:"center"}}>
                       <select style={{width:"30%",padding:"0.5em",borderRadius:"5px 0 0 5px"}}>
                          <option>Location</option>
                          <option>Location</option>
                          <option>Location</option>
                       </select>
                       <input type="email" style={{border:"none",borderRadius:"0 5px 5px 0",padding:"0.5em",width:"60%"}} placeholder="Enter any Restaurants, dish or cuisine" />
                     </form>
                </div>
                </div>
                <div style={{display:"flex",maxWidth:"1200px",justifyContent:"center",margin:"auto",padding:"0px",width:"100%",flexDirection:"column"}}>
                <span className='title'>Hotels Near You</span>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"3em",width:"100%"}}>
                    
                    <ul style={{flexWrap:"wrap",display:"flex"}}>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    </ul>
                    </div>
                    <span className='title'>Hotels Near You</span>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"0px",marginTop:"3em",width:"100%"}}>
                    
                    <ul  style={{flexWrap:"wrap",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    </ul>
                    </div>
                    <span className='title'>Hotels Near You</span>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"0px",marginTop:"3em",width:"100%"}}>
                    
                    <ul style={{flexWrap:"wrap",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    <HotelCard/>
                    </ul>
                    </div>
                    
                </div>
        </div>;
    }
}
export default Home;