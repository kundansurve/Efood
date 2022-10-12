import React, { Component,useEffect,useState } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg';
import LoadingSpinner from '../components/loading';
import Review from '../components/user/reviewCard';

function ReviewSection(props){
     const [reviewsData,setReviewsData]=useState(null)

    useEffect(()=>{
        fetch("/api/reviews/hotel/"+window.location.pathname.split('/').pop())
        .then(response=>response.json())
        .then((data)=>{
            //alert(data["reviews"]);
            setReviewsData(data["reviews"]);
        }).catch(error=>alert(error));
    },[]);
    
    return (<section id="testimonials">
            <div class="testimonial-box-container">
                {(reviewsData)?reviewsData.map((data)=>{
                    return <Review ratings={data.hotel.rating} review={data.hotel.review} name={data.reviewedByName}/>
                })
                :
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                        width: "100%",
                      }}
                    >
                      <LoadingSpinner/>
                    </div>}
                    {(reviewsData && reviewsData.length==0)?<div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                        width: "100%",
                      }}
                    >No Reviews Yet
                    </div>:null}
            </div>
        </section>);
    
}
export default ReviewSection;