const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('🎉 Ratings and Review API is running!');
});

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch products.' });
    res.json(results);
  });
});

// Submit or update a review
app.post('/api/reviews', (req, res) => {
  const { email, product_id, rating, review_text } = req.body;

  if (!email || !product_id) {
    return res.status(400).json({ error: 'Email and Product ID are required.' });
  }

  db.query('INSERT IGNORE INTO users (email) VALUES (?)', [email], (err) => {
    if (err) return res.status(500).json({ error: 'Could not register user.' });

    db.query('SELECT id FROM users WHERE email = ?', [email], (err, userResult) => {
      if (err || userResult.length === 0) {
        return res.status(500).json({ error: 'User lookup failed.' });
      }

      const userId = userResult[0].id;

      const sql = `
        INSERT INTO reviews (user_id, product_id, rating, review_text)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          rating = VALUES(rating),
          review_text = VALUES(review_text)
      `;
      const values = [userId, product_id, rating || null, review_text || null];

      db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ error: 'Could not submit review.' });
        res.json({ message: '✅ Review submitted or updated successfully!' });
      });
    });
  });
});

// Delete a review
app.delete('/api/reviews', (req, res) => {
  const { email, product_id } = req.body;

  if (!email || !product_id) {
    return res.status(400).json({ error: 'Email and Product ID are required.' });
  }

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userId = result[0].id;

    db.query('DELETE FROM reviews WHERE user_id = ? AND product_id = ?', [userId, product_id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to delete review.' });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No matching review found.' });
      }

      res.json({ message: '🗑️ Review deleted successfully.' });
    });
  });
});

// Get product summaries
app.get('/api/product-summary', (req, res) => {
  const summaryQuery = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      ROUND(AVG(r.rating), 1) AS average_rating,
      GROUP_CONCAT(r.review_text SEPARATOR ' ||| ') AS reviews
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    GROUP BY p.id
  `;

  db.query(summaryQuery, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve product summaries.' });
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
