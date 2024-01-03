

import React, { useState, useEffect } from "react";
import "./Courses.css";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Courses = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const [courseData, setCourseData] = useState([]);
  const [token, setToken] = useState(""); // State to store the authentication token
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve the authentication token from localStorage
    // const storedToken = localStorage.getItem("authToken");
    // console.log(storedToken);
    // if (storedToken) {
    //   setToken(storedToken);
    // }
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }

    // Fetch course data from the API
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/course/getallcourse"
        // {
        //   headers: {
        //     authToken: token, // Include the token in the request headers
        //   },
        // }
      );
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainOmrBox">
          <h1>Courses</h1>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Fees</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {courseData.map((course) => (
                <tr key={course._id}>
                  <td>{course.coursename}</td>
                  <td>{course.desc}</td>
                  <td>{course.duration}</td>
                  <td>{course.fees}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </>
  );
};

export default Courses;
