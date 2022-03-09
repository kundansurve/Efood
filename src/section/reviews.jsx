import React, { Component,useEffect,useState } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg';
import Review from '../components/user/reviewCard';

function ReviewSection(props){
     const [reviewsData,setReviewsData]=useState([])

    useEffect(()=>{
        fetch("http://localhost:4000/api/reviews/hotel/"+window.location.pathname.split('/').pop())
        .then(response=>response.json())
        .then((data)=>{
            //alert(data["reviews"]);
            setReviewsData(data["reviews"]);
        }).catch(error=>alert(error));
    },[]);
    
    return (<section id="testimonials">
            <div class="testimonial-box-container">
                {reviewsData.map((data)=>{
                    return <Review ratings={data.rating} review={data.review} name={data.reviewedByName}/>
                })
                }
            </div>
        </section>);
    
}
export default ReviewSection;