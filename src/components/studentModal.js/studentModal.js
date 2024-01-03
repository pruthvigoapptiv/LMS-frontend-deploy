// // StudentAdmitModal.js
// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// const StudentAdmitModal = ({ show, handleClose, handleAdmit }) => {
//   const [fees, setFees] = useState("");

//   const handleSubmit = () => {
//     // Additional validation if needed
//     handleAdmit({ fees });
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Admit Student</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="fees">
//             <Form.Label>Enter Fees</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter fees"
//               value={fees}
//               onChange={(e) => setFees(e.target.value)}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
// <Modal.Footer>
//   <Button variant="secondary" onClick={handleClose}>
//     Close
//   </Button>
//   <Button variant="primary" onClick={handleSubmit}>
//     Admit Student
//   </Button>
// </Modal.Footer>
//     </Modal>
//   );
// };

// export default StudentAdmitModal;

import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const StudentAdmitModal = ({
  show,
  handleClose,
  handleAdmit,
  applicationId,
}) => {
  const [batches, setBatches] = useState([]);
  const [status, setStatus] = useState("Admit");
  const [applicationData, setApplicationData] = useState({});
  const [batchData, setBatchData] = useState({});
  useEffect(() => {
    batchOptions();
    const ApplicationData = async (req, res) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/admissions/${applicationId}`
        );
        const data = await response.data;
        // setApplicationData(data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          applicationId: data,
        }));
        console.log(data, 432);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    ApplicationData();
  }, [applicationId]);
  const batchOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/batch/getAllBatches"
      );
      const data = await response.data;
      console.log(data);
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const [formData, setFormData] = useState({
    applicationId: "",
    batch: "",
    roll_no: "",
    fees: [
      {
        amount: "",
        paidamount: "",
        date: "",
        status: "",
        image: "",
      },
    ],
  });

  // function for saving batch data in the student
  const BatchData = async (selectedBatchId) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/batch/${selectedBatchId}`
    );
    const data = await response.data;
    setBatchData(data);
    // setFormData({ ...formData, batch: batchData });

    setFormData((prevFormData) => ({
      ...prevFormData,
      batch: data, // Use the updated batchData from the state
    }));
  };

  // File upload
  const handleFileUpload = (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const updatedFees = [...formData.fees];
          updatedFees[index].image = downloadUrl;
          setFormData((prevFormData) => ({
            ...prevFormData,
            fees: updatedFees,
          }));
        });
      });
    } else {
      console.log("no file selected");
    }
  };

  // Function to add a new fee
  const addFee = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fees: [
        ...prevFormData.fees,
        {
          amount: "",
          paidamount: "",
          date: "",
          status: "",
          image: "",
        },
      ],
    }));
  };

  // Function to handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes("fees")) {
      // Handle changes for fee details
      const updatedFees = [...formData.fees];
      const [feeName, feeIndex, subField] = name.split(".");
      updatedFees[feeIndex][subField] = value;
      setFormData({ ...formData, fees: updatedFees });
    } else {
      // Handle changes for main form fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBatchChange = (e) => {
    const selectedBatchId = e.target.value;
    BatchData(selectedBatchId);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    try {
      // Send form data to the API endpoint

      const response = await axios.post(
        "http://localhost:8000/api/v1/student/create-student",
        formData
      );
      const status = "Admitted";
      console.log("Form submitted successfully!", response.data);
      alert("student added successfully");

      if (status === "Admitted") {
        const response = await axios.put(
          `http://localhost:8000/api/v1/admissions/${applicationId}`,
          {
            status: "Admitted",
          }
        );
        const data = response.data;
        alert("Status changed Successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/* Main form fields */}
          {/* <input
            type="text"
            name="applicationId"
            placeholder={formData.applicationId}
            value={applicationId}
            readOnly
            // onChange={(e) => handleInputChange(e)}
          /> */}
          {/* Dropdown for batches */}
          <select
            name="batch"
            value={formData.batch}
            onChange={handleBatchChange}
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.batchname}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="roll_no"
            placeholder="Roll No"
            value={formData.roll_no}
            onChange={(e) => handleInputChange(e)}
          />

          {/* Fee details */}
          {formData.fees.map((fee, index) => (
            <div key={index}>
              {/* Add fields for fee details */}
              <input
                type="text"
                name={`fees.${index}.amount`}
                placeholder="Amount"
                value={fee.amount}
                onChange={(e) => handleInputChange(e, index)}
              />
              <input
                type="text"
                name={`fees.${index}.paidamount`}
                placeholder="Paid Amount"
                value={fee.paidamount}
                onChange={(e) => handleInputChange(e, index)}
              />
              <input
                type="date"
                name={`fees.${index}.date`}
                placeholder="Date"
                value={fee.date}
                onChange={(e) => handleInputChange(e, index)}
              />
              <input
                type="text"
                name={`fees.${index}.status`}
                placeholder="Status"
                value={fee.status}
                onChange={(e) => handleInputChange(e, index)}
              />
              <input
                type="file"
                name={`fees.${index}.image`}
                onChange={(e) => handleFileUpload(e, index)}
              />

              {index === formData.fees.length - 1 && (
                <button type="button" onClick={addFee}>
                  Add Fee
                </button>
              )}
            </div>
          ))}

          {/* <button type="submit">Submit</button> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Admit Student
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentAdmitModal;
