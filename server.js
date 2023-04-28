const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'hoseo1234',
  password: 'hoseo12!',
  database: 'hoseo1234'
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM categories WHERE name = ? AND id = ?',
      [username, password]
    );
    connection.release();
    if (rows.length === 1) {
      req.session.username = username;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3002, () => {
  console.log('Server listening on port 3002');
});