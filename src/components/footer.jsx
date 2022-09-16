import React,{Component} from 'react';
import { Navbar,
    Nav,
    Container,
    } from 'react-bootstrap';

import LoginPage from './login';
import './CSS files/footer.css';

class Footer extends Component {
    
  render(){
      return (
        <footer className="footer-section">
        <div className="container">
            <div className="footer-cta pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="cta-text">
                                <h4>Find us</h4>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="fas fa-phone"></i>
                            <div className="cta-text">
                                <h4>Call us</h4>
                                <span>+91 8623046619</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="far fa-envelope-open"></i>
                            <div className="cta-text">
                                <h4>Mail us</h4>
                                <span>Foodie@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-content pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-50">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <a href="#"><h1 style={{color:"white",textDecoration:"none"}}>Foodie</h1></a>
                            </div>
                            <div className="footer-text">
                            </div>
                            <div className="footer-social-icon">
                                <span>Follow us</span>
                                <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                                <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-30" style={{float:"right"}}>
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">services</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact us</a></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                <div className="row" style={{color:"white",textAlign:"center",justifyContent:"center"}}>
                    Made by Kundan Surve and Dipam Patle
                </div>
            </div>
        </div>
    </footer>
      );
      }
  }
  export default Footer;