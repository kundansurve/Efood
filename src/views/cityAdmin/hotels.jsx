import React, { Component } from "react";
import { render } from "@testing-library/react";
// import { Link } from "react-router-dom";
// import "../JS files/delivery";
// import mapboxgl from "mapbox-gl";
// import DishInfo from "../../components/Hotel/dishInfo";
import CityHotel from "../../components/City/cityHotel";

class Hotels extends Component {
  constructor(props){
    super(props);
    this.state={
      hotels:[]
    }
  }
  componentDidMount() {
    fetch("/api/city/me/hotels")
    .then((resp)=>resp.json())
    .then(data=>{
      this.setState({hotels:data.hotels});
    }).catch(error=>console.log(error))
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "auto",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {this.state.hotels.map(hotel=>{
          return <CityHotel hotel={hotel}/>
        })}
      </div>
    );
  }
}
export default Hotels;
