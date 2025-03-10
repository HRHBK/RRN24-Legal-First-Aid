import React, { useState, useEffect } from "react";
import "./LegalQA.css";

const LegalQA = ({ questions, setQuestions, isLoggedIn, userData, onSubmitQuestion }) => {
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [newAnswers, setNewAnswers] = useState({});
  const [selectedLawTypes, setSelectedLawTypes] = useState({});
  const [newQuestion, setNewQuestion] = useState("");
  const [triggerRender, setTriggerRender] = useState(0);

  useEffect(() => {
    setTriggerRender(prev => prev + 1); // Trigger re-render when login state changes
  }, [userData, isLoggedIn]);

  const toggleAnswers = (id) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnswerChange = (questionId, value) => {
    setNewAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleLawTypeChange = (questionId, value) => {
    setSelectedLawTypes((prev) => ({ ...prev, [questionId]: value }));
  };

  const submitAnswer = (questionId) => {
    if (!newAnswers[questionId]?.trim()) return;

    const newAnswerObj = {
      id: Date.now(),
      answer: newAnswers[questionId],
      answeredBy: userData?.name || "Anonymous",
      lawType: selectedLawTypes[questionId] || "Common Law",
    };

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, responses: [...q.responses, newAnswerObj] } : q
      )
    );
    setNewAnswers((prev) => ({ ...prev, [questionId]: "" }));
  };

  const deleteQuestion = (questionId) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
  };

  const deleteAnswer = (questionId, answerId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, responses: q.responses.filter((r) => r.id !== answerId) }
          : q
      )
    );
  };

  const editAnswer = (questionId, answerId) => {
    const newAnswerText = prompt("Edit your answer: ");
    if (newAnswerText) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                responses: q.responses.map((r) =>
                  r.id === answerId ? { ...r, answer: newAnswerText } : r
                ),
              }
            : q
        )
      );
    }
  };

  const editQuestion = (questionId) => {
    const newQuestionText = prompt("Edit your question: ");
    if (newQuestionText) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, question: newQuestionText } : q
        )
      );
    }
  };

  return (
    <div className="container" key={triggerRender}>
      <h1>Legal Q&A</h1>
      {isLoggedIn && (
        <div className="question-input">
          <textarea
            className="textarea"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a legal question..."
          />
          <button 
            className="submit-button" 
            onClick={() => {
              if (newQuestion.trim()) {
                onSubmitQuestion(newQuestion, userData?.name || "Anonymous");
                setNewQuestion("");
              }
            }}
          >
            Submit Question
          </button>
        </div>
      )}

      {questions.map(({ id, question, askedBy, responses }) => (
        <div key={id} className="question-box">
          <h2 className="question-title">{question}</h2>
          <p className="asked-by">Asked by: {askedBy || "Anonymous"}</p>

          {isLoggedIn && userData?.name === askedBy && (
            <div className="action-buttons">
              <button onClick={() => editQuestion(id)}>Edit Question</button>
              <button onClick={() => deleteQuestion(id)}>Delete Question</button>
            </div>
          )}

          <button className="button" onClick={() => toggleAnswers(id)}>
            {visibleAnswers[id] ? "Hide Answers" : "Show Answers"}
          </button>

          {visibleAnswers[id] && (
            <>
              <div className="answer-section">
                {responses.map(({ id: answerId, answer, answeredBy, lawType }) => (
                  <div key={answerId} className="answer-box">
                    <p className="answer-text">{answer}</p>
                    <p className="answered-by">
                      <strong>Answered by:</strong> {answeredBy || "Anonymous"} | <strong>Law Type:</strong>{" "}
                      <span className={lawType === "Common Law" ? "common-law" : "civil-law"}>
                        {lawType}
                      </span>
                    </p>

                    {isLoggedIn && userData?.role === "lawyer" && (
                      <div className="action-buttons">
                        <button onClick={() => editAnswer(id, answerId)}>Edit Answer</button>
                        <button onClick={() => deleteAnswer(id, answerId)}>Delete Answer</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {isLoggedIn && userData?.role === "lawyer" && (
                <div className="answer-input">
                  <textarea
                    className="textarea"
                    value={newAnswers[id] || ""}
                    onChange={(e) => handleAnswerChange(id, e.target.value)}
                    placeholder="Write your answer here..."
                  />
                  <select
                    className="select"
                    value={selectedLawTypes[id] || "Common Law"}
                    onChange={(e) => handleLawTypeChange(id, e.target.value)}
                  >
                    <option value="Common Law">Common Law</option>
                    <option value="Civil Law">Civil Law</option>
                  </select>
                  <button className="submit-button" onClick={() => submitAnswer(id)}>
                    Submit Answer
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default LegalQA;
