// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaPlus, FaBook, FaBookReader } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "green" }}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand text-white">
          E-Library
        </Link>

        {/* Navbar toggler (for smaller screens) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto ">
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white ">
                    All Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-book" className="nav-link text-white">
                     Add E-book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-books" className="nav-link text-white">
                     View My E-books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-borrowed-books" className="nav-link text-white">
                 My Borrowed Books
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User and Logout */}
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-warning text-dark me-2">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-warning text-dark">
                    <FaUserPlus className="me-1" /> Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text text-warning me-3">
                    Hello, {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-warning text-dark ">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
