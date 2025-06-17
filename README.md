# Ratings & Review System 📦✨

This is a full-stack application that allows users to submit, update, and delete reviews for products. It displays real-time ratings and average review summaries for each product.

---

## 🌟 Features

- View product list with average ratings and reviews.
- Submit or edit a review using email.
- Delete a review by email and product.
- Real-time UI updates using React.
- MySQL-powered backend for persistent storage.

---

## ⚙️ Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MySQL

---

## 🛠️ Setup Instructions

### 1. Backend Setup

#### ✅ Prerequisites
- Node.js
- MySQL Server

#### 📁 Backend File Structure

```
project/
│
├── db.js
├── server.js
├── package.json
```

#### 📄 db.js

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
```

#### 📄 server.js

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

// API routes here...
// (GET /api/products, POST /api/reviews, DELETE /api/reviews, GET /api/product-summary)

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

#### 🧱 MySQL Schema

```sql
CREATE DATABASE ratings_db;

USE ratings_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  rating INT,
  review_text TEXT,
  UNIQUE KEY unique_review (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample products
INSERT INTO products (name) VALUES ('iPhone 15'), ('Samsung Galaxy S23'), ('OnePlus 12');
```

#### ▶️ Run Backend

```bash
npm install
npm start
```

---

### 2. Frontend Setup

#### 📁 React Folder Structure

```
frontend/
│
├── public/
├── src/
│   ├── App.js
│   └── index.js
├── package.json
```

#### 📄 App.js (Core Functionality)

```js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // full app code here...
}

export default App;
```

#### ▶️ Run Frontend

```bash
npm install
npm start
```

---

## 📸 Screenshots

> Add the screenshots below using this format:

```
![Screenshot 1](screenshots/home.png)
```
---

## 🙌 Author

**Harshita Dutta**

---

