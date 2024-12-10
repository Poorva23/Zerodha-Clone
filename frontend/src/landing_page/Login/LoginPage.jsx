import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../signup/Signup.css";

const Login = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Please fill in both fields.");
      setSuccess(null);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Login successful!");
        setError(null);
        setUsername("");
        setPassword("");
        navigate("/dashboard");
      } else {
        throw new Error(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container my-20">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            className="reg"
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="reg"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button className="btnn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <p className="redirect">
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
};

export default Login;