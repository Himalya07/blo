const workloadData = [
  { label: 'Outreach', value: 82 },
  { label: 'Verification', value: 66 },
  { label: 'Form Review', value: 74 },
  { label: 'Response Follow-up', value: 54 }
];

const coverageData = [
  { label: 'North Zone', value: 91 },
  { label: 'Central Zone', value: 78 },
  { label: 'South Zone', value: 63 },
  { label: 'Rural Units', value: 71 }
];

const formRows = [
  { id: 'EW-104', zone: 'North', status: 'In Review', priority: 'High' },
  { id: 'EW-217', zone: 'Central', status: 'Approved', priority: 'Medium' },
  { id: 'EW-309', zone: 'South', status: 'Pending', priority: 'High' },
  { id: 'EW-410', zone: 'Rural', status: 'Needs Update', priority: 'Low' }
];

const blogPosts = [
  {
    title: 'Shift-level form triage now tracked by priority',
    text: 'Teams are moving faster on high-risk elector form queues with clear escalation rules.'
  },
  {
    title: 'Coverage adoption improved across rural coordination centers',
    text: 'Operational visibility has increased after linking weekly follow-up tasks to zone dashboards.'
  }
];

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

function renderMiniStats() {
  const container = document.getElementById('status-grid');
  if (!container) return;

  const stats = [
    { title: 'Approved', value: '186' },
    { title: 'In Review', value: '29' },
    { title: 'Returned', value: '11' },
    { title: 'Escalated', value: '07' }
  ];

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

function renderTable() {
  const body = document.getElementById('form-table-body');
  if (!body) return;

  body.innerHTML = formRows
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

function renderBlog() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  container.innerHTML = blogPosts
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

document.addEventListener('DOMContentLoaded', () => {
  renderBars('workload-bars', workloadData);
  renderBars('coverage-bars', coverageData);
  renderMiniStats();
  renderTable();
  renderBlog();
});
