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

//GET
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// POST
app.post('/api/reviews', (req, res) => {
  const { email, product_id, rating, review_text } = req.body;
  if (!email || !product_id) return res.status(400).json({ error: 'Email and product are required' });

  // insert
  db.query('INSERT IGNORE INTO users (email) VALUES (?)', [email], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to insert user' });

    //get user_id
    db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
      if (err || results.length === 0) return res.status(500).json({ error: 'User lookup failed' });
      const user_id = results[0].id;

      // insert or update review
      const query = `INSERT INTO reviews (user_id, product_id, rating, review_text)
                     VALUES (?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE rating = ?, review_text = ?`;
      const values = [user_id, product_id, rating || null, review_text || null, rating || null, review_text || null];

      db.query(query, values, (err) => {
        if (err) return res.status(500).json({ error: 'Review submit failed' });
        res.json({ message: 'Review submitted or updated!' });
      });
    });
  });
});

// DELETE 
app.delete('/api/reviews', (req, res) => {
  const { email, product_id } = req.body;
  if (!email || !product_id) return res.status(400).json({ error: 'Email and product required' });

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });
    const user_id = results[0].id;

    db.query('DELETE FROM reviews WHERE user_id = ? AND product_id = ?', [user_id, product_id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Delete failed' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'No review found to delete' });
      res.json({ message: 'Review deleted successfully' });
    });
  });
});

// Product summary
app.get('/api/product-summary', (req, res) => {
  const query = `
    SELECT p.id AS product_id, p.name AS product_name,
           ROUND(AVG(r.rating), 1) AS average_rating,
           GROUP_CONCAT(r.review_text SEPARATOR ' ||| ') AS reviews
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    GROUP BY p.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch summary' });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
