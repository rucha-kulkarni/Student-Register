import { createStudent } from "../models/studentModel.js";
import db from "../config/dbConfig.js";
import {
  addAddress,
  getStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  findNextAvailableAddressColumn,
} from "../models/addressModel.js";

export const registerStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const result = await createStudent(studentData); // Save student data to the database

    // Fetch the newly created student by its insertId
    const [newStudent] = await db.execute(
      "SELECT id, firstName, lastName FROM studentdb.students WHERE id = ?",
      [result.insertId] 
    );

    res.status(201).json({
      message: "Student registered successfully!",
      student: newStudent,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Failed to register student." });
  }
};

// Fetch all students
export const fetchStudents = async (req, res) => {
  try {
    const students = await getStudents(); // Retrieve all students from the database
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get details of a specific student by ID
export const getStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await getStudentById(studentId); // Fetch student by ID
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};

// Update details of a specific student by ID
export const updateStudentDetails = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body;
    await updateStudentById(studentId, updatedData); // Update student details in the database
    res.json({ message: "Student details updated successfully!" });
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ error: "Failed to update student details" });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log("Deleting student with ID:", studentId);

    const result = await deleteStudentById(studentId); // Delete student from the database
    if (result.affectedRows > 0) {
      res.json({ message: "Student deleted successfully!" });
    } else {
      res.status(404).json({ error: "Student not found." });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student." });
  }
};

// Add an address for a specific student by ID
export const addStudentAddress = async (req, res) => {
  const studentId = req.params.id;
  const { address } = req.body;

  try {
    // Check if the student exists in the database
    const [student] = await db.execute("SELECT * FROM students WHERE id = ?", [
      studentId,
    ]);
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the next available address column
    const addressColumn = await findNextAvailableAddressColumn(
      student[0],
      studentId
    );

    if (!addressColumn) {
      return res
        .status(400)
        .json({ message: "No available address columns left" });
    }

    // Add the new address to the available column
    await addAddress(studentId, address, addressColumn);

    res.status(200).json({ message: "Address added successfully!" });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Failed to add address" });
  }
};
