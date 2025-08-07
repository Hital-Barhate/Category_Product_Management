const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hital@123',
  database: 'nimap',
  port:3307
});
conn.connect(err => {
  if (err) throw err;
  console.log('DB connected');
});
module.exports = conn;
