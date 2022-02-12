import { Link } from "react-router-dom";

export default function NotFoundPage(props){
    return <div style={{width:"100%",height:"80vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h1>404 Error Page Not Found</h1>
        <Link to="/">
        <h5 style={{color:"#6666ff"}}>Return to home</h5>
        </Link>
    </div>;
}