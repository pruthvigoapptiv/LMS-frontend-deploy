import React from "react";
import styled from "styled-components";
import "./SideBar.css";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
const Sidebar = styled.div`
  width: 200px;
  height: 200vh;
  background-color: #03032c;
  transition: width 0.3s ease;
`;

const SideBar = () => {
  return (
    <>
      <Sidebar>
        <div className="dashboardIconBox">
          <Link to="/dashboard" className="linkIcon">
            <FontAwesome className="iconClass" name="home" size="1x" />
            <span className="stuTitle">Home </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="male" size="1x" />
          <Link to="/studentadmission" className="linkIcon">
            <span className="stuTitle">Student Admission </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="male" size="1x" />
          <Link to="/admissionstatus" className="linkIcon">
            <span className="stuStatusTitle">Admission Status </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="city" size="1x" />

          <Link to="/student" className="linkIcon">
            <span className="courseTitle">Student Detail</span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="male" size="1x" />
          <Link to="/teacherregistration" className="linkIcon">
            <span className="teacherTitle">Teacher Registration </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="book" size="1x" />
          <Link to="/courses" className="linkIcon">
            <span className="courseTitle">Courses </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="book" size="1x" />
          <Link to="/createcourse" className="linkIcon">
            <span className="courseTitle">Create Courses </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="city" size="1x" />
          <Link to="/batch" className="linkIcon">
            <span className="courseTitle">Batch </span>
          </Link>
        </div>
        <div className="dashboardIconBox">
          <FontAwesome className="" name="city" size="1x" />

          <Link to="/batchList" className="linkIcon">
            <span className="courseTitle">Batch List </span>
          </Link>
        </div>

        <div className="dashboardIconBox">
          <FontAwesome className="" name="check" size="1x" />
          <Link to="/omr" className="linkIcon">
            <span className="omrTitle">OMR Checking </span>
          </Link>
        </div>
      </Sidebar>
    </>
  );
};

export default SideBar;
