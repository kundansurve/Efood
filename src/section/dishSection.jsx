import React, { useEffect,useState,useContext } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg'; 
import Dish from '../components/user/dishCard';
import { City, UserType,UserData } from "../context";

function DishSection(props){
    const [dishesData,setDishesData] = useState([]);
    const [userData,setUserData] = useContext(UserData);
    console.log("userData: "+JSON.stringify(userData));
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
                console.log(userData.user.cart.items)
                return <Dish login={userData.userType} name={data.name} ratings={data.ratings} noOfRatings={data.numberofRatings} type={data.type} id={data._id} price={data.price} isVeg={data.isVeg} img={data.img} count={(userData.cart && userData.cart.items[data._id])?userData.user.cart.items[data._id]:0}/>
            })
        }
        
    </div>);
    
}
export default DishSection; 