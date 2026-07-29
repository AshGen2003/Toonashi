// src/lib/db.ts
import mysql from 'mysql2/promise';

// Create a connection pool instead of a single connection.
// This is better for performance and Next.js serverless environments.
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Optional: Connection limits
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: Test the connection when this file loads (for debugging)
/* pool.getConnection()
  .then((conn) => {
    console.log("✅ Connected to MySQL Database");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
  });
*/
