import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/blog
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.blog);
});

// POST /api/blog  — add a new blog post
router.post('/', async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'title and text are required' });
  }

  const post = { title, text };
  await db.read();
  db.data.blog.push(post);
  await db.write();
  res.status(201).json(post);
});

// DELETE /api/blog/:index  — remove a blog post by array index
router.delete('/:index', async (req, res) => {
  const idx = parseInt(req.params.index, 10);

  await db.read();

  if (isNaN(idx) || idx < 0 || idx >= db.data.blog.length) {
    return res.status(404).json({ error: 'Blog post not found at that index' });
  }

  const [removed] = db.data.blog.splice(idx, 1);
  await db.write();
  res.json({ message: 'Deleted', post: removed });
});

export default router;
