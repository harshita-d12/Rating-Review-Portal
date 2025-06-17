import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState([]);
  const [form, setForm] = useState({
    email: '',
    product_id: '',
    rating: '',
    review_text: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(setProducts);

    fetch('http://localhost:5000/api/product-summary')
      .then(res => res.json())
      .then(setSummary);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    if (data.message) setTimeout(() => window.location.reload(), 1000);
  };

  const handleDelete = async () => {
    const res = await fetch('http://localhost:5000/api/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, product_id: form.product_id })
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    if (data.message) setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="container mt-5">
      <h1>Product Ratings & Reviews</h1>

      <div className="row">
        {summary.map(p => (
          <div className="col-md-4 mb-3" key={p.product_id}>
            <div className="card p-3">
              <h5>{p.product_name}</h5>
              <p>Avg Rating: {p.average_rating || 'No ratings yet'}</p>
              <div>{p.reviews ? p.reviews.split(' ||| ').map((r, i) => <p key={i}>• {r}</p>) : 'No reviews yet'}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-5">Submit or Edit Review</h3>
      <form onSubmit={handleSubmit}>
        <input id="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control mb-2" required />
        <select id="product_id" value={form.product_id} onChange={handleChange} className="form-control mb-2" required>
          <option value="">Select Product</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input id="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} placeholder="Rating (1-5)" className="form-control mb-2" />
        <textarea id="review_text" value={form.review_text} onChange={handleChange} placeholder="Your review..." className="form-control mb-2" rows="3"></textarea>
        <button className="btn btn-primary me-2">Submit / Edit</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Review</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default App;
