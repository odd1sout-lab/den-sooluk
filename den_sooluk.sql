CREATE DATABASE den_sooluk;

USE den_sooluk;

CREATE TABLE date (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(10),
  start_date DATE,
  end_date DATE
);
CREATE TABLE bron (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  zaezd_id INT,
  FOREIGN KEY (zaezd_id) REFERENCES zaezdy(id)
);
INSERT INTO date (title, start_date, end_date) VALUES
('I', '2025-06-26', '2025-07-05'),
('II', '2025-07-05', '2025-07-14'),
('III', '2025-07-14', '2025-07-23'),
('IV', '2025-07-23', '2025-08-01'),
('V', '2025-08-01', '2025-08-10'),
('VI', '2025-08-10', '2025-08-19'),
('VII', '2025-08-19', '2025-08-28');

UPDATE date
SET start_date = '10-05-2025', end_date = '20-05-2025'
WHERE title = 'I';

ALTER TABLE date ADD COLUMN capacityg INT DEFAULT 15;

CREATE TABLE booking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_id INT, -- ссылка на id из таблицы date
  name VARCHAR(100),
  phone VARCHAR(20),
  -- другие поля заявки
  FOREIGN KEY (date_id) REFERENCES date(id)
);

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
GROUP BY d.id;

