/**
 * UI rendering (pure DOM writes, no state).
 */
export const UI = {
  qs(sel) { return document.querySelector(sel); },
  map(arr, fn) { return (arr || []).map(fn).join(''); },

  renderHome(d) {
    const title = this.qs('.hero-title');
    const desc = this.qs('.hero-description');
    const btns = this.qs('.hero-buttons');
    if (title) title.innerHTML = `${d.title} <span class="highlight">${d.name}</span>`;
    if (desc) desc.textContent = d.description;
    if (btns) btns.innerHTML = this.map(d.buttons, b => (
      `<a href="${b.href}" class="hero-button ${b.type}">${b.text}</a>`
    ));
  },

  renderAbout(d) {
    const img = this.qs('.about-image img');
    const text = this.qs('.about-text');
    const social = this.qs('.about-social');
    const cvBtn = this.qs('.resume-button');
    if (img) { img.src = d.image; img.alt = d.name; }
    if (text) text.innerHTML = this.map(d.bio, p => `<p>${p}</p>`);
    if (social) {
      social.innerHTML = this.map(d.social, s => {
        const cls = s.platform.toLowerCase().replace(/\s+/g, '-');
        return `<a href="${s.url}"
                   class="social-icon ${cls}-icon"
                   style="--social-color:${s.color || ''}"
                   target="_blank"
                   rel="noopener"
                   aria-label="${s.platform}">
                   <i class="${s.icon}"></i>
                </a>`;
      });
    }
    if (cvBtn) cvBtn.href = d.resumeUrl;
    const footerSocial = this.qs('.footer-social');
    if (footerSocial && social) footerSocial.innerHTML = social.innerHTML;
  },

  renderSkills(categories) {
    const wrap = this.qs('.skills-showcase');
    if (!wrap) return;
    wrap.innerHTML = this.map(categories, cat => `
      <div class="skills-category">
        <div class="skills-header">
          <h3>${cat.category}</h3>
          <i class="${cat.icon}"></i>
        </div>
        <div class="skills-grid">
          ${this.map(cat.skills, s => `
            <div class="skill-item" data-tooltip="${s.name}">
              <i class="${s.icon}"></i>
            </div>`)}
        </div>
      </div>
    `);
  },

  renderProjectFilters(filters, active = 'all') {
    const wrap = this.qs('.card-filters');
    if (!wrap) return;
    wrap.innerHTML = this.map(filters, f => `
      <button class="filter-btn ${f.key === active ? 'active' : ''}"
              data-filter="${f.key}"
              aria-pressed="${f.key === active}">
        ${f.label}
      </button>
    `);
  },

  renderProjects(projects) {
    const grid = this.qs('.cards-grid');
    if (!grid) return;
    const emptyBox = this.qs('.empty-category');

    if (!projects.length) {
      grid.innerHTML = '';
      if (emptyBox) {
        emptyBox.style.display = 'block';
        emptyBox.innerHTML = `
          <i class="fas fa-folder-open" aria-hidden="true"></i>
          <h3>No Projects Found</h3>
          <p>This category does not contain any projects yet.</p>`;
      }
      return;
    }
    if (emptyBox) { emptyBox.style.display = 'none'; emptyBox.innerHTML = ''; }

    grid.innerHTML = this.map(projects, p => {
      const first = p.images[0];
      const links = this.map(p.links, l => {
        const github = l.icon.includes('github');
        return `<a href="${l.url}"
                   class="card-link-item ${github ? 'github-icon' : 'demo-icon'}"
                   target="_blank"
                   rel="noopener"
                   aria-label="${github ? 'View source on GitHub' : 'Open live demo'}">
                   <i class="${l.icon}"></i>
                </a>`;
      });
      return `
        <div class="card-item" data-project-id="${p.id}">
          <div class="card-image">
            <img src="${first}" alt="${p.title}" loading="lazy">
            <div class="card-overlay">
              <div class="card-links">${links}</div>
            </div>
          </div>
          <div class="card-info">
            <h3>${p.title}</h3>
            <p class="card-tags">${p.tags}</p>
            <p class="card-description">${p.description}</p>
            <button class="view-details-btn">View Details</button>
          </div>
        </div>`;
    });
  },

  renderPagination(totalItems, page, perPage) {
    const el = this.qs('.pagination');
    if (!el) return;
    const totalPages = Math.ceil(totalItems / perPage);
    if (totalPages <= 1) { el.innerHTML = ''; return; }

    const parts = [];
    parts.push(`<button class="page-btn ${page === 1 ? 'disabled' : ''}" ${page === 1 ? 'disabled' : ''}>
                  <i class="fas fa-chevron-left"></i>
                </button>`);
    for (let i = 1; i <= totalPages; i++) {
      const near = Math.abs(i - page) <= 1;
      const edge = i === 1 || i === totalPages;
      if (near || edge) {
        parts.push(`<button class="page-btn ${i === page ? 'active' : ''}">${i}</button>`);
      } else if (i === page - 2 || i === page + 2) {
        parts.push(`<span class="pagination-dots">…</span>`);
      }
    }
    parts.push(`<button class="page-btn ${page === totalPages ? 'disabled' : ''}" ${page === totalPages ? 'disabled' : ''}>
                  <i class="fas fa-chevron-right"></i>
                </button>`);
    el.innerHTML = parts.join('');
  },

  renderContact(d) {
    const desc = this.qs('.contact-description p');
    if (desc) desc.textContent = d.description;
    const container = this.qs('.contact-info-container');
    if (!container) return;
    const staticBlock = container.querySelector('.contact-description')?.outerHTML || '';
    const methods = this.map(d.contactMethods, m => `
      <div class="contact-item">
        <i class="${m.icon}"></i>
        <div class="contact-text">
          <h3>${m.type}</h3>
          ${m.href ? `<a href="${m.href}">${m.display}</a>` : `<p>${m.display}</p>`}
        </div>
      </div>`);
    container.innerHTML = staticBlock + methods;
  }
};
