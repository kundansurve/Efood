import './App.css';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from "./views/home";
import { Carousel } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;