import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/forms
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.forms);
});

// POST /api/forms  — add a new form entry
router.post('/', async (req, res) => {
  const { id, zone, status, priority } = req.body;

  if (!id || !zone || !status || !priority) {
    return res.status(400).json({ error: 'id, zone, status, and priority are required' });
  }

  await db.read();

  if (db.data.forms.find((f) => f.id === id)) {
    return res.status(409).json({ error: `Form with id '${id}' already exists` });
  }

  const newForm = { id, zone, status, priority };
  db.data.forms.push(newForm);
  await db.write();
  res.status(201).json(newForm);
});

// PUT /api/forms/:id  — update status and/or priority
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, priority, zone } = req.body;

  await db.read();
  const form = db.data.forms.find((f) => f.id === id);
  if (!form) return res.status(404).json({ error: `Form '${id}' not found` });

  if (status !== undefined) form.status = status;
  if (priority !== undefined) form.priority = priority;
  if (zone !== undefined) form.zone = zone;

  await db.write();
  res.json(form);
});

// DELETE /api/forms/:id  — remove a form entry
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await db.read();
  const index = db.data.forms.findIndex((f) => f.id === id);
  if (index === -1) return res.status(404).json({ error: `Form '${id}' not found` });

  const [removed] = db.data.forms.splice(index, 1);
  await db.write();
  res.json({ message: 'Deleted', form: removed });
});

export default router;
