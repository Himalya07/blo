import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/workload
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.workload);
});

// PUT /api/workload/:label  — update a workload entry's value
router.put('/:label', async (req, res) => {
  const label = decodeURIComponent(req.params.label);
  const { value } = req.body;

  if (value === undefined || typeof value !== 'number') {
    return res.status(400).json({ error: 'value (number) is required' });
  }

  await db.read();
  const entry = db.data.workload.find((w) => w.label === label);
  if (!entry) return res.status(404).json({ error: 'Workload entry not found' });

  entry.value = value;
  await db.write();
  res.json(entry);
});

export default router;
