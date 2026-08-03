import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import workloadRouter from './routes/workload.js';
import coverageRouter from './routes/coverage.js';
import formsRouter from './routes/forms.js';
import blogRouter from './routes/blog.js';
import statsRouter from './routes/stats.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve frontend static files ───────────────────────────────────────────────
app.use(express.static(__dirname));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Elector Workload Manager API',
    version: '1.0.0',
    endpoints: [
      'GET  /api/workload',
      'PUT  /api/workload/:label',
      'GET  /api/coverage',
      'PUT  /api/coverage/:label',
      'GET  /api/forms',
      'POST /api/forms',
      'PUT  /api/forms/:id',
      'DEL  /api/forms/:id',
      'GET  /api/blog',
      'POST /api/blog',
      'DEL  /api/blog/:index',
      'GET  /api/stats',
      'PUT  /api/stats',
      'PATCH /api/stats/:title'
    ]
  });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/workload', workloadRouter);
app.use('/api/coverage', coverageRouter);
app.use('/api/forms', formsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/stats', statsRouter);

// ── Catch-all: serve index.html for non-API routes ──────────────────────────
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: `Route '${req.path}' not found` });
  }
  res.sendFile(join(__dirname, 'index.html'));
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🗳️  Elector Workload Manager`);
  console.log(`   Website : http://localhost:${PORT}`);
  console.log(`   API     : http://localhost:${PORT}/api`);
  console.log(`   Press Ctrl+C to stop\n`);
});
