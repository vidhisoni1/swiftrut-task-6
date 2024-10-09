// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "green" }}>
        <h1 className="text-center text-white mb-4">Login</h1>
        <p className="text-center text-light mb-3">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Log in
          </button>
        </form>
        <p className="text-center text-light mt-3">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#FFD700" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
