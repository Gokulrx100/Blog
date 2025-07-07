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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleSignUp() {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", `${firstName} ${lastName}`);
      formData.append("gmail", gmail);
      formData.append("username", username);
      formData.append("password", password);
      if (image) formData.append("image", image);
      console.log(image);

      const response = await axios.post("http://localhost:3000/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        <div className="profile-upload-wrapper">
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
            style={{ display: "none" }}
          />

          <label htmlFor="profile-upload" className="profile-upload-label">
            <img
              src={
                preview ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + " " + lastName)}&background=ddd&color=333&rounded=true`
              }
              alt="Profile"
              className="profile-avatar"
            />
            <div className="profile-upload-overlay">+</div>
          </label>
        </div>

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