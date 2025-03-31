import React, { useState, useEffect } from 'react';
import PageLayout from '../Components/PageLayout';
import './Question_Answers.css';
import axios from 'axios';

const Question_Answers = () => {
  const [situations, setSituations] = useState([]);

  useEffect(() => {
    fetchSituations();
  }, []);

  const fetchSituations = async () => {
    try {
      const response = await axios.get(
        "https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations"
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        setSituations(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setSituations([]);
      }
    } catch (error) {
      console.error("Error fetching situations:", error);
      setSituations([]);
    }
  };

  return (
    <PageLayout>
      <h1>Situations and Suggestions</h1>
      <div className="questions-container">
        {situations.map(({ id, title, description, created_at }) => (
          <div key={id} className="question-card">
            <h2 className="question-title">{title}</h2>
            <p className="question-description">{description}</p>
            <p className="question-author">Posted on: {new Date(created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Question_Answers;