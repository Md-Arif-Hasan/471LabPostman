CREATE DATABASE IF NOT EXISTS cms_app;
USE cms_app;
CREATE TABLE IF NOT EXISTS contents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  author VARCHAR(100) DEFAULT 'Anonymous',
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO contents (title, body, author, status) VALUES
  ('Welcome to our blog', 'First post on the new CMS.', 'Admin', 'published'),
  ('Lab 04: Express + Postman', 'Build two APIs and test them in Postman.', 'CSE470', 'draft');
