import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to='/' >
        Legal First Aid
        </Link>
      </div>
      <div className="nav-menu">
        <div>
          <Link to="/home">
            Home
          </Link>
        </div>
        <div>
          <Link to="/q&a">
            Q&A
          </Link>
        </div>
        <div>
          <Link to="/contact">
            Contact
          </Link>
        </div>
        <div>
          <Link to="/about">
            About
          </Link>
        </div>
        <button className="nav-login">
          <Link to="/login">
            Login
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;