const mysql = require('mysql2');

// Create a MySQL connection using sensible defaults
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Change this if your local setup is different
  database: 'ratings_db'
});

// Connect to MySQL and handle connection errors gracefully
db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.stack);
    return;
  }
  console.log('✅ Successfully connected to MySQL!');
});

module.exports = db;
