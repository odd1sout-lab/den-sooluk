CREATE TABLE IF NOT EXISTS date (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(10),
  start_date DATE,
  end_date DATE,
  capacity INT DEFAULT 20
);

CREATE TABLE IF NOT EXISTS booking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  date_id INT,
  FOREIGN KEY (date_id) REFERENCES date(id)
);

-- Добавление заездов
INSERT INTO date (title, start_date, end_date, capacity) VALUES
('I', '2025-06-26', '2025-07-05', 20),
('II', '2025-07-05', '2025-07-14', 20),
('III', '2025-07-14', '2025-07-23', 20),
('IV', '2025-07-23', '2025-08-01', 20),
('V', '2025-08-01', '2025-08-10', 20),
('VI', '2025-08-10', '2025-08-19', 20),
('VII', '2025-08-19', '2025-08-28', 20);
