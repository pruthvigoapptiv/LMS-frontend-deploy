import React from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import OmrChecking from "./components/OmrChecking/OmrChecking";
import AdmissionStatus from "./components/AdmissionStatus/AdmissionStatus";
import StudentAdmission from "./components/StudentAdmission/StudentAdmission";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import TeacherRegistration from "./components/TeacherRegistration/TeacherRegistration";
import Batch from "./components/Batch/Batch";
import BatchList from "./components/Batch/BatchList";
import StudentView from "./components/Student/StudentView";
import Student from "./components/Student/Student";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/omr" element={<OmrChecking />} />
        <Route path="/admissionstatus" element={<AdmissionStatus />} />
        <Route path="/studentadmission" element={<StudentAdmission />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/createcourse" element={<CreateCourse />} />
        <Route path="/teacherregistration" element={<TeacherRegistration />} />
        <Route path="/batch" element={<Batch />} />
        <Route path="/batchList" element={<BatchList />} />
        <Route path="/student" element={<Student />} />
        <Route path="/studentview/:studentId" element={<StudentView />} />
      </Routes>
    </>
  );
}

export default App;
