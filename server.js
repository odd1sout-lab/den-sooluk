const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
  user: 'root',
  password: 'DqdzcXdhMAiFXFtDbsUFNcoEZXDsXuot',
  database: 'railway',
  port:57638
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
      d.capacity_boys,
      d.capacity_girls,
      SUM(CASE WHEN b.gender = 'boy' THEN 1 ELSE 0 END) AS booked_boys,
      SUM(CASE WHEN b.gender = 'girl' THEN 1 ELSE 0 END) AS booked_girls
    FROM date d
    LEFT JOIN booking b ON d.id = b.date_id
    GROUP BY d.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при получении данных о местах:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    } else {
      res.json(results.map(item => ({
        ...item,
        remaining_boys: item.capacity_boys - item.booked_boys,
        remaining_girls: item.capacity_girls - item.booked_girls
      })));
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
