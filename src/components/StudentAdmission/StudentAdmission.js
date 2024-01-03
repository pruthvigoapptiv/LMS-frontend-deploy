import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const StudentAdmission = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const navigate = useNavigate();
  const [courseInterested, setcourseInterested] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    gender: "",
    dob: "",
    parentname: "",
    parentoccupation: "",
    parentphone: "",
    adharcard: "",
    mobile: "",
    address: "",
    education: {
      edu: "",
      year: "",
    },

    course: "",
  });

  const authToken = localStorage.getItem("authToken"); // Replace with your actual authToken

  const fetchCourseId = async (courseName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/course/${courseName}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        const courseData = await response.json();
        console.log(courseData, 1234);
        setFormData((prevData) => ({
          ...prevData,
          course: {
            _id: courseData._id,
            coursename: courseData.coursename,
            desc: courseData.desc,
            duration: courseData.duration,
            fees: courseData.fees,
            // Add other course fields as needed
          },
        }));
        // setSelectedCourseId(data); // Assuming the course ID is stored in the "course_id" field
        // setFormData.course = data;
        // console.log(formData.course);
      } else {
        console.error("Error fetching course ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching course ID:", error);
    }
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "courseInterested") {
      await fetchCourseId(value);
      console.log(value);
    }

    if (name.startsWith("education.")) {
      const educationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        education: {
          ...prevData.education,
          [educationField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [courseOptions, setCourseOptions] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/course/getallcourse",
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setCourseOptions(data.map((course) => course.coursename));
        } else {
          console.error("Error fetching courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admissions/create-admission",
        formData, // Pass form data directly, axios will handle JSON.stringify
        {
          headers: {
            "Content-Type": "application/json",
            authToken: `${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        alert("Admission created successfully");
        // Optionally, you can reset the form or perform other actions after successful submission
      } else if (response.status === 400) {
        const errorData = response.data;
        console.error("Error: Student already exists", errorData.message);
        // Handle the case where the student already exists
      } else {
        console.error("Error creating admission:", response.statusText);
        // Handle other errors as needed
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
        <div className="mainOmrBox">
          <h1>Student Admission</h1>
          <div className="formBox">
            <h3>Add Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="flexDiv">
                <Form.Control
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  style={{ margin: "0.5rem" }}
                />
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  style={{ margin: "0.5rem" }}
                />
              </div>
              <div className="flexDiv">
                <Form.Control
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  style={{ margin: "0.5rem" }}
                />
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ margin: "0.5rem" }}
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </div>
              <div className="flexDiv">
                <Form.Control
                  type="text"
                  name="parentname"
                  value={formData.parentname}
                  onChange={handleChange}
                  placeholder="Enter Parents Name"
                  style={{ margin: "0.5rem" }}
                />
                <Form.Control
                  type="text"
                  name="parentoccupation"
                  value={formData.parentoccupation}
                  onChange={handleChange}
                  placeholder="Enter Parents Occupation"
                  style={{ margin: "0.5rem" }}
                />
              </div>
              <div className="flexDiv">
                <Form.Control
                  type="number"
                  name="adharcard"
                  value={formData.adharcard}
                  onChange={handleChange}
                  placeholder="Enter adhar Number"
                  style={{ margin: "0.5rem" }}
                />
                <Form.Control
                  type="text"
                  name="parentphone"
                  value={formData.parentphone}
                  onChange={handleChange}
                  placeholder="Enter Parents Mobile"
                  style={{ margin: "0.5rem" }}
                />
              </div>
              <div className="dobDiv">
                <h6>Date of Birth</h6>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Enter Parents Mobile"
                />
              </div>
              <hr />
              <h3>Address & Education</h3>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your Address"
                style={{ height: "60px", margin: "1rem" }}
              />

              <Form.Control
                as="textarea"
                name="education.edu"
                value={formData.education.edu}
                onChange={handleChange}
                placeholder="Enter your education details"
                style={{ height: "60px", margin: "1rem" }}
              />

              <Form.Control
                type="text"
                name="education.year"
                value={formData.education.year}
                onChange={handleChange}
                placeholder="Enter Education Year"
                style={{ height: "60px", margin: "1rem" }}
              />

              <hr />
              <h3>Course Details</h3>
              <Form.Select
                name="courseInterested"
                value={courseInterested}
                onChange={handleChange}
                style={{ height: "60px", margin: "1rem" }}
              >
                <option>Select Course Interested</option>
                {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </Form.Select>
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

export default StudentAdmission;
