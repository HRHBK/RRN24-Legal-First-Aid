import React, { useState } from "react";
import legalQuestions from "./Data"; // Importing questions from the database
import "./LegalQA.css"; // Import the CSS file

const LegalQA = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [answers, setAnswers] = useState(legalQuestions);
  const [newAnswer, setNewAnswer] = useState("");
  const [selectedLawType, setSelectedLawType] = useState("Common Law");

  // Toggle visibility of answers
  const toggleAnswers = (id) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle new answer submission
  const submitAnswer = (questionId) => {
    if (!newAnswer.trim()) return;
    
    const updatedQuestions = answers.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          responses: [
            ...q.responses,
            {
              id: q.responses.length + 1,
              answer: newAnswer,
              answeredBy: "Anonymous",
              lawType: selectedLawType
            }
          ]
        };
      }
      return q;
    });

    setAnswers(updatedQuestions);
    setNewAnswer(""); // Clear input after submission
  };

  return (
    <div className="container">
      <h1>Legal Q&A</h1>
      {answers.map(({ id, question, askedBy, responses }) => (
        <div key={id} className="question-box">
          <h2 className="question-title">{question}</h2>
          <p className="asked-by">Asked by: {askedBy}</p>
          <button className="button" onClick={() => toggleAnswers(id)}>
            {visibleAnswers[id] ? "Hide Answers" : "Show Answers"}
          </button>

          {visibleAnswers[id] && (
            <div className="answer-box">
              {responses.map(({ id, answer, answeredBy, lawType }) => (
                <div key={id}>
                  <p className="answer-text">{answer}</p>
                  <p className="answered-by">
                    <strong>Answered by:</strong> {answeredBy} | <strong>Law Type:</strong> {lawType}
                  </p>
                </div>
              ))}

              {/* Answer Input Section */}
              <div className="mt-4">
                <textarea
                  className="textarea"
                  placeholder="Write your answer..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
                <select
                  className="select"
                  value={selectedLawType}
                  onChange={(e) => setSelectedLawType(e.target.value)}
                >
                  <option value="Common Law">Common Law</option>
                  <option value="Civil Law">Civil Law</option>
                </select>
                <button className="submit-button" onClick={() => submitAnswer(id)}>
                  Submit Answer
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LegalQA;
