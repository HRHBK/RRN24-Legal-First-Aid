import React, { useState, useEffect } from "react";
import legalQuestions from "./Data"; // Importing questions from the database
import "./LegalQA.css"; // Import the CSS file

const LegalQA = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [answers, setAnswers] = useState(legalQuestions);
  const [newAnswer, setNewAnswer] = useState("");
  const [selectedLawType, setSelectedLawType] = useState("Common Law");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const toggleAnswers = (id) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const submitAnswer = (questionId) => {
    if (!newAnswer.trim() || !isLoggedIn) return;
    
    const updatedQuestions = answers.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          responses: [
            ...q.responses,
            {
              id: q.responses.length + 1,
              answer: newAnswer,
              answeredBy: userEmail || "Anonymous",
              lawType: selectedLawType,
            },
          ],
        };
      }
      return q;
    });

    setAnswers(updatedQuestions);
    setNewAnswer("");
  };

  const deleteQuestion = (questionId) => {
    if (!isLoggedIn) return;
    setAnswers((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
  };

  const deleteAnswer = (questionId, answerId) => {
    if (!isLoggedIn) return;
    setAnswers((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, responses: q.responses.filter((res) => res.id !== answerId) } : q
      )
    );
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
          {isLoggedIn && <button className="delete-button" onClick={() => deleteQuestion(id)}>Delete Question</button>}

          {visibleAnswers[id] && (
            <div className="answer-box">
              {responses.map(({ id: answerId, answer, answeredBy, lawType }) => (
                <div key={answerId}>
                  <p className="answer-text">{answer}</p>
                  <p className="answered-by">
                    <strong>Answered by:</strong> {answeredBy} | <strong>Law Type:</strong> {lawType}
                  </p>
                  {isLoggedIn && <button className="delete-button" onClick={() => deleteAnswer(id, answerId)}>Delete Answer</button>}
                </div>
              ))}

              {isLoggedIn && (
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
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LegalQA;
