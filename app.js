function init() {
  const p = CONTENT.profile;
  document.getElementById('hero-name').textContent    = p.name;
  document.getElementById('hero-tagline').textContent = p.tagline;
  document.getElementById('hero-bio').textContent     = p.bio;
  document.title = p.name;

  const grid = document.getElementById('links-grid');
  grid.innerHTML = CONTENT.channels.map(ch => `
    <a class="link-btn" href="${ch.url}" target="_blank" rel="noopener"
       style="--platform-color: ${ch.color}" data-channel="${ch.id}">
      <span class="link-icon" style="color: ${ch.color}">${ch.icon}</span>
      <span class="link-text">
        <span class="link-name">${ch.name}</span>
        <span class="link-sub">${ch.handle} &middot; ${ch.label}</span>
      </span>
      <span class="link-arrow">&#8250;</span>
    </a>
  `).join('');

  grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-channel]');
    if (!btn || typeof gtag === 'undefined') return;
    gtag('event', 'link_click', { channel: btn.dataset.channel });
  });
}

document.addEventListener('DOMContentLoaded', init);
