// index.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '1mb' }));

// Ensure data.json exists
if (!fsSync.existsSync(DATA_FILE)) {
  try { fsSync.writeFileSync(DATA_FILE, '[]', 'utf8'); console.log('Created empty data.json'); }
  catch (err) { console.error('Could not create data.json:', err); process.exit(1); }
}

// logger
app.use((req, res, next) => { console.log(new Date().toISOString(), req.method, req.url); next(); });

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to the form page (change to /reviews.html if you prefer)
app.get('/', (req, res) => {
  res.redirect('/form.html');
});

// GET all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const reviews = raw ? JSON.parse(raw) : [];
    res.json(reviews);
  } catch (err) {
    console.error('GET /api/reviews error:', err);
    res.status(500).json({ error: 'Could not read reviews' });
  }
});

// POST a review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating) return res.status(400).json({ error: 'name and rating are required' });

    let raw = await fs.readFile(DATA_FILE, 'utf8');
    let reviews = [];
    try { reviews = raw ? JSON.parse(raw) : []; } catch(e) { console.warn('data.json parse error, resetting to []', e); reviews = []; }

    const newReview = { id: Date.now(), name: String(name), rating: Number(rating), comment: comment ? String(comment) : '', createdAt: new Date().toISOString() };
    reviews.push(newReview);
    await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2), 'utf8');

    res.status(201).json(newReview);
  } catch (err) {
    console.error('POST /api/reviews error:', err);
    res.status(500).json({ error: 'Could not save review' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
