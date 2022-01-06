import './CSS files/inputbar.css';
import './someadditional.js';


function InputBar(props){

     return(
        <div class="wrapper">
        <div class="search_box">
            <div class="dropdown">
                <div class="default_option" onClick={function(){
    document.querySelector(".dropdown ul").classList.add("active");}}>All</div>  
                <ul>
                  <li>All</li>
                  <li>Recent</li>
                  <li>Popular</li>
                </ul>
            </div>
            <div class="search_field">
              <input type="text" class="input" placeholder="Search"/>
              <i class="fas fa-search"></i>
          </div>
        </div>
    </div>
     );
 }