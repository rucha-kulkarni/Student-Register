import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Create a connection pool with database configuration
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.getConnection()
  .then((connection) => {
    console.log("Connected to the MySQL database");
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("Error connecting to the MySQL database:", err);
  });

export default db;
