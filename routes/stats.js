import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/stats
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.stats);
});

// PUT /api/stats  — replace full stats array
// Body: [{ title: string, value: string }, ...]
router.put('/', async (req, res) => {
  const stats = req.body;

  if (!Array.isArray(stats)) {
    return res.status(400).json({ error: 'Body must be an array of stat objects' });
  }

  for (const s of stats) {
    if (!s.title || s.value === undefined) {
      return res.status(400).json({ error: 'Each stat must have title and value' });
    }
  }

  await db.read();
  db.data.stats = stats;
  await db.write();
  res.json(db.data.stats);
});

// PATCH /api/stats/:title  — update a single stat by title
router.patch('/:title', async (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const { value } = req.body;

  if (value === undefined) {
    return res.status(400).json({ error: 'value is required' });
  }

  await db.read();
  const stat = db.data.stats.find((s) => s.title === title);
  if (!stat) return res.status(404).json({ error: `Stat '${title}' not found` });

  stat.value = String(value);
  await db.write();
  res.json(stat);
});

export default router;
