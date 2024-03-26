import React, { useState } from "react";
import "./CSS/Login.css";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically perform authentication logic,
    // such as sending a request to your backend server to validate the credentials.
    // For this example, I'll just check if username and password are not empty.
    if (username && password) {
      // Simulating successful login
      onLogin(username);
      navigate("/main"); // Redirect to main page after login
    } else {
      setError("Please provide both username and password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p className="create-account-link">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
