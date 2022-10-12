import React, { useEffect,useState,useContext } from 'react';
import {Container,Button,Form,Tabs,Tab,Dropdown,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/img/HomeImg.jpg'; 
import Dish from '../components/user/dishCard';
import { City, UserType,UserData } from "../context";
import LoadingSpinner from '../components/loading';

function DishSection(props){
    const [dishesData,setDishesData] = useState(null);
    const [userData,setUserData] = useContext(UserData);
    useEffect(()=>{
        fetch("/api/hotel/dishes/"+window.location.pathname.split('/').pop())
        .then(response=>response.json())
        .then((data)=>{
        setDishesData(data["dishes"]);
    }).catch(error=>console.log(error));
    },[])
        return (<div className="dishes" style={{display:"flex",height:"fit-content",flexDirection:"column",marginLeft:"0px",alignItems:"center"}}>
        {(dishesData)?
            dishesData.map((data)=>{
                if(userData.userType=='User')return <Dish login={userData.userType} name={data.name} ratings={data.ratings} noOfRatings={data.numberofRatings} type={data.type} id={data._id} price={data.price} isVeg={data.isVeg} img={data.img} count={(userData.user!=undefined && userData.user.cart.items &&userData.user.cart.items[data._id]!=undefined)?userData.user.cart.items[data._id]:0}/>

                return <Dish login={userData.userType} name={data.name} ratings={data.ratings} noOfRatings={data.numberofRatings} type={data.type} id={data._id} price={data.price} isVeg={data.isVeg} img={data.img} count={0}/>
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
            {(dishesData && dishesData.length==0)?<div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                        width: "100%",
                      }}
                    >No Reviews Yet
                    </div>:null}
    </div>);
    
}
export default DishSection; 