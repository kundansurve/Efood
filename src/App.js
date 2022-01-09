import './App.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from "./views/home";
import Hotel from "./views/hotel";
import NavbarInstance from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Cart from './views/cart';

function App() {
  return (
    <>
    <NavbarInstance/>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/hotel/:hotelName" element={<Hotel/>}/>
      <Route exact path="/mycart" element={<Cart/>}/>
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;