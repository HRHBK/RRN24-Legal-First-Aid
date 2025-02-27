import React from 'react';
import './Features.css';
import { FaGavel, FaClock, FaShieldAlt, FaBook, FaUserShield, FaFileAlt, FaLaptop, FaMoneyBillWave, FaComments, FaLightbulb, FaBookOpen, FaTools } from 'react-icons/fa';

const Features = () => {
    return (
        <div className="features-container">
            <div className="features">
                <div className="feature">
                    <FaGavel className="feature-icon" />
                    <h2>Expert Advice</h2>
                    <p>Get answers from legal experts with years of experience in the field.</p>
                </div>
                <div className="feature">
                    <FaClock className="feature-icon" />
                    <h2>24/7 Support</h2>
                    <p>We are here to help you anytime, day or night, with your legal questions.</p>
                </div>
                <div className="feature">
                    <FaShieldAlt className="feature-icon" />
                    <h2>Confidential</h2>
                    <p>Your privacy is our priority. All your information is kept confidential.</p>
                </div>
                <div className="feature">
                    <FaBook className="feature-icon" />
                    <h2>Cameroon Penal Code</h2>
                    <p>Access detailed information about the Cameroon Penal Code.</p>
                </div>
                <div className="feature">
                    <FaUserShield className="feature-icon" />
                    <h2>Know Your Rights</h2>
                    <p>Learn about your rights and how to protect them.</p>
                </div>
                <div className="feature">
                    <FaFileAlt className="feature-icon" />
                    <h2>Legal Documents</h2>
                    <p>Get templates and guides for common legal documents.</p>
                </div>
                <div className="feature">
                    <FaLaptop className="feature-icon" />
                    <h2>Online Consultations</h2>
                    <p>Schedule online consultations with legal experts.</p>
                </div>
                <div className="feature">
                    <FaMoneyBillWave className="feature-icon" />
                    <h2>Affordable Services</h2>
                    <p>Access affordable legal services and advice.</p>
                </div>
                <div className="feature">
                    <FaComments className="feature-icon" />
                    <h2>Community Support</h2>
                    <p>Join a community of users and share your experiences.</p>
                </div>
                <div className="feature">
                    <FaLightbulb className="feature-icon" />
                    <h2>Educational Resources</h2>
                    <p>Access a wealth of educational resources and articles.</p>
                </div>
                <div className="feature">
                    <FaBookOpen className="feature-icon" />
                    <h2>Case Studies</h2>
                    <p>Learn from real-life case studies and legal scenarios.</p>
                </div>
                <div className="feature">
                    <FaTools className="feature-icon" />
                    <h2>Legal Tools</h2>
                    <p>Utilize tools to help you navigate legal processes.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;