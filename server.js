const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

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
      'SELECT * FROM users WHERE username = ? AND password = ?',
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

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // username이 이미 사용 중인지 확인
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    const [rows1] = await connection.execute(
      'SELECT id FROM users ORDER BY id DESC LIMIT 1;'
    );
    const id = rows1[0].id +1;

    if (rows.length > 0) {
      // 이미 사용 중인 경우
      res.status(400).json({ message: 'Username already in use' });
      return;
    }
    // 새로운 계정 생성

    await connection.execute('INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)', [
      id,
      username,
      password,
      email
    ]);

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3002, () => {
  console.log('Server listening on port 3002');
});