import React from "react";

import "./Navbar.css"; // You can create a separate CSS file for styling
import logo from "./logocca.png";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navContainer">
          <img className="logoImg navChild" src={logo} alt="" />
          {/* <h3 className="navChild">Coding Circle Academy</h3> */}
        </div>
        <div className="logoutContainer">
          <Button variant="secondary" onClick={handleLogout}>
            LogOut
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
