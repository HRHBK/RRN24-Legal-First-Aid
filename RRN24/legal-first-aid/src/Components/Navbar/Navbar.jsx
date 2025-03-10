import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the menu
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", photo: "" });
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

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
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found. Redirecting to login.");
      setIsLoggedIn(false);
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "https://rrn24.techchantier.site/Legal_First_Aid/public/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
    }

    // Clear user session
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");

    setIsLoggedIn(false);
    setUserData({ name: "", photo: "" });

    navigate("/");
  };

  // Extract the first two letters of the user's name (default to "??" if no name)
  const userInitials = userData.name
    ? userData.name.slice(0, 2).toUpperCase()
    : "??";

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/">Legal First Aid</Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Menu */}
      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/termsofservice" onClick={() => setMenuOpen(false)}>Terms of Sevice</Link>
      </div>

      {/* User Info Section */}
      <div className="user-info">
        {isLoggedIn ? (
          <>
            <div className="user-profile">
              {userData.photo ? (
                <img src={userData.photo} alt="User" className="user-image" />
              ) : (
                <div className="user-initials">{userInitials}</div>
              )}
            </div>
            <button className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
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
