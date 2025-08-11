import React, { useState } from "react";
import axios from "axios";
import "./signin.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignIn() {
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId",response.data.userId)
      console.log(response.data.message);
      window.location = "/home";
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "SignIn failed");
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-header">
        <h1 className="brand-title">Blogo</h1>
        <p className="brand-subtitle">Welcome back to the community</p>
      </div>

      <div className="signin-container">
        <h2 className="signin-heading">SignIn</h2>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="signin-error">{error}</div>}

        <button className="signin-button" onClick={handleSignIn}>
          Sign In
        </button>

        <div className="toggle-div">
          <p>
            Don’t have an account?
            <a className="signup-link" href="/signup">SignUp</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
