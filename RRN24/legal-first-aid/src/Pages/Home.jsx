import React, { useState, useEffect } from 'react';
import Header from '../Components/Home/Header.jsx';
import Hero from '../Components/Home/Hero.jsx';
import Features from '../Components/Home/Features.jsx';
import Footer from '../Components/Home/Footer.jsx';
import './Home.css';
import PageLayout from '../Components/PageLayout.jsx';
import LegalQA from '../Components/LegalQA.jsx';
import SidebarFooter from '../Components/SidebarFooter.jsx';
import legalQuestions from '../Components/Data'; // Import existing questions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios

const Home = () => {
  const [questions, setQuestions] = useState(legalQuestions);
  const [userData, setUserData] = useState(null); // Add state for userData
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

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
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleQuestionSubmit = async (questionText) => {
    if (!userData) {
      console.log("User not logged in, cannot submit a question.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", questionText);
      formData.append("description", ""); // Optional description field
      formData.append("is_sensitive", "0");

      const response = await axios.post(
        "https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.message === "Situation created successfully") {
        const newQuestion = {
          id: response.data.data.id,
          title: response.data.data.title,
          description: response.data.data.description,
          created_at: response.data.data.created_at,
          askedBy: userData.name,
          askedByImage: userData.photo,
          responses: [],
        };

        setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]); // Add new question to the top
        console.log("Question submitted successfully:", newQuestion);
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error submitting question:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="home">
      <PageLayout>
        <div className="home-layout">
          {/* Sidebar with sticky positioning */}
          <aside className="sidebar">
            <SidebarFooter
              isLoggedIn={isLoggedIn}
              userData={userData}
              onSubmitQuestion={handleQuestionSubmit}
              onProfileClick={() => navigate("/dashboard")}
            />
          </aside>

          {/* Main Content Area */}
          <main className="feed">
            <div className="merged-content">
              <LegalQA
                questions={questions}
                setQuestions={setQuestions}
                onSubmitQuestion={handleQuestionSubmit}
                userData={userData}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </main>
        </div>
        <Features />
      </PageLayout>
    </div>
  );
};

export default Home;
