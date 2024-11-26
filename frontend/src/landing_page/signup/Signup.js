import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Add your styles

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here (API call or form validation)
    if (username && email && password) {
      setSuccess('Signup successful!');
      setError(null);
      // Optionally, navigate to the login page or home page after successful signup
    } else {
      setError('Please fill all fields.');
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
            className='reg'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className='reg'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="btnn" type="submit">Signup</button>
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
