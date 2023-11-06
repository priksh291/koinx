import React, { useState } from "react";
import "./Navbar.css";
import {BiMenu} from 'react-icons/bi';
import {RxCross1} from 'react-icons/rx'

import logo from "../../assets/logo.png";


const Navbar = () => {
  const[menuvisible, setMenuVisible] = useState(false);

  const toggleback = ()=>{
    setMenuVisible(!menuvisible)
  }
  return (
    <div>
      <div className="nav">
        <div className="navbar">
          <div>
            <img src={logo} alt="/" />
          </div>
          <div className="menubar">
            <div className="menuitems">
              <ul>
                <li>Features</li>
                <li>Exchanges</li>
                <li>How it Works?</li>
                <li>Blog</li>
                <li>About us</li>
                <li>
                  <div className="signin">
                    <button>Sign In</button>
                  </div>
                </li>

              </ul>
            </div>
          </div>
          <div className="bimenu" onClick={toggleback}>{menuvisible? <RxCross1/> : <BiMenu/>}</div>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
