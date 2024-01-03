import React, { useEffect } from "react";
import "./OmrChecking.css";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";


const OmrChecking = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainOmrBox">
          <h1>OMR Checking Section</h1>
          <div className="formOmr">
            <Form.Group controlId="formFileLg" className="mb-3">
              {/* <Form.Label>Large file input example</Form.Label> */}
              <Form.Control type="file" size="lg" />
            </Form.Group>
            <Button variant="success">Evaluate OMR</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OmrChecking;
