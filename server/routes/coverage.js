import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/coverage
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.coverage);
});

// PUT /api/coverage/:label  — update a zone coverage value
router.put('/:label', async (req, res) => {
  const label = decodeURIComponent(req.params.label);
  const { value } = req.body;

  if (value === undefined || typeof value !== 'number') {
    return res.status(400).json({ error: 'value (number) is required' });
  }

  await db.read();
  const entry = db.data.coverage.find((c) => c.label === label);
  if (!entry) return res.status(404).json({ error: 'Coverage entry not found' });

  entry.value = value;
  await db.write();
  res.json(entry);
});

export default router;
