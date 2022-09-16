import React from "react";
import './../CSS files/ReviewPage.css';
import {UserData,City, fetchUserInfo} from './../../context';

function ReviewPage(){
    const [userData, setUserData] = React.useContext(UserData);
    const [orderId,setOrderId]=React.useState(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
    const [reviewedByName,setReviewedByName] = React.useState();
    const [hotelReview,setHotelReview] = React.useState("");
    const [hotelRating,setHotelRating] = React.useState(null);
    const [deliveryExecutiveRating,setDeliveryExecutiveRating] = React.useState(null);
    const [deliveryExecutiveReview,setdeliveryExecutiveReview] = React.useState("");

    React.useEffect(()=>{
        fetchUserInfo(setUserData);
        fetch(`http://localhost:4000/api/user/me/orders/${orderId}`)
            .then(resp => resp.json())
            .then(data => {
                setReviewedByName(userData.user.firstName+" "+userData.user.lastName);
                fetch(`http://localhost:4000/api/isReviewedOrder/${orderId}`)
            .then(resp=>resp.json())
            .then(data=>{
                if(data.reviewed){
                    alert("This Order is already Reviewed"); 
                    window.location="http://localhost:3000/";
                }
            }).catch(error=>{
                console.log(error);
            })
            }).catch(error=>{
                console.log(error);
                return;
            })
            
    },[])
    const onSubmit = () =>{
        if(!hotelRating && !deliveryExecutiveRating && deliveryExecutiveReview.length==0 && hotelReview.length==0 && orderId && reviewedByName){
            alert("Please Fill all the Details");
            return;
        }
        fetch('http://localhost:4000/api/user/me/createreview/order',{
            method: "POST",
            body: JSON.stringify({orderId,reviewedByName,hotelReview,deliveryExecutiveRating,hotelRating,deliveryExecutiveReview}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              }
          })
          .then(resp=>resp.json())
          .then((data)=>{
            //if(data==='Order is not yet Delivered'){
                alert(JSON.stringify(data))
                window.location="http://localhost:3000/";
            //}
          }).catch(error=>{
            alert(error);
          })
    }
    const onInput = event => {
        if(event.target.name==="ratings"){
            if(event.target.value>5 || event.target.value<0){
                event.target.value=parseInt(event.target.value)%11;
                return;
            }
        }
         setHotelRating( event.target.value);
      }
      const onInput1 = event => {
        if(event.target.name==="ratings"){
            if(event.target.value>5 || event.target.value<0){
                event.target.value=parseInt(event.target.value)%11;
                return;
            }
        }
         setDeliveryExecutiveRating(event.target.value);
      }
      const onchangehotelReview = (event) => {
        setHotelReview(event.target.value);
      }
      
      const onchangeDEReview = (event) => {
        setdeliveryExecutiveReview(event.target.value);
      }
    return (<div style={{marginTop:"3em",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"500px",width:"100%"}}>
        <div style={{display:"flex",border:"1px solid black",padding:"1em",borderRadius:"10px",justifyContent:"center",alignItems:"flex-start",width:"95%",maxWidth:"600px",flexDirection:"column"}}><h6>Rate your Experience for the meal:</h6>
      <div style={{padding:"0.5em",display:"flex",justifyContent:"center",alignItems:"center"}}>
       <form className="rating">
        
<label>
<input className="rate" type="radio" name="ratings" value="1" onClick={ onInput}/>
<span className="icon">★</span>
</label>
<label>
<input  className="rate" type="radio" name="ratings" value="2" onClick={ onInput} />
<span className="icon">★</span>
<span className="icon">★</span>
</label>
<label>
<input  className="rate" type="radio" name="ratings" value="3" onClick={ onInput}/>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>   
</label>
<label>
<input className="rate" type="radio" name="ratings" value="4" onClick={ onInput}/>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
</label>
<label>
<input  className="rate" type="radio" name="ratings" value="5" onClick={ onInput} />
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
</label>
</form>
</div><textarea className="reviewinput" onChange={onchangehotelReview} type="text" placeholder="Give you vaulueable review or feedback for Hotel/Cuisine" style={{backgroundColor:"white",width:"100%",border:"none",borderBottom:"1px sild black"}}/>
<br/>
<h6>Rate your Experience your delivery partner:</h6>
<div style={{padding:"0.5em",display:"flex",justifyContent:"center",alignItems:"center"}}>
       
       <form className="rating">
        
<label>
<input className="rate" type="radio" name="ratings" value="1" onClick={ onInput1}/>
<span className="icon">★</span>
</label>
<label>
<input  className="rate" type="radio" name="ratings" value="2" onClick={ onInput1} />
<span className="icon">★</span>
<span className="icon">★</span>
</label>
<label>
<input  className="rate" type="radio" name="ratings" value="3" onClick={ onInput1}/>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>   
</label>
<label>
<input className="rate" type="radio" name="ratings" value="4" onClick={ onInput1}/>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
</label>
<label>
<input  className="rate" type="radio" name="ratings" value="5" onClick={ onInput1} />
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
<span className="icon">★</span>
</label>
</form>
</div><textarea onChange={onchangeDEReview} className="reviewinput" type="text" placeholder="Give you vaulueable review or feedback for delivery partner" style={{marignBottom:"0.5em",width:"100%",backgroundColor:"white",border:"none",borderBottom:"1px sild black"}}/>
<button onClick={onSubmit} style={{ marginTop:"0.5em",textAlign: "center", border: "none", background: "var(--color1)", color: "white", width: "100%", padding:"0.5em", borderRadius: "5px" }}>Submit</button>
</div></div>);
}
export default ReviewPage;