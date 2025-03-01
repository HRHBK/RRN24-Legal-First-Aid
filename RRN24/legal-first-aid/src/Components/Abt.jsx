import React from "react";
import "./Abt.css";

const Abt = () => {
  return (
    <div className="about-container">
      {/* Inspirational Section */}
      <div className="about-intro">
        <h1>Legal First Aid: Your Guide to Justice and Empowerment</h1>
        <p>
          Injustice often thrives in ignorance. Many people find themselves lost in legal battles, unaware of their rights or the steps they should take.  
          <strong>Legal First Aid</strong> was created to change that narrative.  
        </p>
        <p>
          Our mission is simple but powerful:  
          <span className="highlight"> Make legal knowledge accessible, clear, and empowering for everyone.</span>  
          Whether you're facing an unfair situation or simply want to understand your rights, we're here to guide you.
        </p>
      </div>

      {/* Header Section */}
      <div className="about-header">
        <h1>Know Your Rights, Protect Your Future</h1>
        <p>Legal knowledge empowers citizens to stand against injustice. Legal First Aid makes it easy.</p>
      </div>

      {/* Importance of Knowing Your Rights */}
      <div className="about-section">
        <h2>Why Is It Important to Know Your Rights?</h2>
        <div className="about-content">
          <div className="about-card">
            <h3>🛡 Protection from Injustice</h3>
            <p>Understanding your rights helps you recognize when they are being violated and take the necessary steps to seek justice.</p>
          </div>
          <div className="about-card">
            <h3>⚖ Equal Treatment Under the Law</h3>
            <p>Knowing your rights ensures that you can confidently engage with the legal system and demand fair treatment.</p>
          </div>
          <div className="about-card">
            <h3>📢 Stand Up Against Corruption</h3>
            <p>Being legally aware reduces the risk of exploitation by individuals who take advantage of ignorance of the law.</p>
          </div>
        </div>
      </div>

      {/* How Legal First Aid Helps */}
      <div className="about-section">
        <h2>How Legal First Aid Supports You</h2>
        <div className="about-content">
          <div className="about-card">
            <h3>📖 Easy-to-Understand Legal Information</h3>
            <p>We simplify complex legal terms and break down the Cameroon Penal Code into clear, accessible language.</p>
          </div>
          <div className="about-card">
            <h3>❓ Ask Questions, Get Answers</h3>
            <p>Our Q&A section connects you with experienced lawyers who provide guidance on legal matters.</p>
          </div>
          <div className="about-card">
            <h3>👨‍⚖️ Connect with Legal Experts</h3>
            <p>Need further help? We link you to professional legal practitioners who can provide additional assistance.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-cta">
        <h2>Empower Yourself Today</h2>
        <p>Stay informed, ask questions, and take control of your legal rights. Start your journey with Legal First Aid.</p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  );
};

export default Abt;
