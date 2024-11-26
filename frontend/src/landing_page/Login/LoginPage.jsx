import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useAuth } from './auth'; // Adjust the import path as needed
import '../signup/Signup.css'; // Import the CSS file


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { loginUser } = useAuth();
const navigate = useNavigate(); // Initialize the navigate function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      setSuccess('Login successful!');
      setError(null);
      setUsername("")
      setPassword("")
      // navigate('/'); // Navigating to the main page ("/")
      // Redirect the user to an external URL after successful login
      window.location.href = "https://connecticaiot.com/"; // Full-page redirect to external site
      // window.location.href = "http://localhost:5173/";

    } catch (err) {
      setError(err.message);
      setSuccess(null);
      setUsername("")
      setPassword("")
    }
  };

  return (
    <div className="auth-container my-20">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            className='reg'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className='reg'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btnn" type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

      </form>
      <p className="redirect">
        Don't have an account? <Link to="/Signup">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
