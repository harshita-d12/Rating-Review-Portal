# 📦✨ Ratings & Review System

A full-stack MERN application that allows users to submit, update, and delete reviews for products. It displays real-time ratings and average summaries per product using a modern UI and a MySQL backend.

## 🏷️ Badges

![GitHub Stars](https://img.shields.io/github/stars/your-username/your-repo-name)
![License](https://img.shields.io/github/license/your-username/your-repo-name)
![Top Language](https://img.shields.io/github/languages/top/your-username/your-repo-name)
![Last Commit](https://img.shields.io/github/last-commit/your-username/your-repo-name)

## ⚙️ Tech Stack

- React  
- Bootstrap  
- Node.js  
- Express  
- MySQL

## 🌟 Features

- ⭐ View product list with average ratings and reviews  
- 📝 Submit or edit a review using email  
- ❌ Delete a review by email and product  
- 💾 MySQL-powered backend for persistent storage  

## 🛠️ Setup Instructions

### 📦 Backend Setup

#### ✅ Prerequisites

- Node.js  
- MySQL Server  

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
---

---

### `server.js`

```js
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


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
