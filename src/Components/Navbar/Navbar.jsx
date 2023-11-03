import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
