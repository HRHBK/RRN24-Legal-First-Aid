import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SidebarFooter.css";

const SidebarFooter = ({ isLoggedIn, userData, onSubmitQuestion }) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [questionData, setQuestionData] = useState({
        title: "",
        description: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setQuestionData({ ...questionData, image: files[0] });
        } else {
            setQuestionData({ ...questionData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionData.title.trim() || questionData.description.trim()) {
            onSubmitQuestion({
                ...questionData,
                askedBy: userData?.name || "Anonymous",
                timestamp: new Date().toISOString(),
            });
            setQuestionData({ title: "", description: "", image: null });
            setShowForm(false);
        }
    };

    const handleAskQuestion = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            setShowForm(true);
        }
    };

    return (
        <aside className="sidebar-footer">
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

            {isLoggedIn && (
                <div className="user-info">
                    <img
                        src={userData?.photo || "/path/to/default-avatar.png"}
                        alt="User"
                        className="user-image"
                    />
                    <h3>{userData?.name}</h3>
                    <p>{userData?.email}</p>
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
