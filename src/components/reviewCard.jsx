import React,{Component} from 'react';
import { Navbar,
    Nav,
    Container,
    Form,
    } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS files/reviewCard.css';

function Review(props){
    return (<div  className="testimonial-box" style={{ width:"80%"}}>
                 <div >
    <div  className="box-top" style={{float:props.float,width:"100%"}} >
         
        <div  className="profile" >
            
            <div  className="profile-img">
                <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
            </div>
             
            <div  className="name-user" style={{ }}>
                <strong>Liam mendes</strong>
                <span>@liammendes</span>
            </div>
        </div>
         
        
    </div>
     </div>
     <div  className="reviews" >
        Ratings:<span style={{color:"rgb(255,213,5)"}}> &#9733; &#9733; &#9733; &#9733; &#9734;</span>
        </div>
    <div  className="client-comment" >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
    </div>
</div>);
}
export default Review;