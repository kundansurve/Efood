import './CSS files/inputbar.css';
import './someadditional.js';


function InputBar(props){

     return(
        <div className="wrapper">
        <div className="search_box">
            <div className="dropdown">
                <div className="default_option" onClick={function(){
    document.querySelector(".dropdown ul").classList.add("active");}}>All</div>  
                <ul>
                  <li>All</li>
                  <li>Recent</li>
                  <li>Popular</li>
                </ul>
            </div>
            <div className="search_field">
              <input type="text" className="input" placeholder="Search"/>
              <i className="fas fa-search"></i>
          </div>
        </div>
    </div>
     );
 }