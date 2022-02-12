import React,{Component} from 'react';
import { Card,Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS files/dishCard.css';
import Img from '../../assets/img/HomeImg.jpg';


class Dish extends Component {
    constructor(props){
        super(props);
        this.state={quantity:0,id:props.id};
        this.increaseValue = this.increaseValue.bind(this);
        this.decreaseValue = this.decreaseValue.bind(this);
    }
    increaseValue(){
        const value=this.state.quantity;
        this.setState({quantity:value+1});
        
      }
    decreaseValue(){
        const value=this.state.quantity;
        if(value>0)this.setState({quantity:value-1});

      }
  render(){
      return (
        <div id={this.state.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"1em",height:"8em",borderRadius:"5px 5px 5px 5px",boxShadow:"0 0 10px rgba(0, 0, 255, .2)",width:"97%",maxWidth:"600px" ,padding:"1em 2em 1em 1em"}}>
          
      <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
      <img style={{height:"4em",borderRadius:"5px 5px 5px 5px", opacity:"1"}} src={Img} />
      <div style={{width:"80%",padding:"1em 0.5em"}}>
        
        <h6>Card Title
        </h6>
        <p >
            Ratings:<span style={{color:"rgb(255,213,5)"}}> &#9733;&#9734;&#9734;&#9734;&#9734;</span>

        </p>
        </div>
        
      </div>
      <div style={{height:"100%",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
          <div className="quantity" >
            <div onClick={this.decreaseValue} className="quantity__minus"><span>-</span></div>
            <input name="quantity" type="text" style={{height:"100%"}} className="quantity__input" value={this.state.quantity}/>
            <div onClick={this.increaseValue} className="quantity__plus"><span>+</span></div>
        </div>
        </div>
      
    </div>
      );
      }
  }
  export default Dish;
  {/*
    <form>
                <div class="value-button" id="decrease" onClick={this.decreaseValue} value="Decrease Value">-</div>
                <input type="number" id="number" value={this.state.quantity} />
                <div class="value-button" id="increase" onClick={this.increaseValue} value="Increase Value">+</div>
            </form>
*/}