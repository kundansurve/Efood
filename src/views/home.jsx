import React, { useEffect,useState,useContext } from 'react';
import {City} from '../context'
import homeImage from '../assets/img/HomeImg.jpg';
import InputBar from '../components/inputBar';
import HotelCard from '../components/hotelCard';


function Home(props){
  const [city,setCity]=useContext(City);
  const [hotelsList,setHotelsList]=useState([]);
  const [cityList,setCityList]=useState([]);
  const onChangeCity=(e)=>{
        
    fetch('http://localhost:4000/api/hotels/'+e, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
      .then((data)=>{
        //alert(data);
          setHotelsList(data.hotels);
      }).catch(error=>alert("hotelerror: "+error));
  };
  useEffect(()=>
  {
    fetch('http://localhost:4000/api/cities/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(response => response.json())
        .then((data)=>{
            setCityList(data.cities);
        }).catch(error=>alert("cityError: "+error))
        onChangeCity(city);
      }
  ,[]);
    return  <div>
                <div style={{zIndex:"0",backgroundImage:`url(${homeImage})`,backgroundSize:"cover",left:"0px",top:"0px",width:"100%",height:"90vh"}}>
                <div style={{display:"flex",flexDirection:"column",margin:"0px",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)"}} >
                    <span style={{color:"white",fontSize:"5em",textAlign:"left"}}>
                       Foodie
                    </span>
                    <span style={{fontSize:"1.5em",color:"#bfbfbf",textAlign:"center"}}>At home we serve the kind of food we know the story behind</span>
                    <form  style={{borderRadius:"5px",width:"40%",marginTop:"1em",minWidth:"300px",display:"flex",justifyContent:"center"}}>
                       <select value={city} style={{width:"30%",padding:"0.5em",borderRadius:"5px 0 0 5px"}} onChange={(e)=>{setCity(e.target.value);onChangeCity(e.target.value)}}>
                          {(cityList.map((data)=>{
                            return <option id={data._id} value={data._id} name={data.name}>{data.name}</option>;
                          }))}
                       </select>
                       <input type="email" style={{border:"none",borderRadius:"0 5px 5px 0",padding:"0.5em",width:"60%"}} placeholder="Enter any Restaurants, dish or cuisine" />
                     </form>
                </div>
                </div>
                <div style={{display:"flex",maxWidth:"1200px",justifyContent:"center",margin:"auto",padding:"0px",width:"100%",flexDirection:"column"}}>
                <span className='title'>Hotels Near You</span>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"3em",width:"100%"}}>
                    
                    <ul style={{flexWrap:"wrap",display:"flex"}}>
                        {hotelsList.map(( hotel)=>{
                          return <HotelCard name={hotel.name} id={hotel._id} ratings={hotel.ratings} img={hotel.img}/>
                        })
                        }
                    </ul>
                    </div>
                    
                </div>
        </div>;
}
export default Home;