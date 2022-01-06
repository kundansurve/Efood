import './App.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from "./views/home";
import { Carousel } from 'react-bootstrap';
import NavbarInstance from './components/navbar.jsx';

function App() {
  return (
    <>
    <NavbarInstance/>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;