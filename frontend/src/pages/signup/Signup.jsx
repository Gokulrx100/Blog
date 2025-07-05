import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp() {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: `${firstName} ${lastName}`,
        gmail,
        username,
        password,
      });
      console.log(response.data.message);
      window.location = "/signin";
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "SignUp failed");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-header">
        <h1 className="brand-title">Blogo</h1>
        <p className="brand-subtitle">Join our community of writers</p>
      </div>

      <div className="signup-container">
        <h2 className="signup-heading">SignUp</h2>

        <div className="name-input">
          <div className="input-group">
            <label>Firstname</label>
            <input
              type="text"
              required
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Lastname</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Gmail</label>
          <input
            type="email"
            required
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder="yourname@gmail.com"
          />
        </div>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="signup-error">{error}</div>}

        <button className="signup-button" onClick={handleSignUp}>
          Sign up
        </button>

        <div className="toggle-div">
          <p>
            Already have an account?
            <a className="signin-link" href="/signin">
              SignIn
            </a>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;
