import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/homeImage.jpg';

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
            
                <img src={homeImage} alt="home-image" style={{maxHeight:"100vh",zIndex:"-1",width:"100vw",height:"80vw"}}/>
                <div style={{zIndex:"0",position:"absolute",left:"0px",top:"0px",width:"100vw",maxHeight:"100vh",height:"80vw",backgroundColor:"rgba(0,0,0,0.7)"}}>
                <Container style={{display:"flex",flexDirection:"column",minWidth:"350px",justifyContent:"center",alignItems:"center",width:"60vw",height:"100%",float:"left",margin:"auto"}} >
                    <span style={{color:"white",fontSize:"10vw",textAlign:"left"}}>
                       Foodie
                    </span>
                    <span style={{fontSize:"15px",color:"#bfbfbf",textAlign:"center"}}>At home we serve the kind of food we know the story behind</span>
                    
                    <div style={{width:"100%",display:"flex",justifyContent:"center",margin:"1em"}} class="form-group mb-4">
            <input style={{width:"60%"}} id="exampleFormControlInput1" type="email" placeholder="What're you searching for?" class="form-control form-control-underlined"/>
          </div>
                    <div style={{display:"flex",alignItems:"space-evenly",marginTop:"0em",justifyContent:"space-evenly",width:""}}>
                        <Button style={{color:"#bfbfbf",marginRight:"1em"}}>Sign up</Button>
                        <Button style={{color:"#bfbfbf"}}>Login</Button>
                        
                    </div>
                </Container>
                </div>
                <Container>
                    Cards
                </Container>
        </div>;
    }
}
export default Home;