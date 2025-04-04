import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LegalQA.css";

const LegalQA = ({ isLoggedIn, userData }) => {
  const navigate = useNavigate();
  const [situations, setSituations] = useState([]);
  const [visibleSuggestions, setVisibleSuggestions] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [situationData, setSituationData] = useState({
    title: "",
    description: "",
    is_sensitive: false,
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSituations();
  }, []);

  const fetchSituations = async () => {
    try {
      const response = await axios.get(
        "https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations"
      );
      console.log("Fetched Situations:", response.data);

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

  const handleAskSituation = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowForm(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setSituationData({ ...situationData, image: files[0] });
    } else {
      setSituationData({ ...situationData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!situationData.title.trim() || !situationData.description.trim()) {
      setErrorMessage("Title and description are required.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        setErrorMessage("Authentication token missing. Please log in again.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", situationData.title);
      formData.append("description", situationData.description);
      formData.append("is_sensitive", situationData.is_sensitive ? "1" : "0");
      if (situationData.image) {
        formData.append("image", situationData.image);
      }

      const response = await axios.post(
        "https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.message === "Situation created successfully") {
        const newSituation = {
          ...response.data.data,
          askedBy: userData.name,
          askedByImage: userData.photo,
        };
        setSituations((prevSituations) => [newSituation, ...prevSituations]);
        setSituationData({ title: "", description: "", is_sensitive: false, image: null });
        setShowForm(false);
        setErrorMessage("");
      } else {
        console.error("Unexpected response:", response.data);
        setErrorMessage("Failed to post situation. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthenticated:", error.response.data);
        setErrorMessage("Session expired. Please log in again.");
        navigate("/");
      } else {
        console.error("Error posting situation:", error);
        setErrorMessage("Failed to post situation. Please try again.");
      }
    }
  };

  const handleSuggestionSubmit = async (situationId, suggestionData) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("answer", suggestionData.answer);
      formData.append("law_type", suggestionData.lawType === "Common Law" ? "common_law" : "civil_law");

      console.log("Submitting suggestion for situationId:", situationId);
      const response = await axios.post(
        `https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations/${situationId}/suggestions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Suggestion submitted successfully:", response.data);
        fetchSituations(); // Refresh situations to include the new suggestion
      } else {
        console.error("Unexpected response:", response.data);
        setErrorMessage(response.data.message || "Failed to submit suggestion.");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error.response ? error.response.data : error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while submitting the suggestion."
      );
    }
  };

  const handleDelete = async (situationId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await axios.delete(
        `https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations/${situationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Situation deleted successfully:", response.data);
        setSituations((prevSituations) =>
          prevSituations.filter((situation) => situation.id !== situationId)
        );
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error deleting situation:", error.response ? error.response.data : error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className="container">
      <h1>Legal Situations</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="post-box">
        <input
          type="text"
          className="textarea"
          placeholder="Get Suggestions"
          onClick={handleAskSituation}
        />
      </div>

      {situations.map(({ id, title, description, created_at, askedBy, askedByImage, image, responses, user_id }) => (
        <div key={id} className="post-container">
          <div className="post-header">
            <div className="avatar">
              {askedByImage ? (
                <img src={askedByImage} className="avatar-image" alt="User Avatar" />
              ) : (
                <span>{askedBy ? getInitials(askedBy) : "?"}</span>
              )}
            </div>
            <div className="user-info">
              <h3>{askedBy || "Anonymous"}</h3>
              <p>Posted on: {new Date(created_at).toLocaleString()}</p>
            </div>
          </div>
          <div className="post-body">
            <h4 className="post-title">{title}</h4>
            <p className="post-content">{description}</p>
            {image && <img src={image} className="post-image" alt="Post" />}
          </div>
          <div className="post-footer">
            <button
              className="toggle-btn"
              onClick={() => setVisibleSuggestions((prev) => ({ ...prev, [id]: !prev[id] }))}
            >
              {visibleSuggestions[id] ? "Hide Suggestions" : "Show Suggestions"}
            </button>
            <p className="response-count">{Array.isArray(responses) ? responses.length : 0} Responses</p>
            {isLoggedIn && userData?.userId === user_id && (
              <button className="delete-btn" onClick={() => handleDelete(id)}>
                Delete
              </button>
            )}
          </div>
          {visibleSuggestions[id] && (
            <div className="suggestion-box">
              {Array.isArray(responses) && responses.length > 0 ? (
                responses.map((response, index) => (
                  <div key={index} className="response">
                    <p>{response.answer}</p>
                    <p className="response-meta">
                      - {response.answeredBy} ({response.lawType})
                    </p>
                    {isLoggedIn && response.user_id === userData?.userId && (
                      <button className="delete-btn" onClick={() => handleDelete(response.id)}>
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No responses yet.</p>
              )}
              {isLoggedIn && userData?.role === "lawyer" && (
                <form
                  className="suggestion-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const answer = e.target.elements.answer.value;
                    const lawType = e.target.elements.lawType.value;
                    handleSuggestionSubmit(id, { answer, lawType });
                    e.target.reset();
                  }}
                >
                  <textarea
                    name="answer"
                    placeholder="Enter your suggestion..."
                    required
                  ></textarea>
                  <select name="lawType" required>
                    <option value="">Select Law Type</option>
                    <option value="Common Law">Common Law</option>
                    <option value="Civil Law">Civil Law</option>
                  </select>
                  <button type="submit">Submit Suggestion</button>
                </form>
              )}
            </div>
          )}
        </div>
      ))}

      {showForm && (
        <div className="form-overlay">
          <form className="question-form" onSubmit={handleSubmit}>
            <h2>Ask a Question</h2>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={situationData.title}
              onChange={handleInputChange}
              placeholder="Enter question title"
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={situationData.description}
              onChange={handleInputChange}
              placeholder="Enter question description"
            />
            <label htmlFor="image">Attach Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Submit</button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LegalQA;