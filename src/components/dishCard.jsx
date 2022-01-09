import React,{Component} from 'react';
import { Card,Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS files/footer.css';
import './CSS files/dishCard.css';
import Img from './../assets/img/HomeImg.jpg';


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
        <div className="Card" id={this.state.id} style={{margin:"0.5em",height:"150px",borderRadius:"5px 5px 5px 5px",boxShadow:"0 0 10px rgba(0, 0, 255, .2)",width:"90%",maxWidth:"600px",display:"flex",justifyContent:"center",alignItems:"center" ,padding:"1em 2em 1em 1em"}}>
        <Image style={{marginLeft:"2px",height:"120px",width: "120px",borderRadius:"5px 5px 5px 5px", opacity:"1"}} src={Img} />
      <Card.Body style={{width:"80px"}}>
      <div>
        <Card.Title>Card Title
        </Card.Title>
        <Card.Text >
            Ratings:<span style={{color:"rgb(255,213,5)"}}> &#9733; &#9734;</span>

        </Card.Text>
        </div>
        
      </Card.Body>
      <div className="quantity">
            <div onClick={this.decreaseValue} className="quantity__minus"><span>-</span></div>
            <input name="quantity" type="text" style={{height:"100%"}} className="quantity__input" value={this.state.quantity}/>
            <div onClick={this.increaseValue} className="quantity__plus"><span>+</span></div>
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