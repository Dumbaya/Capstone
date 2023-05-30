const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { async } = require('q');
const upload = multer({dest : 'public/uploads/'});

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

//구글 로그인
app.post('/googlelogin', async (req, res) => {
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

    let id = 0;
    if (rows1.length > 0) {
      id = rows1[0].id + 1;
    }
  
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
        res.json({ success: true });
      })
      .catch((error) => {
        console.error('Error inserting user data into MySQL:', error);
        res.json({ success: false });
      });
      })
      .catch((error) => {
        console.error('Error hashing password:', error);
        res.json({ success: false });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    res.json({ success: false });
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

    let id = 0;
    if (rows1.length > 0) {
      id = rows1[0].id + 1;
    }

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
        res.json({ success: true });
      })
      .catch((error) => {
        console.error('Error inserting user data into MySQL:', error);
        res.json({ success: false });
      });
  })
  .catch((error) => {
    console.error('Error hashing password:', error);
    res.json({ success: false });
  });

    res.json({ success: true });
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
  const { user_name, food_name, state, registration_date, last_process_date, expiration_date, size, image, user_board_number} = req.body;

  try {
    const connection = await pool.getConnection(); // 데이터베이스 연결 생성
    await connection.execute(
      'INSERT INTO user_food_resources (user_name, food_name, state, registration_date, last_process_date, expiration_date, size, image, user_board_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        user_name,
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

//자유게시판
app.get('/freeboard', async (req, res) => {
  try {
    // 게시판 데이터 가져오기
    const [rows] = await pool.query('SELECT id, title, author, date , views FROM free_notice_board');

    // 가져온 데이터 응답으로 전송
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Q&A게시판
app.get('/qaboard', async (req, res) => {
  try {
    // 게시판 데이터 가져오기
    const [rows] = await pool.query('SELECT id, thread_id, author, qa_type, title, date FROM qa');

    // 가져온 데이터 응답으로 전송
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//자유게시글 작성
app.post('/freeboardwrite', upload.array('images', 5), async(req, res) => {
  const connection = await pool.getConnection();
  const post_content = req.body.content;
  const images = req.files;
  const title = req.body.title;
  const author = req.body.author;

  //free_notice_board 데이터베이스에 저장
  const [rows] = await connection.execute(
    'SELECT id FROM free_notice_board ORDER BY id DESC LIMIT 1;'
  );

  let id = 0;
  if (rows.length > 0) {
    id = rows[0].id + 1;
  }

  const date = new Date();
  
  let views = 0;

  await connection.query('INSERT INTO free_notice_board (id, title, author, date, views) VALUES (?, ?, ?, ?, ?)', [id, title, author, date, views]);

  // content를 데이터베이스에 저장
  const [rows1] = await connection.query(
    'SELECT post_id FROM board_post ORDER BY post_id DESC LIMIT 1;'
  );

  let post_id = 0;
  if (rows1.length > 0) {
    post_id = rows1[0].post_id + 1;
  }

  await connection.query('INSERT INTO board_post (post_id, board_id, post_content) VALUES (?, ?, ?)', [post_id, id, post_content], (error, results) => {
    if (error) {
      console.error('Error inserting content:', error);
      res.status(500).json({ success: false, message: 'Failed to insert content' });
      return;
    }else{
      res.status(200).json({ success: true, message: 'Board post created successfully' });
    }
  })

  // images를 데이터베이스에 저장
  const imageUrls = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageUrl = 'public/uploads/${image.filename}';

    const [rows2] = await connection.query(
      'SELECT image_id FROM image ORDER BY image_id DESC LIMIT 1;'
    );
    
    let image_id = 0;
    if (rows2.length > 0) {
      image_id = rows2[0].image_id + 1;
    }
  
    // 이미지 파일 경로를 데이터베이스에 저장
    await connection.query('INSERT INTO image (image_id, post_id, image_path) VALUES (?, ?, ?)', [image_id, post_id, imageUrl], (error, results) => {
      if (error) {
        console.error('Error inserting image:', error);
        res.status(500).json({ success: false, message: 'Failed to insert image' });
        return;
      }
  
      res.status(200).json({ success: true, message: 'Board post created successfully' });
    });
  }
  res.status(200).json({ success: true, message: 'Board post created successfully' });
});

//자유게시글 읽기
app.get('/freeBoard/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Received ID:', id);
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, title, author, date FROM free_notice_board WHERE id = ?', [id]);

    if(rows.length > 0){
      const [rows1] = await connection.query('SELECT post_id, post_content FROM board_post WHERE board_id = ?', [id]);

      const [rows2] = await connection.query('SELECT image_id FROM image WHERE post_id = ?', [rows1[0].post_id]);

      const freeboard = {
        id: rows[0].id,
        title: rows[0].title,
        author: rows[0].author,
        date: rows[0].date,
        content: rows1[0].post_content,
        image: rows2[0].image_id
      };
      res.json(freeboard);
    }
    // 조회된 게시글이 없을 경우 예외 처리
    else{
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

//자유게시판 삭제
app.delete('/freeBoard/:id', async (req, res) => {
  const postId = req.params.id;
  
  try {
    // 게시물 삭제 로직 구현
    // 예: DB에서 해당 postId를 가진 게시물을 삭제하는 코드 작성
    const result = await db.query('DELETE FROM freeboard WHERE id = ?', [postId]);
    
    if (result.affectedRows === 0) {
      // 삭제할 게시물이 없는 경우
      return res.status(404).json({ error: '삭제할 게시물이 없습니다.' });
    }
    
    // 게시물 삭제 성공 응답
    return res.json({ message: '게시물이 삭제되었습니다.' });
  } catch (error) {
    console.error('게시물 삭제에 실패했습니다:', error);
    return res.status(500).json({ error: '게시물 삭제에 실패했습니다.' });
  }
});

app.listen(3002, () => {
  console.log('Server listening on port 3002');
});