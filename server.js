const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

//로그인
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await pool.getConnection();

    const sql = 'SELECT * FROM users WHERE username = ?';
  const values = [username];

  pool.execute(sql, values)
  .then(([rows]) => {
    if (rows.length === 1) {
      const user = rows[0];
      const hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword)
      .then((result) => {
        if (result) {
          console.log('Login successful');
          req.session.username = username;
          res.json({ success: true });
        } else {
          console.log('Invalid password');
          res.json({ success: false });
        }
      })
      .catch((error) => {
        console.error('Error comparing passwords:', error);
      });
    }
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//일반 회원가입
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // username이 이미 사용 중인지 확인
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    const [rows_0] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const [rows1] = await connection.execute(
      'SELECT id FROM users ORDER BY id DESC LIMIT 1;'
    );
    const id = rows1[0].id + 1;
  
    if (rows.length > 0) {
      // 이미 사용 중인 경우
      res.status(400).json({ message: 'Username already in use' });
      return;
    }

    if (rows_0.length > 0) {
      // 이미 사용 중인 경우
      res.status(400).json({ message: 'Username already in use' });
      return;
    }


    // 새로운 계정 생성

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
  .then((hashedPassword) => {
    const sql = 'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)';
    const values = [id, username, hashedPassword, email];

    pool.execute(sql, values)
      .then(() => {
        console.log('User data inserted into MySQL');
      })
      .catch((error) => {
        console.error('Error inserting user data into MySQL:', error);
      });
  })
  .catch((error) => {
    console.error('Error hashing password:', error);
  });

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//구글 회원가입
app.post('/signup/google', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // username이 이미 사용 중인지 확인
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    const [rows_0] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const [rows1] = await connection.execute(
      'SELECT id FROM users ORDER BY id DESC LIMIT 1;'
    );
    const id = rows1[0].id + 1;

    if (rows.length > 0) {
      // 이미 사용 중인 경우
      res.status(400).json({ message: 'Username already in use' });
      return;
    }
    if (rows_0.length > 0) {
      // 이미 사용 중인 경우
      res.status(400).json({ message: 'Username already in use' });
      return;
    }
    // 새로운 계정 생성

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
  .then((hashedPassword) => {
    const sql = 'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)';
    const values = [id, username, hashedPassword, email];

    pool.execute(sql, values)
      .then(() => {
        console.log('User data inserted into MySQL');
      })
      .catch((error) => {
        console.error('Error inserting user data into MySQL:', error);
      });
  })
  .catch((error) => {
    console.error('Error hashing password:', error);
  });

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//냉장고 리스트에서 카테고리들 불러오는 용도
app.get('/categories', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT id,name FROM categories');
    connection.release();
    const categories = rows.map((row) => {
      return {
        id: row.id,
        name: row.name
      };
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 카테고리에 따른 소카테고리 불러오기  
app.get('/food_resources', async (req, res) => {
  try {
    const categoryId = req.query.category_id;
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM food_resources WHERE category_id = ?',
      [categoryId]
    );
    connection.release();
    const subCategories = rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
        recommended_shelf_life: row.recommended_shelf_life,
        category_id: row.category_id
      };
    });
    res.json(subCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//냉장고 리스트 입력값을 저장하기
app.post('/user_food_resources', async (req, res) => {
  const { user_id, food_name, state, registration_date, last_process_date, expiration_date, size, image, user_board_number} = req.body;

  try {
    const connection = await pool.getConnection(); // 데이터베이스 연결 생성
    await connection.execute(
      'INSERT INTO user_food_resources (user_id, food_name, state, registration_date, last_process_date, expiration_date, size, image, user_board_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        user_id,
        food_name,
        state,
        registration_date,
        last_process_date,
        expiration_date,
        size,
        image,
        user_board_number
    ]);
    connection.release(); // 연결 해제

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//게시판
app.get('/freeboard', async (req, res) => {
  try {
    // 게시판 데이터 가져오기
    const [rows] = await pool.query('SELECT id, title, author, date, views FROM free_notice_board');

    // 가져온 데이터 응답으로 전송
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3002, () => {
  console.log('Server listening on port 3002');
});