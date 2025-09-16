// my-reports.js - Handles listing of user reports (dummy data for MVP)
const reportsList = document.getElementById('reportsList');
const statusFilter = document.getElementById('statusFilter');
const modal = new bootstrap.Modal(document.getElementById('reportModal'));
const modalBody = document.getElementById('modalBody');

// Dummy data for MVP
const dummyReports = [
  { id: 101, title: 'Pothole on Main St', date: '2025-09-10', status: 'Reported', desc: 'Large pothole near the bus stop.', photo: '', category: 'Pothole' },
  { id: 102, title: 'Garbage Overflow', date: '2025-09-12', status: 'Resolved', desc: 'Garbage not collected for 3 days.', photo: '', category: 'Garbage' },
  { id: 103, title: 'Broken Streetlight', date: '2025-09-14', status: 'Reported', desc: 'Streetlight not working at night.', photo: '', category: 'Streetlight' }
];

function renderReports() {
  const filter = statusFilter.value;
  reportsList.innerHTML = '';
  dummyReports.filter(r => filter === 'all' || r.status === filter)
    .forEach(report => {
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${report.title}</h5>
            <p class="card-text mb-1"><strong>Date:</strong> ${report.date}</p>
            <p class="card-text mb-1"><strong>Status:</strong> <span class="badge bg-${report.status === 'Resolved' ? 'success' : 'secondary'}">${report.status}</span></p>
            <button class="btn btn-link p-0 mt-2" data-id="${report.id}">View Details</button>
          </div>
        </div>
      `;
      reportsList.appendChild(card);
    });
}

reportsList.addEventListener('click', function(e) {
  if (e.target.matches('button[data-id]')) {
    const id = e.target.getAttribute('data-id');
    const report = dummyReports.find(r => r.id == id);
    if (report) {
      modalBody.innerHTML = `
        <h5>${report.title}</h5>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Status:</strong> ${report.status}</p>
        <p><strong>Category:</strong> ${report.category}</p>
        <p>${report.desc}</p>
        ${report.photo ? `<img src="${report.photo}" alt="Report Photo" class="img-fluid rounded">` : ''}
      `;
      modal.show();
    }
  }
});

statusFilter.addEventListener('change', renderReports);
window.addEventListener('DOMContentLoaded', renderReports);
