import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Form from '../Components/LoginSignup/Form.jsx';
import Background from '../Components/Background/Background.jsx';
import Navbar from '../Components/Navbar/Navbar.jsx';
import BgData from '../Components/Background/bgData.jsx';
import lawyers2 from '../Components/Assets/lawyers2.png';
import Footer from '../Components/Home/Footer.jsx';


function LandingPage() {
  let textData = [
    { text1: "Welcome to LEGAL FIRST AID", text2: "A place where all your questions get to be answered" },
    { text1: "Do you know it is wrong for a police to take your cell phone?", text2: "Want to know more? Login to continue" },
    { text1: "Are you here to learn about the Cameroon penal code?", text2: "Then wait no more" },
  ];
  const [bgCount, setBgCount] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setBgCount((count) => (count === 2 ? 0 : count + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    setBackgroundImage(lawyers2); // Set the background image for the login form
    setShowLoginForm(true);
  };

  return (
    <>
      {showLoginForm ? (
        <div className="login-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      
        </div>
      ) : (
        <div>
          <Background bgCount={bgCount} />
          <Navbar onLoginClick={handleLoginClick} />
          <BgData bgCount={bgCount} textData={textData[bgCount]} setBgCount={setBgCount} />
        
          <Footer />
        </div>
      )}
    </>
  );
}

export default LandingPage;