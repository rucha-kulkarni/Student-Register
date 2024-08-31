import React, { useState } from "react";
import "../../styles/AddressSection.css";
import axios from "axios";
import StudentSelect from "./StudentSelect";
import StudentDetails from "./StudentDetails";
import AddressForm from "./AddressForm";

const AddressSection = ({ students, setStudents, fetchStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [addingAddress, setAddingAddress] = useState(false);
  const [messageTimeout, setMessageTimeout] = useState(null);

  // Clear message after 5 seconds
  const timeoutId = setTimeout(() => {
    setMessage("");
  }, 5000);

  // Handle the 'Review' button click to fetch student details
  const handleReviewClick = async () => {
    if (messageTimeout) clearTimeout(messageTimeout);
    if (!selectedStudent) {
      setMessage("Please select a student.");
      setMessageTimeout(timeoutId); // Store the timeout ID
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/${selectedStudent}`
      );
      setStudentDetails(response.data);
      setMessage("");
      setAddingAddress(false); // Hide address form if shown
    } catch (error) {
      setMessage("Error fetching student details.");
    }
  };

  // Handle the 'Edit' button click to update student details
  const handleEditClick = async () => {
    if (messageTimeout) clearTimeout(messageTimeout);
    if (!studentDetails) {
      setMessage("No student details to edit.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${studentDetails.id}`,
        studentDetails
      );

      if (response.status === 200) {
        setMessage("Student details updated successfully!");
        fetchStudents(setStudents); // Refresh the student list
      } else {
        setMessage("Failed to update student details.");
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      setMessage("Error updating student details.");
    }
    setMessageTimeout(timeoutId);
  };

  // Handle the 'Delete' button click to delete a student
  const handleDeleteClick = async () => {
    if (messageTimeout) clearTimeout(messageTimeout);
    if (!selectedStudent) {
      setMessage("Please select a student.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/students/${selectedStudent}`
      );

      if (response.status === 200) {
        setMessage("Student deleted successfully!");
        setStudents(
          students.filter((student) => student.id !== selectedStudent)
        );
        setStudentDetails(null); // Clear student details after deletion
        fetchStudents(setStudents); // Refresh the student list
      } else {
        setMessage("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      setMessage("Error deleting student.");
    }
    setMessageTimeout(timeoutId);
  };

  // Handle 'Add Address' button click to show the address form
  const handleAddAddressClick = () => {
    setAddingAddress(true);
  };

  // Handle the 'Done' button click in the address form
  const handleAddAddressDone = async (studentId, address) => {
    if (messageTimeout) clearTimeout(messageTimeout);
    if (!newAddress) {
      setMessage("Address cannot be empty.");
      return;
    }
    console.log(studentId);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/students/${studentId}/add-address`,
        { address }
      );
      console.log("Address added successfully:", response.data);

      if (response.status === 200) {
        setMessage("Address added successfully!");
        setAddingAddress(false); // Hide address form
        setNewAddress(""); // Clear the text area
        handleReviewClick(); // Fetch updated student details
      } else {
        setMessage("Failed to add address.");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      setMessage("Error adding address.");
    }
    setMessageTimeout(timeoutId);
  };

  // Cancel the address form (hide the form and reset the input)
  const handleCancelAddress = () => {
    setAddingAddress(false);
    setNewAddress(""); // Reset the address input
  };

  // Cancel student details view (clear details and selection)
  const handleCancelDetails = () => {
    setStudentDetails(null);
    setSelectedStudent("");
  };

  return (
    <div className="address-section">
      <h3>Review Or Edit Student Details</h3>
      <StudentSelect
        students={students}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        handleReviewClick={handleReviewClick}
        handleAddAddressClick={handleAddAddressClick}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      {studentDetails && (
        <StudentDetails
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          handleCancel={handleCancelDetails}
        />
      )}
      {addingAddress && (
        <AddressForm
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          message={message}
          handleAddAddressDone={handleAddAddressDone}
          handleCancel={handleCancelAddress}
          studentId={selectedStudent}
        />
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddressSection;
