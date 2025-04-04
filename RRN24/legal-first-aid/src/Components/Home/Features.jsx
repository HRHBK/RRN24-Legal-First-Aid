import React from 'react';
import './Features.css';
import { FaGavel, FaClock, FaShieldAlt, FaBook, FaUserShield, FaFileAlt } from 'react-icons/fa';

const Features = () => {
    return (
        <div className="features-container">
            <div className="features">
                <div className="feature">
                    <FaGavel className="feature-icon" />
                    <h2>Expert Legal Advice</h2>
                    <p>Receive guidance from experienced legal professionals who are ready to assist you with your legal concerns.</p>
                </div>
                <div className="feature">
                    <FaClock className="feature-icon" />
                    <h2>24/7 Support</h2>
                    <p>Our platform is available around the clock to ensure you get the help you need, whenever you need it.</p>
                </div>
                <div className="feature">
                    <FaShieldAlt className="feature-icon" />
                    <h2>Confidential Assistance</h2>
                    <p>Your privacy is our priority. All your interactions and data are handled with the utmost confidentiality.</p>
                </div>
                <div className="feature">
                    <FaBook className="feature-icon" />
                    <h2>Cameroon Penal Code</h2>
                    <p>Access a simplified and comprehensive breakdown of the Cameroon Penal Code to better understand your rights.</p>
                </div>
                <div className="feature">
                    <FaUserShield className="feature-icon" />
                    <h2>Know Your Rights</h2>
                    <p>Empower yourself with knowledge about your legal rights and how to protect them in various situations.</p>
                </div>
                <div className="feature">
                    <FaFileAlt className="feature-icon" />
                    <h2>Legal Document Templates</h2>
                    <p>Download templates for common legal documents, such as contracts and agreements, to simplify your legal processes.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;