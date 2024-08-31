import React, { useState } from "react";
import axios from "axios";
import "../styles/RegistrationForm.css";

const RegistrationForm = ({ setStudents, fetchStudents }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
  });

  // State to manage feedback messages
  const [message, setMessage] = useState("");
  const [messageTimeout, setMessageTimeout] = useState(null);

  // Handle input field changes and update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear existing message timeout if present
    if (messageTimeout) clearTimeout(messageTimeout);

    try {
      // Post form data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/students/register",
        formData
      );

      if (response.status === 201) {
        setMessage(response.data.message);
        console.log(setStudents);
        fetchStudents(setStudents); // Refresh the students list immediately
      }
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        mobile: "",
      });
    } catch (error) {
      // Handle registration failure
      setMessage("Failed to register student.");
    }

    // Set a timeout to clear the message after 3 seconds
    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 5000);

    setMessageTimeout(timeoutId); // Store the timeout ID
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Student Registration</h2>

        {/* Input fields for student details */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>

      {/* Display feedback message */}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default RegistrationForm;
