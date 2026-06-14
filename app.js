function init() {
  const p = CONTENT.profile;
  document.getElementById('hero-name').textContent    = p.name;
  document.getElementById('hero-tagline').textContent = p.tagline;
  document.getElementById('hero-bio').textContent     = p.bio;
  document.title = p.name;

  const grid = document.getElementById('links-grid');
  const channelMap = Object.fromEntries(CONTENT.channels.map(ch => [ch.id, ch]));

  const igSmallIcon = `<svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`;

  function renderGroupCard(group) {
    const channels = group.ids.map(id => channelMap[id]);
    const firstColor = channels[0].color;
    return `
      <div class="link-card group-card" style="--card-color: ${firstColor}">
        <div class="card-top">
          <span class="card-label">${group.label}</span>
          <span class="card-desc">${group.desc}</span>
        </div>
        <div class="group-links">
          ${channels.map(ch => `
            <a class="group-link" href="${ch.url}" target="_blank" rel="noopener" data-channel="${ch.id}">
              <span class="card-icon" style="color: ${ch.color}">${ch.icon}</span>
              <div class="card-info">
                <span class="card-name">${ch.name}</span>
                <span class="card-handle">${ch.handle}</span>
              </div>
              <span class="card-arrow">›</span>
            </a>
          `).join('')}
        </div>
      </div>`;
  }

  function renderCard(ch, group) {
    return `
      <a class="link-card" href="${ch.url}" target="_blank" rel="noopener"
         style="--card-color: ${ch.color}" data-channel="${ch.id}">
        <div class="card-top">
          <span class="card-label">${group.label}</span>
          <span class="card-desc">${group.desc}</span>
        </div>
        <div class="card-bottom">
          <span class="card-icon" style="color: ${ch.color}">${ch.icon}</span>
          <div class="card-info">
            <span class="card-name">${ch.name}</span>
            <span class="card-handle">${ch.handle}</span>
          </div>
          <span class="card-arrow">›</span>
        </div>
      </a>`;
  }

  const baziCard = `
    <a class="link-card bazi-card" href="https://www.instagram.com/papsi_t" target="_blank" rel="noopener"
       style="--card-color: #7c3aed" data-channel="bazi">
      <div class="card-top">
        <span class="card-label">ดูดวง</span>
        <span class="card-desc">ดูความสมดุลธาตุตามหลักศาสตร์จีน (Bazi 8 อักขระ)</span>
      </div>
      <div class="card-bottom">
        <span class="card-icon bazi-icon-box">八字</span>
        <div class="card-info">
          <span class="card-name">DM on Instagram</span>
          <span class="card-handle">${igSmallIcon} @papsi_t</span>
        </div>
        <span class="card-arrow">›</span>
      </div>
    </a>`;

  grid.innerHTML = CONTENT.groups.map(group =>
    group.grouped
      ? renderGroupCard(group)
      : group.ids.map(id => renderCard(channelMap[id], group)).join('')
  ).join('') + baziCard;

  grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-channel]');
    if (!btn || typeof gtag === 'undefined') return;
    gtag('event', 'link_click', { channel: btn.dataset.channel });
  });
}

document.addEventListener('DOMContentLoaded', init);
