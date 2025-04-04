import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Navbar from "../Components/Navbar/Navbar.jsx";
import Background from "../Components/Background/Background.jsx";
import BgData from "../Components/Background/bgData.jsx";
import Features from "../Components/Home/Features.jsx";
import Footer from "../Components/Home/Footer.jsx";
import FAQ from "../Components/Home/Faq.jsx";
import LandingPageHero from "../Components/LandingPageHero.jsx";

const LandingPage = () => {
  const [bgCount, setBgCount] = useState(0);
  const navigate = useNavigate();

  const textData = [
    { text1: "Welcome to LEGAL FIRST AID", text2: "Your trusted legal companion" },
    { text1: "Empowering Justice", text2: "For individuals and lawyers alike" },
    { text1: "Learn, Ask, and Connect", text2: "Join our legal community today" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgCount((count) => (count === 2 ? 0 : count + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <Background bgCount={bgCount} />
      <div className="overlay"></div>
      <BgData bgCount={bgCount} textData={textData[bgCount]} setBgCount={setBgCount} />

      {/* Hero Section */}
      <LandingPageHero />

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At <strong>Legal First Aid</strong>, we believe that legal knowledge is a right, not a privilege. Our platform is designed to bridge the gap between individuals and legal experts, empowering everyone with the tools and resources they need to navigate legal challenges.
        </p>
        <div className="about-highlights">
          <div className="highlight-card">
            <h3>🌟 Our Mission</h3>
            <p>
              To make legal knowledge accessible, clear, and actionable for everyone, regardless of their background or circumstances.
            </p>
          </div>
          <div className="highlight-card">
            <h3>🤝 Our Vision</h3>
            <p>
              A world where everyone has the confidence and resources to stand up for their rights and seek justice.
            </p>
          </div>
          <div className="highlight-card">
            <h3>💡 Why Choose Us?</h3>
            <p>
              We provide expert advice, educational resources, and a supportive community to help you navigate legal complexities with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2>Our Features</h2>
        <Features />
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <p>"Legal First Aid helped me understand my rights and take action. Highly recommended!"</p>
            <h4>- Jane Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"The platform is easy to use, and the legal experts are very knowledgeable."</p>
            <h4>- John Smith</h4>
          </div>
          <div className="testimonial-card">
            <p>"I was able to resolve my legal issue quickly thanks to Legal First Aid."</p>
            <h4>- Mary Johnson</h4>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <FAQ />
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our community today and take control of your legal journey.</p>
        <button className="cta-button" onClick={() => navigate("/login")}>
          Sign Up Now
        </button>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <h2>Our Sponsors</h2>
        <div className="sponsors-logos">
          <img src="src/Components/Assets/mine.jpg" alt="Sponsor 1" />
          <img src="src/Components/Assets/mine.jpg" alt="Sponsor 2" />
          <img src="src/Components/Assets/mine.jpg" alt="Sponsor 3" />
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="src/Components/Assets/mine.jpg" alt="Team Member 1" />
            <h3>C Bakia</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="src/Components/Assets/mine.jpg" alt="Team Member 2" />
            <h3>Bakia C</h3>
            <p>Legal Advisor</p>
          </div>
          <div className="team-member">
            <img src="src/Components/Assets/mine.jpg" alt="Team Member 3" />
            <h3>Chief B</h3>
            <p>Community Manager</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;