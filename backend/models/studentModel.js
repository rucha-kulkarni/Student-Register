import db from "../config/dbConfig.js";

// Function to create a new student in the database
export const createStudent = async (studentData) => {
  const { firstName, lastName, dateOfBirth, email, mobile } = studentData;

  // SQL query to insert a new student record
  const query = `
    INSERT INTO studentdb.students (firstName, lastName, dateOfBirth, email, mobileNumber)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.execute(query, [
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobile,
    ]);

    console.log("SQL Query Result:", result);
    return result;
  } catch (error) {
    console.error("SQL Error:", error);
    throw error;
  }
};
