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
    fetchSituations(); // Fetch all situations on component mount
  }, []); // Fetch situations on component mount

  const fetchSituations = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        const newSituations = await Promise.all(
          response.data.data.map(async (situation) => {
            console.log("Fetched Situation:", situation); // Log each fetched situation
            const suggestions = await fetchSuggestions(situation.id);
            return {
              ...situation,
              responses: suggestions,
            };
          })
        );
        setSituations(newSituations);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching situations:", error.response ? error.response.data : error);
      setErrorMessage("Failed to load situations. Please try again later.");
    }
  };

  const handleAskSituation = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowForm(true); // Show the form for both normal users and lawyers
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
          user: {
            name: userData.name,
            image: userData.photo,
            id: userData.userId,
          },
          responses: [],
        };
        setSituations((prevSituations) => [newSituation, ...prevSituations]); // Add new situation to the top
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

  const fetchSuggestions = async (situationId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return [];
      }

      const response = await axios.get(
        `https://rrn24.techchantier.com/Legal_First_Aid/public/api/situations/${situationId}/suggestions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        console.log(`Suggestions fetched for situation ${situationId}:`, response.data.data);
        return response.data.data;
      } else {
        console.error("Unexpected response:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error.response ? error.response.data : error);
      return [];
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
      formData.append("legal_system", suggestionData.legalSystem);
      formData.append("is_sensitive", suggestionData.isSensitive ? "1" : "0");
      if (suggestionData.image) {
        formData.append("image", suggestionData.image);
      }

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
        const newSuggestion = response.data.data;

        // Update the specific situation's responses in the state
        setSituations((prevSituations) =>
          prevSituations.map((situation) =>
            situation.id === situationId
              ? {
                    ...situation,
                    responses: [...situation.responses, newSuggestion],
                }
              : situation
          )
        );
      } else {
        console.error("Unexpected response:", response.data);
        setErrorMessage(response.data.message || "Failed to submit suggestion.");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error.response ? error.response.data : error);

      if (error.response) {
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
      }

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
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={situationData.description}
              onChange={handleInputChange}
              placeholder="Describe your situation..."
              required
            ></textarea>
            <label htmlFor="image">Attach Image (optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
            <label>
              <input
                type="checkbox"
                name="is_sensitive"
                checked={situationData.is_sensitive}
                onChange={(e) =>
                  setSituationData({ ...situationData, is_sensitive: e.target.checked })
                }
              />
              Mark as Sensitive
            </label>
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Submit</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {[...new Map(situations.map((s) => [s.id, s])).values()] // Remove duplicates by ID
        .slice() // Create a shallow copy to avoid mutating the original array
        .sort((a, b) => {
          const dateA = new Date(a.created_at); // Parse mm/dd/yyyy format
          const dateB = new Date(b.created_at);
          return dateB - dateA; // Sort by date in descending order
        })
        .map(({ id, title, description, created_at, user, image, responses }) => (
          <div key={`situation-${id}-${created_at}`} className="post-container"> {/* Ensure unique key */}
            <div className="post-header">
              <div className="avatar">
                {user?.image ? (
                  <img src={user.image} className="avatar-image" alt={`${user?.name || "User"}'s Avatar`} />
                ) : (
                  <span>{user?.name ? getInitials(user.name) : "?"}</span>
                )}
              </div>
              <div className="user-info">
                <h3>{user?.name || "Anonymous"}</h3>
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
                onClick={() => {
                  setVisibleSuggestions((prev) => ({ ...prev, [id]: !prev[id] })); // Toggle visibility
                }}
              >
                {visibleSuggestions[id] ? "Hide Suggestions" : "Show Suggestions"}
              </button>
              <p className="response-count">{Array.isArray(responses) ? responses.length : 0} Responses</p>
              {isLoggedIn && userData?.userId === user?.id && (
                <button className="delete-btn" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              )}
            </div>
            {visibleSuggestions[id] && (
              <div id={`situation-${id}`} className="suggestion-box">
                {Array.isArray(responses) && responses.length > 0 ? (
                  responses.map((response) => (
                    <div key={response.id} className="response"> {/* Ensure unique key */}
                      <div className="response-header">
                        <div className="response-user">
                          {response.lawyer?.image ? (
                            <img
                              src={response.lawyer.image}
                              alt="Lawyer Avatar"
                              className="response-avatar"
                            />
                          ) : (
                            <div className="response-initials">
                              {response.lawyer?.name
                                ? response.lawyer.name
                                  .split(" ")
                                  .map((part) => part.charAt(0).toUpperCase())
                                  .join("")
                                : "?"}
                            </div>
                          )}
                          <p className="response-author">{response.lawyer?.name || "Anonymous"}</p>
                        </div>
                      </div>
                      <p>{response.answer}</p>
                      <p className="response-meta">
                        - {response.lawType === "common_law" ? "Common Law" : "Civil Law"}
                      </p>
                      {response.image && (
                        <img src={response.image} alt="Suggestion" className="suggestion-image" />
                      )}
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
                      const image = e.target.elements.image.files[0];
                      const legalSystem = e.target.elements.legalSystem.value;
                      const isSensitive = e.target.elements.isSensitive.checked;
                      handleSuggestionSubmit(id, { answer, image, legalSystem, isSensitive });
                      e.target.reset();
                    }}
                  >
                    <textarea
                      name="answer"
                      placeholder="Enter your suggestion..."
                      required
                    ></textarea>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                    />
                    <label>
                      <input type="checkbox" name="isSensitive" />
                      Mark as Sensitive
                    </label>
                    <select name="legalSystem" required>
                      <option value="common_law">Common Law</option>
                      <option value="civil_law">Civil Law</option>
                    </select>
                    <button type="submit">Submit Suggestion</button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default LegalQA;