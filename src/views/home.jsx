import React, { useEffect,useState,useContext } from 'react';
import {City} from '../context'
import homeImage from '../assets/img/HomeImg.jpg';
import InputBar from '../components/inputBar';
import HotelCard from '../components/hotelCard';
import './home.css';
import deliver from './../assets/img/deliver.svg'
import find from './../assets/img/find.svg';
import location from './../assets/img/location.svg';
import { Link } from 'react-router-dom';
import { set } from 'mongoose';
import TopDish from '../components/topDish';
import Loading from './../components/loading';

function Home(props){
  const [city,setCity]=useContext(City);
  const [hotelsList,setHotelsList]=useState(null);
  const [dishes,setDishes]=useState(null);
  const [filteredhotelsList,setFilteredHotelsList]=useState([]);
  const [filtereddishes,setFilteredDishes]=useState([]);
  const [topHotels,setTopHotels]=useState([]);
  const [topDishes,setTopDishes]=useState([]);
  const [cityList,setCityList]=useState([]);
  const [searchedData,setSearchData]=useState(null);
  const [searchInput,setSearchInput]=useState(null);
  const onChangeCity=(e)=>{
     setFilteredDishes([]);
     setSearchData(null);
     setFilteredHotelsList([]);
     setDishes(null);
     setTopDishes(null);
     setTopHotels(null);  
     setHotelsList(null);
    fetch('/api/hotels/'+e, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
      .then((data)=>{
        data.hotels.sort(function(a, b){return (b.ratings/((b.numberofRatings-1)?b.numberofRatings-1:1))-(a.ratings/((a.numberofRatings-1>0)?a.numberofRatings-1:1))});
          setTopHotels(data.hotels.slice(0,10));  
        setHotelsList(data.hotels);
          
      }).catch(error=>console.log(error));
  
  /*fetch('/api/hotels/top-rated/'+e, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
      .then((data)=>{
                  setTopHotels(data.hotels);
      }).catch(error=>console.log("hotelerror: "+error));
  
      fetch('/api/dishes/top-rated/'+e, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
      .then((data)=>{
          setTopDishes(data.dishes);
      }).catch(error=>console.log("hotelerror: "+error));
*/
      fetch('/api/city/dishes/'+e, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
      .then((data)=>{
        data.dishes.sort(function(a, b){return (b.ratings/((b.numberofRatings-1>0)?b.numberofRatings-1:1))-(a.ratings/((a.numberofRatings-1>0)?a.numberofRatings-1:1))});
        setTopDishes(data.dishes.slice(0,10));  
        setDishes(data.dishes);
      }).catch(error=>console.log(error));
    };
  
  useEffect(()=>
  {
    fetch('/api/cities/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(response => response.json())
        .then((data)=>{
            setCityList(data.cities);
        }).catch(error=>{
          console.log(error);
        })
        onChangeCity(city);
      }
  ,[]);

  const onSearch=(keyword)=>{
    if(keyword===""){
      setSearchData(null);
      setFilteredDishes([]);
      setFilteredHotelsList([]);
      return;
    }
    const newHotels=[];
    const newDishes=[];
    for(let hotel of hotelsList){
      if(hotel.name.toLowerCase().startsWith(keyword.toLowerCase())){
        newHotels.push(hotel);
      }
    }
    for(let dish of dishes){
      
      if(dish.name.toLowerCase().startsWith(keyword.toLowerCase())){
        newDishes.push(dish);
      }
    }
    
    setFilteredDishes(newDishes);
    setFilteredHotelsList(newHotels);
      
  }

  const onClickOption = (keyword) => {
    
    if(keyword)document.querySelector(`#searchBar`).value=keyword;
    else keyword = document.querySelector(`#searchBar`).value;
    setFilteredDishes([]);
    setFilteredHotelsList([]);
    const newHotels=[];
    const newDishes=[];
    for(let hotel of hotelsList){
      if(hotel.name.toLowerCase().startsWith(keyword.toLowerCase())){
        newHotels.push(hotel);
      }
    }
    for(let dish of dishes){
      console.log("Name:"+dish.name+" keyword:"+keyword);
      if(dish.name.toLowerCase().startsWith(keyword.toLowerCase())){
        newDishes.push(dish);
      }
    }
    setSearchData({hotels:newHotels,dishes:newDishes});
  }
    return  <div>
                <div style={{zIndex:"0",backgroundImage:`url(${homeImage})`,backgroundSize:"cover",left:"0px",top:"0px",width:"100%",height:"90vh"}}>
                <div style={{display:"flex",flexDirection:"column",margin:"0px",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)"}} >
                    <span style={{color:"white",fontSize:"5em",textAlign:"left"}}>
                       Foodie
                    </span>
                    <span style={{fontSize:"1.5em",color:"#bfbfbf",textAlign:"center"}}>At home we serve the kind of food we know the story behind</span>
                    <div style={{width:"70%",marginTop:"1em",minWidth:"300px",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
                    <form  style={{borderRadius:"5px",maxWidth:"150px",height:"45px",width:"30%",margin:"0em",padding:"0em",display:"flex",justifyContent:"center"}}>
                       <select value={city} style={{width:"100%",padding:"0.5em",borderRadius:"5px 0 0 5px"}} onChange={(e)=>{setCity(e.target.value);onChangeCity(e.target.value)}}>
                          {(cityList.map((data)=>{
                            return <option id={data._id} value={data._id} name={data.name}>{data.name}</option>;
                          }))}
                       </select>
                       
                       </form><form autocomplete="off" onSubmit={(e)=>{e.preventDefault();onClickOption(null)}} style={{width:"100%",maxWidth:"500px"}}>
  <div className="autocomplete" style={{width:"100%",maxWidth:"500px"}}>
    <input id="searchBar" type="text" name="" style={{height:"45px",border:"none",borderRadius:"0 5px 5px 0",padding:"0.5em",width:"100%",maxWidth:"500px"}} placeholder="Enter any Restaurants, dish or cuisine" onChange={(e)=>{e.preventDefault();onSearch(e.target.value)}}/>
    
    </div>
    {(filtereddishes.length>0 ||filteredhotelsList.length>0 )?<div className="options" style={{width:"100%",height:"fit-content",backgroundColor:"white"}}>
    {(filtereddishes.length>0)?<div style={{width:"100%",padding:"0.4em",float:"right",maxWidth:"500px",backgroundColor:"white",fontWeight:"600"}}>Dish or Cuisine</div>:null}
      {filtereddishes.map((dish,ind)=>{
        if(ind>=5)return null;
        if(ind==4 || ind===filtereddishes.length-1 && filteredhotelsList.length===0)return (<div id={dish.name} onClick={(e)=>{onClickOption(e.target.id)}} className='option' style={{width:"100%",padding:"0.4em",float:"right",maxWidth:"500px",borderRadius:"0px 0px 5px 5px"}}>{dish.name}</div>)
      return (<div id={dish.name} onClick={(e)=>{onClickOption(e.target.id)}} className='option' style={{width:"100%",padding:"0.4em",float:"right",maxWidth:"500px"}}>{dish.name}</div>)})}
      {(filteredhotelsList.length>0)?<div style={{width:"100%",padding:"0.4em",float:"right",maxWidth:"500px",backgroundColor:"white",fontWeight:"600"}}>Hotels</div>:null}
      {filteredhotelsList.map((hotel,ind)=>{
        if(ind>=5)return null;
        if(ind==4 ||ind===filteredhotelsList.length-1){
          return (<div id={hotel.name} onClick={(e)=>{onClickOption(e.target.id)}} className='option' style={{width:"100%",padding:"0.4em",float:"right",maxWidth:"500px",borderRadius:"0px 0px 5px 5px"}}>{hotel.name}</div>);
        }
      return (<div id={hotel.name} onClick={(e)=>{onClickOption(e.target.id)}} className='option' style={{width:"100%",padding:"0.4em",float:"right",maxWidth:"500px"}}>{hotel.name}</div>)})}
    </div>:null}  
</form>                    
</div>                     
              
                </div>
                </div>
                <div style={{display:"flex",maxWidth:"1200px",justifyContent:"center",margin:"auto",padding:"0px",width:"100%",flexDirection:"column"}}>
                {(searchedData)?<>
                  
                  {(searchedData.dishes.length==0 && searchedData.hotels.length==0)?<div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1em", fontSize:"2em",textAlign:"center"}}>NO SEARCH RESULTS FOUND</div>:<span className='title'>SEARCH RESULTS...</span>}
                  {(searchedData.dishes.length>0)?<span className='title'>CUISINE</span>:null}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",marginTop:"0.7em",marginBottom:"1.5em",width:"100%"}}>
                    
                    <ul className="scroll" style={{padding:"0.2em",display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"flex-start",msOverflowStyle:"none",scrollbarWidth: "none"}}>
                        {searchedData.dishes.map(( dish)=>{
                          return (<TopDish hotelId={dish.hotelId} name={dish.name} img={dish.img} ratings={dish.ratings/((dish.numberofRatings-1)?dish.numberofRatings-1:1)} _id={dish._id}/>);
                        })
                        }
                    </ul>
                    </div>
                    {(searchedData.hotels.length>0)?<span className='title'>HOTELS</span>:null}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",marginTop:"0.7em",marginBottom:"1.5em",width:"100%"}}>
                    
                    <ul className="scroll" style={{padding:"0.2em",display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"flex-start",msOverflowStyle:"none",scrollbarWidth: "none"}}>
                        {searchedData.hotels.map(( hotel)=>{
                          return <HotelCard name={hotel.name} id={hotel._id} ratings={hotel.ratings/((hotel.numberofRatings-1)?hotel.numberofRatings-1:1)} img={hotel.img}/>
                        })
                        }
                    </ul>
                    </div>
                </>:<><span className='title' style={{textAlign:"center"}}>HURRY UP! FOODIEES...</span>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"3em",width:"100%"}}>
                
                    <ul style={{padding:"0.2em",width:"100%",flexWrap:"wrap",display:"flex",justifyContent:"space-evenly",alignItems:"space-evenly"}}>
                        <div style={{height:"200px",display:"flex",justifyContent:"flex-start",flexDirection:"column",alignItems:"center",textAlign:"center"}}><img style={{height:"100px"}} src={find} alt="Find best hotels and dishes" />
                        <p style={{width:"200px"}}> FIND BEST HOTELS, DISHES AND ADD TO YOUR CART</p>
                        </div>
                        <div style={{height:"200px",display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",textAlign:"center"}}><img style={{height:"100px"}} src={location} alt="Place at you order" />
                        <p style={{width:"200px"}}>PLACE YOUR ORDER WITH YOUR ADDRESS</p>
                        </div>
                        <div style={{height:"200px",display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"column",textAlign:"center"}}><img style={{height:"100px"}} src={deliver} alt="Get Delivered at very less time" />
                        <p style={{width:"200px"}}>GET ORDER DELIVERED IN MINIMUM TIME AND ENJOY YOUR MEAL</p>
                        </div>
                    </ul>
                    </div>
                <span className='title'>HOT RATED CUISINE NEAR YOU</span>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",marginTop:"0.7em",marginBottom:"1.5em",width:"100%"}}>
                    
                    <ul className="scroll" style={{width:"100%",padding:"0.2em",display:"flex",justifyContent:"flex-start",alignItems:"center",overflowX:"scroll",msOverflowStyle:"none",scrollbarWidth: "none"}}>
                    {(!topDishes || topDishes.length==0)?(dishes)?<>
                      {dishes.map(( dish)=>{
                          return (<TopDish hotelId={dish.hotelId} name={dish.name} img={dish.img} ratings={dish.ratings/((dish.numberofRatings-1)?dish.numberofRatings-1:1)} _id={dish._id}/>)
                        })
                        }
                    </>:<Loading/>:(topDishes)?topDishes.map(( dish)=>{
                          return (<TopDish hotelId={dish.hotelId} name={dish.name} img={dish.img} _id={dish._id} ratings={dish.ratings/((dish.numberofRatings-1)?dish.numberofRatings-1:1)}/>)
                        }):<Loading/>}
                        
                    </ul>
                    </div>
                    <span className='title'>TOP RATED HOTELS NEAR YOU</span>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",marginTop:"0.7em",marginBottom:"1.5em",width:"100%"}}>
                    
                    <ul className="scroll" style={{width:"100%",padding:"0.2em",display:"flex",justifyContent:"flex-start",alignItems:"center",overflowX:"scroll",msOverflowStyle:"none",scrollbarWidth: "none"}}>
                        {(!topHotels || topHotels.length==0)?(hotelsList)?<>{hotelsList.map(( hotel)=>{
                          return <HotelCard name={hotel.name} id={hotel._id} ratings={hotel.ratings/((hotel.numberofRatings-1)?hotel.numberofRatings-1:1)} img={hotel.img}/>
                        })}</>:<Loading/>:topHotels.map(( hotel)=>{
                          return <HotelCard name={hotel.name} id={hotel._id} ratings={hotel.ratings/((hotel.numberofRatings-1)?hotel.numberofRatings-1:1)} img={hotel.img}/>
                        })}
                    
                    </ul>
                    </div></>
                    }
                </div>
        </div>;
}
export default Home;