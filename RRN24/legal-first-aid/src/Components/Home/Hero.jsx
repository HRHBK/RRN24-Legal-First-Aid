import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Hero.css";

const Hero = ({ onSubmitQuestion }) => {
  const [question, setQuestion] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (userEmail) {
      setIsLoggedIn(true);
      setUserData({ email: userEmail, name: userName });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      console.error("Question is required.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        setShowLoginMessage(true);
        return;
      }

      const formData = new FormData();
      formData.append("title", question);
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
        console.log("Question submitted successfully:", response.data);
        setQuestion("");
        setIsFormVisible(false);
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error submitting question:", error.response ? error.response.data : error);
    }
  };

  const handleAskQuestion = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true); // Show login message if not logged in
      return;
    }
    setShowLoginMessage(false);
    setIsFormVisible(true); // Show the question form if logged in
  };

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Search Form */}
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>

        {/* Hero Section Content */}
        <h1>Welcome to Legal First Aid</h1>
        <p>Get answers to your legal questions from experts.</p>

        {/* Ask a Question Button */}
        <button className="cta-button" onClick={handleAskQuestion}>
          Ask a Question
        </button>

        {/* Show login message if user is not logged in */}
        {showLoginMessage && (
          <p className="login-message">Please sign in to continue.</p>
        )}

        {/* Question Form */}
        {isFormVisible && (
          <form className="question-form" onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Hero;
