import React from "react";
import "../../styles/AddressSection.css";

const StudentSelect = ({
  students,
  selectedStudent,
  setSelectedStudent,
  handleReviewClick,
  handleAddAddressClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  // Handle change in student selection
  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  return (
    <div className="input-section">
      {/* Dropdown to select a student */}
      <select value={selectedStudent} onChange={handleStudentChange}>
        <option value="">Select Student</option>
        {students.length > 0 ? (
          students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))
        ) : (
          // Display when no students are registered
          <option value="" disabled>
            No students registered
          </option>
        )}
      </select>

      {/* Action buttons for review, add address, edit, and delete */}
      <div className="buttons">
        <button onClick={handleReviewClick} disabled={students.length === 0}>
          Review
        </button>
        <button onClick={handleAddAddressClick} disabled={!selectedStudent}>
          Add Address
        </button>
        <button onClick={handleEditClick} disabled={!selectedStudent}>
          Edit
        </button>
        <button
          className="delete"
          onClick={handleDeleteClick}
          disabled={students.length === 0}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentSelect;