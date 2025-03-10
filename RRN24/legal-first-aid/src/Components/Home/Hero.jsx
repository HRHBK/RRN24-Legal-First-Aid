import React, { useState, useEffect } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmitQuestion(question, userData?.name || "Anonymous");
      setQuestion("");
      setIsFormVisible(false);
    }
  };

  const handleAskQuestion = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      return;
    }
    setShowLoginMessage(false);
    setIsFormVisible(true);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
        <h1>Welcome to Legal First Aid</h1>
        <p>Get answers to your legal questions from experts.</p>

        <button className="cta-button" onClick={handleAskQuestion}>
          Ask a Question
        </button>

        {showLoginMessage && (
          <p className="login-message">Please sign in to continue.</p>
        )}

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
