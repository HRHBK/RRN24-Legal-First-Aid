import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>How can I ask a question?</h3>
        <p>Simply click on the "Ask a Question" button and fill out the form.</p>
      </div>
      <div className="faq-item">
        <h3>Is my information confidential?</h3>
        <p>Yes, your privacy is our priority.</p>
      </div>
      <div className="faq-item">
        <h3>What kind of legal questions can I ask?</h3>
        <p>You can ask any legal questions related to the Cameroon Penal Code and your rights.</p>
      </div>
      <div className="faq-item">
        <h3>How long does it take to get a response?</h3>
        <p>Our experts typically respond within 24 hours.</p>
      </div>
      <div className="faq-item">
        <h3>Are the consultations free?</h3>
        <p>Yes, asking questions and getting initial advice is free. However, detailed consultations may have a fee.</p>
      </div>
    </section>
  );
};

export default FAQ;