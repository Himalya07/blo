const API = 'http://localhost:3001/api';

// ── Render helpers ────────────────────────────────────────────────────────────

function renderBars(targetId, data) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = data
    .map(
      (item) => `
        <div class="bar-item">
          <div class="bar-meta">
            <span>${item.label}</span>
            <span>${item.value}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${item.value}%"></div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderMiniStats(stats) {
  const container = document.getElementById('status-grid');
  if (!container) return;

  container.innerHTML = stats
    .map(
      (stat) => `
        <div class="mini-stat">
          <strong>${stat.value}</strong>
          <span>${stat.title}</span>
        </div>
      `
    )
    .join('');
}

function renderTable(forms) {
  const body = document.getElementById('form-table-body');
  if (!body) return;

  body.innerHTML = forms
    .map(
      (row) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.zone}</td>
          <td>${row.status}</td>
          <td>${row.priority}</td>
        </tr>
      `
    )
    .join('');
}

function renderBlog(posts) {
  const container = document.getElementById('blog-list');
  if (!container) return;

  container.innerHTML = posts
    .map(
      (post) => `
        <article class="blog-card">
          <h4>${post.title}</h4>
          <p>${post.text}</p>
        </article>
      `
    )
    .join('');
}

// ── Data fetching ─────────────────────────────────────────────────────────────

async function fetchAll() {
  try {
    const [workload, coverage, forms, blog, stats] = await Promise.all([
      fetch(`${API}/workload`).then((r) => r.json()),
      fetch(`${API}/coverage`).then((r) => r.json()),
      fetch(`${API}/forms`).then((r) => r.json()),
      fetch(`${API}/blog`).then((r) => r.json()),
      fetch(`${API}/stats`).then((r) => r.json())
    ]);

    renderBars('workload-bars', workload);
    renderBars('coverage-bars', coverage);
    renderMiniStats(stats);
    renderTable(forms);
    renderBlog(blog);
  } catch (err) {
    console.error('Failed to load data from API:', err);
    showApiError();
  }
}

function showApiError() {
  const banner = document.createElement('div');
  banner.style.cssText =
    'position:fixed;top:0;left:0;right:0;background:#c0392b;color:#fff;text-align:center;padding:10px 16px;font-size:14px;z-index:9999;';
  banner.textContent =
    '⚠ Cannot reach the API server. Make sure it is running at http://localhost:3001';
  document.body.prepend(banner);
}

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', fetchAll);
