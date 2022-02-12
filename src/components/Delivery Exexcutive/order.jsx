export default function Order(props){
    return (<div style={{width:"90%",padding:"1.5em",border:"2px solid #efefef",borderRadius:"5px",margin:"1em"}}>
    <h5>Delivery Details:</h5>
    <span style={{display:"flex",marginLeft:"2em",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center"}}>
        <span style={{display:"flex",marginRight:"3em",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
        <h6 >Order Pickup Point:</h6>
        <p >Rasraj Hotel</p>
    </span>
    <span style={{display:"flex",marginRight:"3em",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
        <h6 >Order Drop Point:</h6>
        <p>Wadel road</p>
    </span>
    <span style={{display:"flex",marginRight:"3em",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
        <h6 >Total Distance:</h6>
        <p>4km</p>
    </span>
    <span style={{display:"flex",justifyContent:"center",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start"}}>
    <h6 >Rewards:</h6>
    <p>Rs. 60</p>
    </span>
    </span>
    
    <div style={{display:"flex",justifyContent:"flex-end"}} >
        <button style={{padding:"0.5rem",margin:"0.5rem",borderRadius:"5px",color:"white",backgroundColor:"var(--color1)",border:"none"}}>Accept</button>
    </div>
</div>);
}