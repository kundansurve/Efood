import React, { useState } from 'react';
import { Navbar,
    Nav,
    Form,
    Modal,
    Button,
    FormControl
    } from 'react-bootstrap';
import LoginPage from './login';

function RegisterPage(props) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Nav.Link style={{color:props.color}} onClick={handleShow}>
        {props.title}
        </Nav.Link>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />

  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Name" />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="text" placeholder="Phone Number" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group>
  <Form.Text style={{color:"var(--error)",marginTop:"1em",marginBottom:"1em",justifyContent:"center",display:"flex"}}>
    Error
    </Form.Text>
    </Form.Group>
  <Button type="submit" style={{backgroundColor:"var(--color2)",border:"none",width:"100%"}}>
    Submit
  </Button>
</Form>

          </Modal.Body>
          <Modal.Footer>
            <LoginPage title={"Already have an Account?"} color={"color3"}/>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default RegisterPage;