import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SidebarFooter.css";

const SidebarFooter = ({ isLoggedIn, userData, onSubmitQuestion }) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [questionData, setQuestionData] = useState({
        title: "",
        description: "",
        image: null,
    });

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .join("");
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setQuestionData({ ...questionData, image: files[0] });
        } else {
            setQuestionData({ ...questionData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!questionData.title.trim() || !questionData.description.trim()) {
            console.error("Title and description are required.");
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
            formData.append("title", questionData.title);
            formData.append("description", questionData.description);
            if (questionData.image) {
                formData.append("image", questionData.image);
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
                console.log("Question submitted successfully:", response.data);
                setQuestionData({ title: "", description: "", image: null });
                setShowForm(false);
            } else {
                console.error("Unexpected response:", response.data);
            }
        } catch (error) {
            console.error("Error submitting question:", error.response ? error.response.data : error);
        }
    };

    const handleAskQuestion = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            setShowForm(true);
        }
    };

    const onProfileClick = () => {
        navigate("/dashboard");
    };

    return (
        <aside className="sidebar-footer">
            {isLoggedIn && (
                <div className="user-info" onClick={onProfileClick}>
                    {userData?.photo ? (
                        <img
                            src={userData.photo}
                            alt="User"
                            className="user-image"
                        />
                    ) : (
                        <div className="user-initials">{getInitials(userData.name)}</div>
                    )}
                    <h3>{userData?.name}</h3>
                    <p>{userData?.email}</p>
                </div>
            )}
            <button className="ask-question-btn" onClick={handleAskQuestion}>
                Ask a Question
            </button>

            {showForm && (
                <div className="question-form-overlay">
                    <form className="question-form" onSubmit={handleSubmit}>
                        <h2>Ask a Question</h2>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={questionData.title}
                            onChange={handleInputChange}
                            placeholder="Enter question title"
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={questionData.description}
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
                        <div className="question-form-buttons">
                            <button type="submit">Post Question</button>
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

            

            <div className="footer-links">
                <Link to="/about">About Us</Link>
                <Link to="/privacypolicy">Privacy Policy</Link>
                <Link to="/termsofservice">Terms of Service</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </aside>
    );
};

export default SidebarFooter;
