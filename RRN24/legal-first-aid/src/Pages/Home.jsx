import React, { useState, useEffect } from 'react';
import Header from '../Components/Home/Header.jsx';
import Hero from '../Components/Home/Hero.jsx';
import Features from '../Components/Home/Features.jsx';
import Footer from '../Components/Home/Footer.jsx';
import './Home.css';
import PageLayout from '../Components/PageLayout.jsx';
import LegalQA from '../Components/LegalQA.jsx';
import SidebarFooter from '../Components/SidebarFooter.jsx';
import legalQuestions from '../Components/Data';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [questions, setQuestions] = useState(legalQuestions);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Automatically detect if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);

      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");
      const userRole = localStorage.getItem("userRole");
      const userMatricule = localStorage.getItem("userMatricule");
      const userPhoto = localStorage.getItem("userPhoto");
      const userId = localStorage.getItem("userId");

      setUserData({
        name: userName,
        email: userEmail,
        role: userRole,
        matricule: userMatricule,
        photo: userPhoto,
        userId: userId,
      });
    }
  }, []);

  const handleQuestionSubmit = async (questionText) => {
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login.");
      navigate("/home");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token missing. Redirecting to login.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", questionText);
      formData.append("description", "");
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
          askedBy: userData?.name || "Anonymous",
          askedByImage: userData?.photo || "",
          responses: [],
        };

        setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
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
          <aside className="sidebar">
            <SidebarFooter
              isLoggedIn={isLoggedIn}
              userData={userData}
              onSubmitQuestion={handleQuestionSubmit}
              onProfileClick={() => navigate("/dashboard")}
            />
          </aside>

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
        <div></div>
      </PageLayout>
    </div>
  );
};

export default Home;
