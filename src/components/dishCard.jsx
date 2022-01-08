import React,{Component} from 'react';
import { Card,Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS files/footer.css';
import './CSS files/dishCard.css';
import Img from './../assets/img/HomeImg.jpg';


class Dish extends Component {
    constructor(props){
        super(props);
        this.state={quantity:0};
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
        <div className="Card" style={{height:"100px",borderRadius:"5px 5px 5px 5px",boxShadow:"0 0 10px rgba(0, 0, 255, .2)",width:"400px",maxWidth:"80%",display:"flex",justifyContent:"center",alignItems:"center" }}>
        <Image style={{marginLeft:"2px",height:"80px",width: "80px",borderRadius:"5px 5px 5px 5px", opacity:"1"}} src={Img} />
      <Card.Body>
      <div>
        <Card.Title>Card Title
        </Card.Title>
        <Card.Text >
            Ratings:<span style={{color:"rgb(255,213,5)"}}> &#9733; &#9734;</span>

        </Card.Text>
        </div>
        <div className="quantity">
            <a href="#" onClick={this.decreaseValue} className="quantity__minus"><span>-</span></a>
            <input name="quantity" type="text" style={{height:"100%"}} className="quantity__input" value={this.state.quantity}/>
            <a href="#" onClick={this.increaseValue} className="quantity__plus"><span>+</span></a>
        </div>
      </Card.Body>
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