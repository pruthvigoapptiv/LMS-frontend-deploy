import React, { useEffect, useState } from "react";
import "./CreateCourse.css";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CreateCourse = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const [coursename, setCoursename] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");
  const [token, setToken] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const storesToken = localStorage.getItem("authToken");
    if (storesToken) {
      setToken(storesToken);
    }
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/course/create-course",
        {
          coursename: coursename,
          desc: description,
          duration: duration,
          fees: fees,
        },
        {
          headers: {
            authToken: token,
          },
        }
      );
      // Handle the response as needed (e.g., show success message, redirect, etc.)
      console.log("Course added successfully:", response.data);

      // Optionally reset the form fields
      setCoursename("");
      setDescription("");
      setDuration("");
      setFees("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainOmrBox">
          <h1>Course Registration Process</h1>
          <div className="formBox">
            <h3>Course Information</h3>
            <form onSubmit={handleCreateCourse}>
              <Form.Control
                type="text"
                className="nameInput"
                placeholder="Enter Course Name"
                value={coursename}
                onChange={(e) => setCoursename(e.target.value)}
              />
              <Form.Control
                type="text"
                className="nameInput"
                placeholder="Enter Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control
                type="text"
                className="nameInput"
                placeholder="Enter Course Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <Form.Control
                type="number"
                className="nameInput"
                placeholder="Enter fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />

              <div className="btnBox">
                <Button type="submit" variant="success">
                  ADD COURSE
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

export default CreateCourse;
