import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
const DashboardContainer = styled.div`
  display: flex;
`;

const BatchList = () => {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [batchesData, setBatchesData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
    
        const response = await fetch(
          "http://localhost:8000/api/v1/batch/getallbatches"
        );
        const data = await response.json();

        // Fetch teacher details for each batch
        const batchesWithTeacherDetails = await Promise.all(
          data.map(async (batch) => {
            const teacherResponse = await fetch(
              `http://localhost:8000/api/v1/teacher/getteacher/${batch.teacher}`
            );
            const teacherData = await teacherResponse.json();
            return {
              ...batch,
              teacher: teacherData, // Replace teacher ID with teacher details
            };
          })
        );

        setBatchesData(batchesWithTeacherDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <DashboardContainer>
        <SideBar />
        <div className="mainOmrBox">
          <h1>Batch Status Section</h1>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Batch Name</th>
                <th scope="col">Course Name</th>
                <th scope="col">Assigned Teacher</th>
                <th scope="col">Edit</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {batchesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.batchname}</td>
                  <td>{item.course && item.course.coursename}</td>
                  <td>{item.teacher && item.teacher.name}</td>
                  <td>
                    <Button >Edit</Button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </DashboardContainer>
    </>
  );
};

export default BatchList;
