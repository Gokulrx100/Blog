import React from 'react'
import { useNavigate } from "react-router";
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <>
    <header className="app-header">
        BLOGO
      </header>
    <nav id="navbar-container">
      <span  onClick={() => navigate("/home")}>Home</span>
      <span  onClick={() => navigate("/create")}>Create</span>
      <span  onClick={() => navigate("/profile")}>Profile</span>
      <span  className="logOut" onClick={handleLogout}>Logout</span>
    </nav>
    </>
  );
}

export default Navbar