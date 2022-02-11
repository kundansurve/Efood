import React, { useState } from 'react';
import { Navbar,
    Nav,
    Form,
    Modal,
    Button,
    FormControl
    } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './CSS files/login.css';

function LoginPage(props) {
    const [show, setShow] = useState(false);
    const [action,setAction] = useState({title:props.title});
    const handleClose = (e) => {
      if(e.target.name==="close")setShow(false);
    }
    const handleShow = () => setShow(true);
  
    return (
      (action.title=='Login')?
      <>
        <div  className="colors" type="button" style={{color:"white",padding:"0.5em"}} onClick={handleShow}>
        {props.title}
        </div>
        <div className="loginSection" name="close" style={{display:(show)?"flex":"none",position:"fixed",top:"0px",zIndex:"999"}} onClick={handleClose}>
        <div id="logincard" >
        <img type="button" src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" name="close" style={{width:"20px",float:"right",margin:"1em"}}/>
    <div id="logincard-content">
    
      <div id="logincard-title">
        <h2 >LOGIN</h2>
        <div className="underline-title"></div>
      </div>
      <form method="post" className="form">
        <label for="user-email" style={{paddingTop:"13px"}}>
            &nbsp;Email
          </label>
        <input id="user-email" className="form-content" type="email" name="email" autocomplete="on" required />
        <div className="form-border"></div>
        <label for="user-password" style={{paddingTop:"22px"}}>&nbsp;Password
          </label>
        <input id="user-password" className="form-content" type="password" name="password" required />
        <div className="form-border"></div>
        <a href="#">
          <legend id="forgot-pass">Forgot password?</legend>
        </a>
        <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
        <a href="#" id="signup" onClick={()=>{setAction({title:'SignUp'})}}>Don't have account yet?</a>
      </form>
    </div>
  </div>
</div>
      </>
    :
    <>
        <div className="colors"  type="button" style={{color:"white",padding:"0.5em"}} onClick={handleShow}>
          {props.title}
        </div>
        <div className="loginSection" name="close" style={{display:(show)?"flex":"none",position:"fixed",top:"0px",zIndex:"999"}} onClick={handleClose}>
        <div id="logincard" >
        <img type="button" src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" name="close" style={{width:"20px",float:"right",margin:"1em"}}/>
    <div id="logincard-content">
    
      <div id="logincard-title">
        <h2 >SIGN UP</h2>
        <div className="underline-title"></div>
      </div>
      <form method="post" className="form">
        <label for="user-email" style={{paddingTop:"13px"}}>
            &nbsp;Email
          </label>
        <input id="user-email" className="form-content" type="email" name="email" autocomplete="on" required />
        <div className="form-border"></div>
        <label for="user-first-name" style={{paddingTop:"13px"}}>
            &nbsp;First Name
          </label>
        <input id="user-first-name" className="form-content"  name="firstName" autocomplete="on" required />
        <div className="form-border"></div>
        <label for="user-last-name" style={{paddingTop:"13px"}}>
            &nbsp;Last Name
          </label>
        <input id="user-last-name" className="form-content" name="lastName" autocomplete="on" required />
        <div className="form-border"></div>
        <label for="user-phone-number" style={{paddingTop:"13px"}}>
            &nbsp;Phone Number
          </label>
        <input id="user-phone-number" className="form-content"  name="phoneNumber" autocomplete="on" required />
        <div className="form-border"></div>
        <label for="user-password" style={{paddingTop:"22px"}}>&nbsp;Password
          </label>
        <input id="user-password" className="form-content" type="password" name="password" required />
        <div className="form-border"></div>
        <a href="#">
          <legend id="forgot-pass">Forgot password?</legend>
        </a>
        <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
        <a href="#" id="signup" onClick={()=>{setAction({title:'Login'})}}>Don't have account yet?</a>
      </form>
    </div>
  </div>
</div>
      </>
    );
  }
export default LoginPage;