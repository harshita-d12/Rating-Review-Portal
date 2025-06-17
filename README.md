# Ratings & Review System 📦✨

A full-stack MERN application that allows users to submit, update, and delete reviews for products. It displays real-time ratings and average summaries per product using a modern UI and a MySQL backend.
## ⚙️ Tech Stack

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?logo=bootstrap&logoColor=white&style=for-the-badge)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=for-the-badge)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge)
## 🌟 Features

- ⭐ View product list with average ratings and reviews.
- 📝 Submit or edit a review using email.
- ❌ Delete a review by email and product.
- 💾 MySQL-powered backend for persistent storage.

## 🛠️ Setup Instructions

### 📦 Backend Setup

#### ✅ Prerequisites
- Node.js
- MySQL Server

#### 📁 Folder Structure

#### 🔧 Configuration

**`db.js`**
```js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ratings_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Ratings and Review API is running!');
});

// API routes here...
// (GET /api/products, POST /api/reviews, DELETE /api/reviews, GET /api/product-summary)

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
npm install
npm start
frontend/
│
├── public/
├── src/
│   ├── App.js
│   └── index.js
├── package.json
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // full app code here...
}

export default App;
npm install
npm start
## 🗃️ Database Schema

Below is the SQL schema to set up the database in MySQL Workbench or CLI:

```sql
-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS ratings_db;
USE ratings_db;

-- Step 2: Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Step 3: Products Table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Step 4: Reviews Table
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_review (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Step 5: Insert Sample Products
INSERT INTO products (name) VALUES
('Phone'),
('Laptop'),
('Headphones');
## 📸 Screenshots

Here’s a glimpse of the project UI:

### 🏠 Homepage
![Homepage](./screenshots/home.png)

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mysql,js,html,css,bootstrap" alt="Tech Stack" />
</p>
### 🎥 Demo (GIF)
![Demo](./screenshots/demo.gif)


