import React, { useEffect, useState } from "react";
import "./TeacherRegistration.css";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const TeacherRegistration = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("authToken");
  console.log(token);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/teacher/create-teacher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        // Handle success, e.g., show a success message
        console.log("Teacher registered successfully:", data);
      } else {
        // Handle error, e.g., show an error message
        console.error("Error registering teacher:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainRegBox">
          <h1>Teacher Registration </h1>
          <div className="formBox">
            <form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="nameInput"
                placeholder="Enter Full Name"
              />

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="emailInput"
                placeholder="Enter Email Address"
              />
              <Form.Control
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mobileInput"
                placeholder="Enter Mobile Number"
              />
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="selectInput"
              >
                <option>Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Select>
              <div className="btnBox">
                <Button type="submit" variant="success">
                  SUBMIT
                </Button>
                <Button type="reset" variant="warning">
                  RESET
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherRegistration;
