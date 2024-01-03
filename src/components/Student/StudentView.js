import React, { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StudentView = () => {
   const { pathname } = useLocation();

   // Automatically scrolls to top whenever pathname changes
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
  const [basicActive, setBasicActive] = useState("tab1");
  const [studentDetails, setStudentDetails] = useState({});
  const [image, setImage] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    paidamount: "",
    date: "",
    status: "",
    image: "",
  });
  const { studentId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    fetchDetails();

    fetchAttendanceData();
  }, [studentId]);
  const authToken = localStorage.getItem("authToken");

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/attendance/${studentId}`,
        {
          headers: {
            authToken: authToken,
          },
        }
      );
      const data = await response.data;
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const fetchDetails = async (req, res) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/student/view/${studentId}`
      );
      const data = await response.data;
      setStudentDetails(data);
      console.log("data fetched succeessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  const handleDownloadImage = (imageUrl, imageName) => {
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = imageName; // Set the download attribute to the image name
    anchor.click();
  };

  const handlePrintImage = (imageUrl) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
        </head>
        <body>
          <img src="${imageUrl}" style="max-width: 100%;" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  //   function for file upload to firebase
  const handleFileUpload = (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setImage(downloadUrl);
        });
      });
    } else {
      console.log("no file selected");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setFormData((prevFormData) => ({
        ...prevFormData,
        image: image,
      }));
      const response = await axios.post(
        `http://localhost:8000/api/v1/student/addfees/${studentId}`,
        formData
      );
      alert("fees added successfully");
      console.log(response.data);
      // Handle success, update UI, etc.
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <>
      <MDBTabs pills className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Details
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Update Fees
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            Test Marks
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab4")}
            active={basicActive === "tab4"}
          >
            Attendance
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab5")}
            active={basicActive === "tab5"}
          >
            Tab 5
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === "tab1"}>
          <MDBContainer
            breakpoint="lg"
            style={{ backgroundColor: "lightblue" }}
          >
            {Object.keys(studentDetails).length > 0 && (
              <div>
                <p>
                  <strong>Full Name:</strong>{" "}
                  {studentDetails.applicationId.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {studentDetails.applicationId.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {studentDetails.applicationId.mobile}
                </p>
                <h3>Fees Information</h3>
                {studentDetails.fees.map((fee) => (
                  <div key={fee._id}>
                    <p>
                      <strong>Amount:</strong> {fee.amount}
                    </p>
                    <p>
                      <strong>Paid Amount:</strong> {fee.paidamount}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(fee.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Status:</strong> {fee.status}
                    </p>
                    {fee.image && (
                      <img
                        src={fee.image}
                        alt="Fee Receipt"
                        download
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                    <button
                      onClick={() => handleDownloadImage(fee.image, "Receipt")}
                    >
                      Download
                    </button>
                    <button onClick={() => handlePrintImage(fee.image)}>
                      Print
                    </button>
                  </div>
                ))}
              </div>
            )}
          </MDBContainer>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === "tab2"}>
          <MDBContainer>
            <form onSubmit={handleSubmit}>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />

              <label htmlFor="paidamount">Paid amount</label>
              <input
                type="number"
                className="paidamount"
                value={formData.paidamount}
                onChange={(e) =>
                  setFormData({ ...formData, paidamount: e.target.value })
                }
              />

              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />

              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="image"
                name="image"
                onChange={handleFileUpload}
              />

              <button type="submit">Submit</button>
            </form>
          </MDBContainer>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === "tab3"}>
          <div>
            <h2>Attendance List</h2>
            {Array.isArray(attendanceData) && attendanceData.length > 0 ? (
              attendanceData.map((attendance) => (
                <div key={attendance._id}>
                  <h3>
                    Date: {new Date(attendance.date).toLocaleDateString()}
                  </h3>
                  <p>Batch: {attendance.batch}</p>
                  <ul>
                    {attendance.records.map((record) => (
                      <li key={record._id}>
                        Status: {record.status ? "Present" : "Absent"}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No attendance data available</p>
            )}
          </div>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === "tab4"}>Tab 4 content</MDBTabsPane>
        <MDBTabsPane open={basicActive === "tab5"}>Tab 5 content</MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default StudentView;
