import React, { useState, useEffect } from 'react';
import Header from '../Components/Home/Header.jsx';
import Hero from '../Components/Home/Hero.jsx';
import Features from '../Components/Home/Features.jsx';
import FAQ from '../Components/Home/Faq.jsx';
import Footer from '../Components/Home/Footer.jsx';
import './Home.css';
import PageLayout from '../Components/PageLayout.jsx';
import LegalQA from '../Components/LegalQA.jsx';
import legalQuestions from '../Components/Data'; // Import existing questions

const Home = () => {
  const [questions, setQuestions] = useState(legalQuestions);
  const [userData, setUserData] = useState(null); // Add state for userData

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");
    const userMatricule = localStorage.getItem("userMatricule");
    const userPhoto = localStorage.getItem("userPhoto");
    const userId = localStorage.getItem("userId");

    if (userName && userEmail) {
      setUserData({
        name: userName,
        email: userEmail,
        role: userRole,
        matricule: userMatricule,
        photo: userPhoto,
        userId: userId,
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleQuestionSubmit = (questionText) => {
    if (!userData) {
      console.log("User not logged in, cannot submit a question.");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      question: questionText,
      askedBy: userData.name || "Anonymous", // Use userData.name if available
      responses: [],
      timestamp: new Date().toISOString(),
    };

    setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]); // Add new question to the top
    console.log("Submitting question:", newQuestion, "Asked by:", userData.name);
  };

  return (
    <div className="home">
      <PageLayout>
        <Hero onSubmitQuestion={handleQuestionSubmit} userData={userData} />
        <LegalQA questions={questions} setQuestions={setQuestions} onSubmitQuestion={handleQuestionSubmit} userData={userData} />
        <FAQ />
        <Features />
      </PageLayout>
    </div>
  );
};

export default Home;
