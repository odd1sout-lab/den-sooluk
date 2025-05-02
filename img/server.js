//user: 'supm.kenny@bk.ru',
//pass: 'TkpGe88nk19fBvxpzsvy' 
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ТВОЙ_ПАРОЛЬ",
  database: "den_sooluk"
});

app.post("/add_user", (req, res) => {
  const { name, phone, date_group, status } = req.body;
  const sql = `INSERT INTO registrations (name, phone, date_group, status) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, phone, date_group, status], (err) => {
    if (err) return res.status(500).send("Ошибка при записи.");
    res.send("Участник добавлен.");
  });
});

app.get("/counts", (req, res) => {
  const sql = `SELECT date_group, COUNT(*) AS total FROM registrations WHERE status = 'оплачено' GROUP BY date_group`;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).send("Ошибка при запросе.");
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("Сервер на http://localhost:3000");
});
