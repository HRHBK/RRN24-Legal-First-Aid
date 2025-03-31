import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LegalQA.css";

const LegalQA = ({ isLoggedIn, userData }) => {
  const navigate = useNavigate();
  const [situations, setSituations] = useState([]);
  const [visibleSuggestions, setVisibleSuggestions] = useState({});
  const [situationData, setSituationData] = useState({ title: "", description: "" });
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [suggestion, setSuggestion] = useState(null);

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

  const fetchSuggestionById = async (id) => {
    try {
      const response = await axios.get(
        `https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data.success) {
        setSuggestion(response.data.data);
        console.log("Fetched suggestion:", response.data.data);
      } else {
        console.error("Failed to fetch suggestion:", response.data);
      }
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  };

  const postSituation = async () => {
    if (!situationData.title.trim() || !situationData.description.trim()) {
      setErrorMessage("Title and description are required.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", situationData.title);
      formData.append("description", situationData.description);

      const response = await axios.post(
        "https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("Situation successfully posted:", response.data.data);
        setSituations((prevSituations) => [response.data.data, ...prevSituations]); // Add the new situation to the top
        setSituationData({ title: "", description: "" });
        setShowForm(false);
        setErrorMessage("");
      } else {
        console.error("Failed to post situation:", response.data.message);
        setErrorMessage("Failed to post situation. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        localStorage.clear(); // Clear invalid token
        navigate("/login");
      } else {
        console.error("Error posting situation:", error);
        setErrorMessage("Failed to post situation. Please try again.");
      }
    }
  };

  const toggleSuggestions = (id) => {
    setVisibleSuggestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskSituation = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="container">
      <h1>Legal Situations</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="post-box">
        {!showForm ? (
          <input
            type="text"
            className="textarea"
            placeholder="Get Suggestions"
            onFocus={handleAskSituation}
          />
        ) : (
          <div className="question-form">
            <input
              type="text"
              className="textarea"
              value={situationData.title}
              onChange={(e) =>
                setSituationData({ ...situationData, title: e.target.value })
              }
              placeholder="Enter situation title..."
            />
            <textarea
              className="textarea"
              value={situationData.description}
              onChange={(e) =>
                setSituationData({ ...situationData, description: e.target.value })
              }
              placeholder="Enter situation description..."
            />
            <button className="submit-btn" onClick={postSituation}>
              Submit Situation
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setSituationData({ title: "", description: "" });
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <button
        className="fetch-suggestion-btn"
        onClick={() => fetchSuggestionById(2)} // Example: Fetch suggestion with ID 2
      >
        Fetch Suggestion
      </button>

      {suggestion && (
        <div className="suggestion-box">
          <h2>{suggestion.title}</h2>
          <p>{suggestion.description}</p>
          {suggestion.image && <img src={suggestion.image} alt="Suggestion" />}
          <p>Created At: {new Date(suggestion.created_at).toLocaleString()}</p>
        </div>
      )}

      {situations.map(({ id, title, description, created_at }) => (
        <div key={id} className="post-container">
          <div className="post-header">
            <div className="avatar">{title.charAt(0)}</div>
            <div className="user-info">
              <h3>{title}</h3>
              <p>Posted on: {new Date(created_at).toLocaleString()}</p>
            </div>
          </div>
          <p className="post-content">{description}</p>
          <button className="toggle-btn" onClick={() => toggleSuggestions(id)}>
            {visibleSuggestions[id] ? "Hide Suggestions" : "Show Suggestions"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LegalQA;
