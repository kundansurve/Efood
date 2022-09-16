import React, { Component } from 'react';
import { Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS files/dishCard.css';
import Img from '../../assets/img/HomeImg.jpg';
import {UserData} from '../../context';

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = { userType:props.login,quantity: props.count, id: props.id, ...props };
    this.increaseValue = this.increaseValue.bind(this);
    this.decreaseValue = this.decreaseValue.bind(this);
    console.log("Constructor count "+props.count);
  }
  componentDidMount(){
    
        fetch(`/api/ratings-of/dish/${this.state.id}`)
        .then(resp=>resp.json())
        .then((data)=>{
            this.setState({ratings:data.rating});
        }).catch(error=>{
          console.log(error)
        })
    
  }
  increaseValue() {
    if(this.state.userType!=='User'){
      alert("Please login");
      return;
    }
    const value = this.state.quantity;
    this.setState({ quantity: value + 1 });
    fetch('/api/user/me/addtocart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dishId: this.state.id })
    })
      .then((response) => response.json())
      .then((data) => { console.log(JSON.stringify(data)) })
      .catch((error) => { console.log(error) })

  }
  decreaseValue() {
    if(this.state.userType!=='User'){
      alert("You are not Login as User");
      return;
    }
    const value = this.state.quantity;
    if (value > 0) {
      this.setState({ quantity: value - 1 });
      fetch('/api/user/me/removefromcart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishId: this.state.id })
      })
        .then((response) => response.json())
        .then((data) => { console.log(JSON.stringify(data)) })
        .catch((error) => { console.log(error) })
    }
  }
  render() {
    return (
      <div id={this.state.id} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: "1em", height: "fit-content", borderRadius: "5px 5px 5px 5px", boxShadow: "0 0 10px rgba(0, 0, 255, .2)", width: "97%", maxWidth: "600px", padding: "0.5em 0.5em 0.5em 0.5em" }}>

        <div style={{ display: "flex", justifyContent: "flex-start",flexDirection:"column", alignItems: "center",justifyContent:"center",margin:"5px" }}>
          <img style={{ height: "4em",width:"5em", borderRadius: "5px 5px 5px 5px", opacity: "1" }} src={this.state.img} />
        </div>
        <div style={{ height: "100%",width:"100%", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100%", padding: "0.2em 0.2em" ,maxWidth:"300px"}}>
<span style={{ margin: "0em", padding: "0em" }}>{this.state.name}
</span>

<p style={{margin:"0em"}}>
  Ratings: <span style={{ color: "rgb(255,213,5)" }}> {[...Array(5)].map((e, i) => { if (i < this.state.ratings) return <>&#9733;</>; return <>&#9734;</>; })}</span>
  <br />
  Type: {this.state.type}
  <br />
  Price: {this.state.price}
</p>
</div>
          <div className="quantity" type="button">
            <div onClick={this.decreaseValue} className="quantity__minus"><span>-</span></div>
            <input name="quantity" type="text" style={{ height: "100%" }} className="quantity__input" value={this.state.quantity} />
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