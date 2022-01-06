import React from "react";
import './CSS files/hotelCard.css';
import {Card,Button,Image} from 'react-bootstrap';
import Img from './../assets/img/HomeImg.jpg';

export default function HotelCard(props){
    return (   
        <div className="Card" style={{ width: '18rem', border: "0.1rem solid black" }}>
          <Image style={{height:"15vw",width: "100%"}} src={Img} />
        <Card.Body>
        
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </div>
    );
}
