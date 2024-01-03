import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
// import StudentAdmitModal from "./StudentAdmitModal"; // Import your StudentAdmitModal component
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import './Student.css'
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
const Student = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currApplicationId, setCurrApplicationId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/student/getallstudents"
      );
      const data = await response.data;
      setData(data);
      console.log("Data represented successfully", data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdmitButtonClick = (applicationId) => {
  //   // Set the current applicationId when Admit button is clicked
  //   setCurrApplicationId(applicationId);
  //   setShowModal(true); // Show the modal
  // };

  const handleViewButtonClick = (studentId) => {
    // Navigate to the StudentView page and pass studentId as part of the URL
    navigate(`/studentview/${studentId}`);
  };

  return (
    <>
      <Navbar />
      <div className="mainBox">
        <SideBar />
        <div className="stuStatusBox">
          <h1>Student Status </h1>
          <div className="">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0].applicationId.education).map((key) => (
                      <th key={key} scope="col">
                        Education {key}
                      </th>
                    ))}
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Parent Phone</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Course Duration</th>
                  <th scope="col">Course Fees</th>
                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {item.applicationId.education &&
                      Object.values(item.applicationId.education).map(
                        (value, subIndex) => <td key={subIndex}>{value}</td>
                      )}
                    <td>{item.applicationId.fullname}</td>
                    <td>{item.applicationId.email}</td>
                    <td>{item.applicationId.parentphone}</td>
                    <td>{item.applicationId.mobile}</td>
                    <td>
                      {item.applicationId.course &&
                        item.applicationId.course.coursename}
                    </td>
                    <td>
                      {item.applicationId.course &&
                        item.applicationId.course.duration}
                    </td>
                    <td>
                      {item.applicationId.course &&
                        item.applicationId.course.fees}
                    </td>
                    <td>{item.applicationId.status}</td>
                    <td>
                      <Button
                        onClick={() => handleViewButtonClick(item._id)}
                        variant="success"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
