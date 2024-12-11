import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill all fields.");
      setSuccess(null);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess(null);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setSuccess(null);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3002/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful!");
        setError(null);
      } else {
        setError(data.message || "Signup failed. Please try again.");
        setSuccess(null);
      }
    } catch (error) {
      setError("Error connecting to the server.");
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container my-20">
      <h2>Signup</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            className="reg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="reg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="reg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btnn" type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Signup"}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <p className="redirect">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
