//user: 'supm.kenny@bk.ru',
//pass: 'TkpGe88nk19fBvxpzsvy' 
//user: 'supm.kenny@bk.ru',
//pass: 'TkpGe88nk19fBvxpzsvy' 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(err => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err);
    return;
  }
  console.log('Подключено к базе данных MySQL');
});

app.get('/places', (req, res) => {
  const query = `
    SELECT 
      d.id,
      d.title,
      d.start_date,
      d.end_date,
      d.capacityg,
      COUNT(b.id) AS booked,
      (d.capacityg - COUNT(b.id)) AS remaining
    FROM date d
    LEFT JOIN booking b ON d.id = b.date_id
    GROUP BY d.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при получении данных о местах:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.json(results);
    }
  });
});
app.post('/bookings', (req, res) => {
  const { name, phone, date_id } = req.body;

  const sql = 'INSERT INTO booking (name, phone, date_id) VALUES (?, ?, ?)';
  connection.query(sql, [name, phone, date_id], (err, result) => {
    if (err) {
      console.error('Ошибка при добавлении заявки:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json({ message: 'Заявка добавлена' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
