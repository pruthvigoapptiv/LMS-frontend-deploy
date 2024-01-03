

import React, { useState, useEffect } from "react";
import "./Batch.css";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Batch = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const [batchName, setBatchName] = useState("");
  const [course, setCourse] = useState(null); // Store selected course object
  const [teacher, setTeacher] = useState(null); // Store selected teacher object
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }

    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/course/getallcourse"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/teacher/getallteachers"
      );
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const findCourseByName = (courseName) => {
    return courses.find((c) => c.coursename === courseName);
  };

  const findTeacherByName = (teacherName) => {
    return teachers.find((t) => t.name === teacherName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedCourse = findCourseByName(course);
      const selectedTeacher = findTeacherByName(teacher);
      console.log(selectedTeacher);
      const response = await axios.post(
        "http://localhost:8000/api/v1/batch/create-batch",
        {
          batchname: batchName,
          course: selectedCourse,
          teacher: selectedTeacher,
        },
        {
          headers: {
            authToken: `${token}`,
          },
        }
      );
      console.log("Batch created successfully:", response.data);
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="mainOmrBox">
          <h1>Batch Section</h1>
          <div className="formBox">
            <h3>Create Batch according to course</h3>
            <form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                className="nameInput"
                placeholder="Enter Batch Name"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
              <Form.Select
                className="selectInput"
                value={course ? course.coursename : ""}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.coursename}>
                    {course.coursename}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="selectInput"
                value={teacher ? teacher.name : ""}
                onChange={(e) => setTeacher(e.target.value)}
              >
                <option>Assigned Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
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

export default Batch;
