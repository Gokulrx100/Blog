import React from 'react'
import "./landing.css"

function Landing() {
  return (
    <div id="landing-container">
      <h2>Welcome to Blogo</h2>
      <h3>“The art of writing is the art of discovering what you believe.”</h3>
      <div id="buttons-InUp">
        <button onClick={() => window.location = "/signup"}>SignUp</button>
        <button onClick={() => window.location = "/signin"}>SignIn</button>
      </div>
    </div>
  );
}

export default Landing;