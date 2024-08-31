import React, { useEffect, useState } from "react";
import "./styles/main.css";
import AddressSection from "./components/InfoSection/AddressSection";
import RegistrationForm from "./components/RegistrationForm";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  // Fetch the list of students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <RegistrationForm
        setStudents={setStudents}
        fetchStudents={fetchStudents}
      />
      <AddressSection
        students={students}
        setStudents={setStudents}
        fetchStudents={fetchStudents}
      />
    </div>
  );
};

export default App;
