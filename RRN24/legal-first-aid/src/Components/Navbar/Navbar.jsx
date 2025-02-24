import React from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        Legal First Aid
      </div>
      <ul className="nav-menu">
        <li onClick={onLoginClick}><a>Home</a></li>
        <li onClick={onLoginClick}><a>About</a></li>
        <li onClick={onLoginClick}><a>Contact</a></li>
        <li className="nav-login" onClick={onLoginClick}>Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;