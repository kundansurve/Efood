import React,{Component} from 'react';
import { Navbar,
    Nav,
    Container,
    } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './login';
import './CSS files/footer.css';
import './CSS files/dishCard.css';

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
      <><div className="big">
      <article className="recipe">
         <div className="pizza-box">
             <img src="https://brotokoll.com/wp-content/uploads/2019/12/xPSX_20190928_134709.jpg.pagespeed.ic.qsjw5ilFw5.jpg" width="1500" height="1368" alt=""/>
         </div>
         <div className="recipe-content">
             <p className="recipe-tags">
                 <span className="recipe-tag">Gluten Free</span>
                 <span className="recipe-tag">Main dish</span>
             </p>
 
             <h1 className="recipe-title"><a href="#">Gluten Free Pan Pizza</a></h1>
 
             <p className="recipe-metadata">
                 <span className="recipe-rating">★★★★<span>☆</span></span>
                 <span className="recipe-votes">(12 votes)</span>
             </p>
 
             <p className="recipe-desc">It really is possible to make excellent gluten free pizza at home in your own oven with our recipes and techniques.</p>
 
            <form>
                <div class="value-button" id="decrease" onClick={this.decreaseValue} value="Decrease Value">-</div>
                <input type="number" id="number" value={this.state.quantity} />
                <div class="value-button" id="increase" onClick={this.increaseValue} value="Increase Value">+</div>
            </form>
 
         </div>
     </article>
 </div>
 
</>
                                );
      }
  }
  export default Dish;