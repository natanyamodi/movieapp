import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";

const SignUp = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically perform account creation logic,
    // such as sending a request to your backend server to create the account.
    // For this example, I'll just check if username and password are not empty.
    if (username && password) {
      // Simulating successful account creation
      onSignUp(username);
      navigate("/main"); // Redirect to main page after signing up
    } else {
      setError("Please provide both username and password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Create Account</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
