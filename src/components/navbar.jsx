import React,{Component} from 'react';
import { Navbar,
    Nav,
    Container,
    } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';
import LoginPage from './login';
import RegisterPage from './signUp.jsx';

class NavbarInstance extends Component {
    
  render(){
      return (
        <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"var(--color1)",color:"var(--color3)"}}>
  <Container>
  <Navbar.Brand href="#home" style={{color:"var(--color3)"}}>Foddie</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto" >
    </Nav>
    <Nav >
      <LoginPage title={"Login"} color={"white"}/>
      <LoginPage  title={"Sign Up"} color={"white"}/>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
      );
      }
  }
  export default NavbarInstance;