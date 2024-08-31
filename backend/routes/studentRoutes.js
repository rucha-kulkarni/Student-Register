import express from "express";
import {
  registerStudent,
  addStudentAddress,
  fetchStudents,
  getStudentDetails,
  updateStudentDetails,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router(); // Create a new router instance

// Route to register a new student
router.post("/students/register", registerStudent);

// Route to add an address to an existing student
router.post("/students/:id/add-address", addStudentAddress);

// Route to fetch all students
router.get("/students", fetchStudents);

// Route to get details of a specific student by ID
router.get("/students/:id", getStudentDetails);

// Route to update student details by ID
router.put("/students/:id", updateStudentDetails);

// Route to delete a student by ID
router.delete("/students/:id", deleteStudent);

export default router;
