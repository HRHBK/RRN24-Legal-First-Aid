import React, { useState, useEffect } from "react";
import PageLayout from "../Components/PageLayout";
import "./UserDashboard.css";
import axios from "axios";

const UserDashboard = () => {
    const [userData, setUserData] = useState({});
    const [postedSituations, setPostedSituations] = useState([]);
    const [suggestedSituations, setSuggestedSituations] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [view, setView] = useState("overview"); // "overview", "posted", "suggested", "notifications"

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase())
            .join("");
    };

    useEffect(() => {
        // Fetch user data from localStorage
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");
        const userRole = localStorage.getItem("userRole");
        const userPhoto = localStorage.getItem("userPhoto");

        setUserData({
            name: userName,
            email: userEmail,
            role: userRole,
            photo: userPhoto || null, // Ensure photo is null if not provided
        });

        // Fetch posted situations
        fetchPostedSituations();

        // Fetch suggested situations
        fetchSuggestedSituations();

        // Fetch notifications
        fetchNotifications();
    }, []);

    const fetchPostedSituations = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(
                "https://rrn24.techchantier.com/Legal_First_Aid/public/api/user-posted-situations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPostedSituations(response.data.data || []);
        } catch (error) {
            console.error("Error fetching posted situations:", error);
        }
    };

    const fetchSuggestedSituations = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(
                "https://rrn24.techchantier.com/Legal_First_Aid/public/api/user-suggested-situations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuggestedSituations(response.data.data || []);
        } catch (error) {
            console.error("Error fetching suggested situations:", error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(
                "https://rrn24.techchantier.com/Legal_First_Aid/public/api/notifications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNotifications(response.data.data || []);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    return (
        <PageLayout>
            <div className="dashboard-container">
                {/* User Info Section */}
                <div className="user-info-section">
                    {userData.photo ? (
                        <img src={userData.photo} alt="User Avatar" className="user-avatar" />
                    ) : (
                        <div className="user-initials">{getInitials(userData.name)}</div>
                    )}
                    <h2>{userData.name}</h2>
                    <p>{userData.email}</p>
                    <p className="user-role">{userData.role}</p>
                </div>

                {/* Dashboard Navigation */}
                <div className="dashboard-nav">
                    <button
                        className={view === "overview" ? "active" : ""}
                        onClick={() => setView("overview")}
                    >
                        Overview
                    </button>
                    <button
                        className={view === "posted" ? "active" : ""}
                        onClick={() => setView("posted")}
                    >
                        My Posted Situations
                    </button>
                    <button
                        className={view === "suggested" ? "active" : ""}
                        onClick={() => setView("suggested")}
                    >
                        My Suggestions
                    </button>
                    <button
                        className={view === "notifications" ? "active" : ""}
                        onClick={() => setView("notifications")}
                    >
                        Notifications
                    </button>
                </div>

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {view === "overview" && (
                        <div className="overview-section">
                            <h3>Welcome, {userData.name}</h3>
                            <p>
                                Thank you for being a part of <strong>Legal First Aid</strong>. Our mission is to empower individuals with legal knowledge and provide a platform for justice and fairness.
                            </p>
                            <div className="overview-stats">
                                <div className="stat-card">
                                    <h4>Posted Situations</h4>
                                    <p>{postedSituations.length}</p>
                                </div>
                                <div className="stat-card">
                                    <h4>Suggestions Given</h4>
                                    <p>{suggestedSituations.length}</p>
                                </div>
                                <div className="stat-card">
                                    <h4>Notifications</h4>
                                    <p>{notifications.length}</p>
                                </div>
                            </div>
                            <div className="quick-links">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="/q&a">Ask a Legal Question</a></li>
                                    <li><a href="/about">Learn About Us</a></li>
                                    <li><a href="/contact">Contact Support</a></li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {view === "posted" && (
                        <div className="posted-section">
                            <h3>My Posted Situations</h3>
                            {postedSituations.length > 0 ? (
                                postedSituations.map((situation) => (
                                    <div key={situation.id} className="situation-card">
                                        <h4>{situation.title}</h4>
                                        <p>{situation.description}</p>
                                        <p className="timestamp">
                                            Posted on: {new Date(situation.created_at).toLocaleString()}
                                        </p>
                                        <div className="responses">
                                            <h5>Responses:</h5>
                                            {situation.responses.length > 0 ? (
                                                situation.responses.map((response) => (
                                                    <p key={response.id} className="response">
                                                        {response.answer} - <strong>{response.answeredBy}</strong>
                                                    </p>
                                                ))
                                            ) : (
                                                <p>No responses yet.</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No situations posted yet.</p>
                            )}
                        </div>
                    )}

                    {view === "suggested" && (
                        <div className="suggested-section">
                            <h3>My Suggestions</h3>
                            {suggestedSituations.length > 0 ? (
                                suggestedSituations.map((situation) => (
                                    <div key={situation.id} className="situation-card">
                                        <h4>{situation.title}</h4>
                                        <p>{situation.description}</p>
                                        <p className="timestamp">
                                            Suggested on: {new Date(situation.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No suggestions made yet.</p>
                            )}
                        </div>
                    )}

                    {view === "notifications" && (
                        <div className="notifications-section">
                            <h3>Notifications</h3>
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div key={notification.id} className="notification-card">
                                        <p>{notification.message}</p>
                                        <p className="timestamp">
                                            Received on: {new Date(notification.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No notifications yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default UserDashboard;
