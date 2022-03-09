import React,{Component} from 'react';
import '../CSS files/reviewCard.css';

function Review(props){
    return (<div  className="testimonial-box" style={{ width:"80%"}}>
                 <div >
    <div  className="box-top" style={{float:props.float,width:"100%"}} >
         
        <div  className="profile" >
            
            <div  className="profile-img">
                <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
            </div>
             
            <div  className="name-user" style={{ }}>
                <strong>{props.name}</strong>
            </div>
        </div>
         
        
    </div>
     </div>
     <div  className="reviews" >
        Rating: <span style={{color:"rgb(255,213,5)"}}> {[...Array(5)].map((e, i) =>{if(i<props.ratings)return<>&#9733;</>; return<>&#9734;</>; }) }</span>
        </div>
    <div  className="client-comment" >
        <p>{props.review}</p>
    </div>
</div>);
}
export default Review;