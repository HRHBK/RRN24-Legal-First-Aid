import React, { useState } from 'react';
import './Hero.css';

const Hero = ({ onSubmitQuestion }) => {
  const [question, setQuestion] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmitQuestion(question);
      setQuestion('');
      setIsFormVisible(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Legal First Aid</h1>
        <p>Get answers to your legal questions from experts.</p>
        <button className="cta-button" onClick={() => setIsFormVisible(true)}>Ask a Question</button>
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