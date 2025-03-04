import React, { useState } from 'react';
import Header from '../Components/Home/Header.jsx';
import Hero from '../Components/Home/Hero.jsx';
import Features from '../Components/Home/Features.jsx';
import FAQ from '../Components/Home/Faq.jsx';
import Footer from '../Components/Home/Footer.jsx';
import './Home.css';
import PageLayout from '../Components/PageLayout.jsx';


const Home = () => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionSubmit = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    
    <div className="home">
      <PageLayout>
    
      <Hero onSubmitQuestion={handleQuestionSubmit} />
      <Features />
      <FAQ />
      <section className="submitted-questions">
        <h2>Submitted Questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </section>
      </PageLayout>
    </div>
  );
};

export default Home;