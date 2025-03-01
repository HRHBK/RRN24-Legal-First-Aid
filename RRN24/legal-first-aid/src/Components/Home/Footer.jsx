import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to='/about' >
                  About-Us
          </Link>
          <Link to='/privacypolicy' >
                 Privacy Policy
          </Link>
          <Link to='/termsofservice' >
                  Terms of Service
          </Link>
          <Link to='/contact' >
                  Contact
          </Link>
        </div>
        <div className="footer-contact">
          <p>Email: support@legalfirstaid.com</p>
          <p>Phone: +237 679 406 003</p>
        </div>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <p>&copy; 2025 Legal First Aid. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;