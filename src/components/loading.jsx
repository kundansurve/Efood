import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",padding:"1em"}}>
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div></div>
  );
}