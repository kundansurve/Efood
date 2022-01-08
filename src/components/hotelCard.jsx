import React from "react";
import './CSS files/hotelCard.css';
import {Card,Button,Image} from 'react-bootstrap';
import Img from './../assets/img/HomeImg.jpg';


export default function HotelCard(props){
    return (   
        <div className="Card" style={{ width: '18rem',minHeight:"300px",boxShadow:"6px 12px 12px 6px rgba(0, 0, 255, .2)",borderRadius:"2em" }}>
          <Image style={{height:"80%",width: "100%",borderRadius:"2em 2em 0em 0em", opacity:"1"}} src={Img} />
        <Card.Body>
        
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </div>
    );
}
