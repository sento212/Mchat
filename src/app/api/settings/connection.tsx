import mysql from "mysql2/promise";

export function Conn() {
  const pool = mysql.createPool({
    // Replace with your database connection details
    host: "localhost",
    user: "",
    password: "",
    database: "test",
  });
  return pool;
}
