// src/pages/Register.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Importing icons

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/"); // Redirect to homepage after registration
    } catch (error) {
      // Set the error message from the server or display a generic message
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "green" }}>
        <h1 className="text-center text-white mb-4">Register</h1>
        <p className="text-center text-light mb-2">How do you want to sign up?</p>

        <div className="d-flex justify-content-center mb-3">
          <div className="btn-group">
            <button className="btn" style={{ backgroundColor: "#1877F2", color: "white" }}>
              <FaFacebookF />
            </button>
            <button className="btn" style={{ backgroundColor: "#EA4335", color: "white" }}>
              <FaGoogle />
            </button>
            <button className="btn" style={{ backgroundColor: "#1DA1F2", color: "white" }}>
              <FaTwitter />
            </button>
            <button className="btn" style={{ backgroundColor: "#0077B5", color: "white" }}>
              <FaLinkedinIn />
            </button>
          </div>
        </div>

        <p className="text-center text-light mb-3">Or continue with</p>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 text-dark">
            Sign up
          </button>
        </form>

        <p className="text-center text-light mt-3">
          Have an account?{" "}
          <Link to="/login" style={{ color: "#FFD700" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
