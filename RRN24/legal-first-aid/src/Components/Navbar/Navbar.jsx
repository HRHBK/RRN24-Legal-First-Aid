import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaSearch } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", photo: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userName = localStorage.getItem("userName");
    const userPhoto = localStorage.getItem("userPhoto");

    if (token) {
      setIsLoggedIn(true);
      setUserData({ name: userName, photo: userPhoto });
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://rrn24.techchantier.com/Legal_First_Aid/public/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      if (error.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <nav className="nav">
      {/* Left Section: Logo */}
      <div className="nav-left">
        <img src="src\assets\mylogo.webp" alt="Logo" className="logo-image" />
        <Link to="/" className="logo-title">Legal First Aid</Link>
      </div>

      {/* Center Section: Nav Links and Search */}
      <div className="nav-center">
        <Link to="/home" title="Home" className="nav-link">
          <FaHome />
        </Link>
        <Link to="/about" title="About" className="nav-link">
          <FaInfoCircle />
        </Link>
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Right Section: Profile or Login/Logout */}
      <div className="nav-right">
        {isLoggedIn ? (
          <div className="user-profile">
            {userData.photo ? (
              <img
                src={userData.photo}
                alt="User Profile"
                className="profile-image"
              />
            ) : (
              <div className="profile-initials">
                {getInitials(userData.name || "User")}
              </div>
            )}
            <button className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
