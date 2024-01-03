import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
const OmrChecking = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainOmrBox">
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default OmrChecking;
