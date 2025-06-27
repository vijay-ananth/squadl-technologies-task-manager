import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Vijay@123',
  database: 'task_manager'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database.');
});

// Export the **Promise wrapper**
const db = connection.promise();

export default db;
