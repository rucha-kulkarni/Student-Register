import db from "../config/dbConfig.js";

// Fetch all students with selected fields
export const getStudents = async () => {
  const [rows] = await db.execute(
    "SELECT id, firstName, lastName FROM studentdb.students"
  );
  return rows;
};

// Get a specific student by ID with detailed fields
export const getStudentById = async (studentId) => {
  const query = `
    SELECT id, firstName, lastName, dateOfBirth, email, mobileNumber, 
           address1, address2, address3 
    FROM studentdb.students WHERE id = ?
  `;
  const [rows] = await db.execute(query, [studentId]);
  return rows[0];
};

// Update student details by ID
export const updateStudentById = async (studentId, updatedData) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    mobileNumber,
    address1,
    address2,
    address3,
  } = updatedData;

  // Extract the date part (YYYY-MM-DD) from the full date
  const formattedDate = dateOfBirth.split("T")[0];

  const query = `
  UPDATE studentdb.students
  SET firstName = ?, lastName = ?, dateOfBirth = ?, email = ?, mobileNumber = ?, address1 = ?, address2 = ?, address3 = ?
  WHERE id = ?
`;

  await db.execute(query, [
    firstName,
    lastName,
    formattedDate,
    email,
    mobileNumber,
    address1 || null,
    address2 || null,
    address3 || null,
    studentId,
  ]);
};

// Delete a student by ID
export const deleteStudentById = async (studentId) => {
  const query = "DELETE FROM studentdb.students WHERE id = ?";
  const [result] = await db.execute(query, [studentId]);
  return result;
};

// Find the next available address column for a student
export const findNextAvailableAddressColumn = async (student, studentId) => {
  const columns = Object.keys(student);
  let addressColumn = null;
  let counter = 1;

  // Loop through up to 3 possible address columns
  while (counter <= 3) {
    const columnName = `address${counter}`;

    if (!columns.includes(columnName)) {
      // Add a new address column if it doesn't exist
      await db.execute(
        `ALTER TABLE students ADD COLUMN ${columnName} VARCHAR(255)`
      );
      addressColumn = columnName;
      break; // Stop once a new column is added
    } else if (!student[columnName]) {
      // Use an existing but empty address column
      addressColumn = columnName;
      break; // Stop once an empty column is found
    }
    counter++;
  }

  return addressColumn;
};

// Add an address to the specified address column for a student
export const addAddress = async (studentId, address, addressColumn) => {
  const updateQuery = `UPDATE students SET ${addressColumn} = ? WHERE id = ?`;
  await db.execute(updateQuery, [address, studentId]);
};
