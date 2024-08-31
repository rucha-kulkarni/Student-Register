import React from "react";
import "../../styles/AddressSection.css";

const StudentDetails = ({
  studentDetails,
  setStudentDetails,
  handleCancel,
}) => {
  // Function to format the date into 'YYYY-MM-DD' format for the input field
  const formatDate = (date) => {
    if (!date) return ""; // Handle empty or undefined date
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="details-section">
      <h3>Student Details</h3>
      <div className="detail-fields">
        <div>
          {/* Input for first name */}
          <label>First Name</label>
          <input
            type="text"
            value={studentDetails.firstName}
            onChange={(e) =>
              setStudentDetails({
                ...studentDetails,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div>
          {/* Input for last name */}
          <label>Last Name</label>
          <input
            type="text"
            value={studentDetails.lastName}
            onChange={(e) =>
              setStudentDetails({ ...studentDetails, lastName: e.target.value })
            }
          />
        </div>
        <div>
          {/* Input for date of birth */}
          <label>Birth Date</label>
          <input
            type="date"
            value={formatDate(studentDetails.dateOfBirth)}
            onChange={(e) =>
              setStudentDetails({
                ...studentDetails,
                dateOfBirth: e.target.value,
              })
            }
          />
        </div>
        <div>
          {/* Input for email */}
          <label>Email Address</label>
          <input
            type="email"
            value={studentDetails.email}
            onChange={(e) =>
              setStudentDetails({ ...studentDetails, email: e.target.value })
            }
          />
        </div>
        <div>
          {/* Input for mobile number */}
          <label>Mobile Number</label>
          <input
            type="text"
            value={studentDetails.mobileNumber}
            onChange={(e) =>
              setStudentDetails({
                ...studentDetails,
                mobileNumber: e.target.value,
              })
            }
          />
        </div>

        <div>
          {/* Inputs for addresses if they exist */}
          <label>Address1 </label>
          {studentDetails.address1 && (
            <input
              type="text"
              value={studentDetails.address1 || ""}
              placeholder="Address 1"
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  address1: e.target.value,
                })
              }
            />
          )}
        </div>
        <div>
          <label>Address2 </label>
          {studentDetails.address2 && (
            <input
              type="text"
              value={studentDetails.address2 || ""}
              placeholder="Address 2"
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  address2: e.target.value,
                })
              }
            />
          )}
        </div>
        <div>
          <label>Address3 </label>
          {studentDetails.address3 && (
            <input
              type="text"
              value={studentDetails.address3 || ""}
              placeholder="Address 3"
              onChange={(e) =>
                setStudentDetails({
                  ...studentDetails,
                  address3: e.target.value,
                })
              }
            />
          )}
        </div>
      </div>

      {/* Cancel button to revert the changes */}
      <button className="cancel" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default StudentDetails;
