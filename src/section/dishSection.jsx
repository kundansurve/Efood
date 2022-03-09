import React, { useEffect,useState } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg'; 
import Dish from '../components/user/dishCard';

function DishSection(props){
    const [dishesData,setDishesData] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/api/hotel/dishes/"+window.location.pathname.split('/').pop())
        .then(response=>response.json())
        .then((data)=>{
        setDishesData(data["dishes"]);
    }).catch(error=>console.log(error));
    },[])
        return (<div className="dishes" style={{display:"flex",height:"fit-content",flexDirection:"column",marginLeft:"0px",alignItems:"center"}}>
        {
            dishesData.map((data)=>{
                return <Dish name={data.name} ratings={data.ratings} noOfRatings={data.numberofRatings} type={data.type} id={data._id} price={data.price} isVeg={data.isVeg} img={data.img}/>
            })
        }
        
    </div>);
    
}
export default DishSection; 