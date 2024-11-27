import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Add your styles

function Signup() {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!name || !email || !password) {
      setError('Please fill all fields.');
      setSuccess(null);
      return;
    }

    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:3002/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      // Check if the response was successful
      if (response.ok) {
        setSuccess('Signup successful!');
        setError(null);
        // Optionally, redirect to another page or show a success message
        // For example, you can redirect to the login page:
        // window.location.href = '/login';
      } else {
        setError(data.message || 'Signup failed. Please try again.');
        setSuccess(null);
      }
    } catch (error) {
      setError('Error connecting to the server.');
      setSuccess(null);
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
            value={name}
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
        <button className="btnn" type="submit">Signup</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <p className="redirect">
        Already have an account? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
