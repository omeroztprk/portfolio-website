import { data } from './data.js';
import { UI } from './ui.js';
import { Modal } from './modal.js';
import { Router } from './router.js';
import { Utils } from './utils.js';

/**
 * Application bootstrap + state managing filters/pagination.
 */
class PortfolioApp {
  constructor() {
    this.state = { currentFilter: 'all', currentPage: 1, perPage: 6 };
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    this.normalizeData();
    Utils.preload(data.defaultImage);
    this.renderStatic();
    this.renderProjects();
    this.bindGlobal();
    this.setupMobileMenu();
    this.initTyping();
    Router.init({ modal: Modal, data });
  }

  normalizeData() {
    const def = (data.defaultImage || '').trim();
    data.projects = (data.projects || []).map(p => {
      let imgs = Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []);
      imgs = imgs
        .map(s => typeof s === 'string' ? s.trim() : '')
        .filter(Boolean);
      if (!imgs.length && def) imgs = [def];
      return { ...p, images: imgs };
    });
  }

  // ---------- Mobile Menu ----------
  setupMobileMenu() {
    this.menuToggle = document.querySelector('.mobile-menu-toggle');
    this.navLinks = document.querySelector('.nav-links');
    if (!this.menuToggle || !this.navLinks) return;

    this.menuToggle.addEventListener('click', () =>
      document.body.classList.contains('mobile-menu-open')
        ? this.closeMobileMenu()
        : this.openMobileMenu()
    );

    this.navLinks.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (link && document.body.classList.contains('mobile-menu-open')) {
        this.closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
        this.closeMobileMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (!document.body.classList.contains('mobile-menu-open')) return;
      if (e.target.closest('.nav-links') || e.target.closest('.mobile-menu-toggle')) return;
      this.closeMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && document.body.classList.contains('mobile-menu-open')) {
        this.closeMobileMenu(false);
      }
    });
  }

  openMobileMenu() {
    document.body.classList.add('mobile-menu-open');
    this.menuToggle.setAttribute('aria-expanded', 'true');
  }

  closeMobileMenu(focusToggle = true) {
    document.body.classList.remove('mobile-menu-open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    if (focusToggle) this.menuToggle.focus();
  }
  // ---------- /Mobile Menu ----------

  renderStatic() {
    UI.renderHome(data.home);
    UI.renderAbout(data.about);
    UI.renderSkills(data.skills);
    UI.renderProjectFilters(data.projectFilters, this.state.currentFilter);
    UI.renderContact(data.contact);
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  getFilteredProjects() {
    if (this.state.currentFilter === 'all') return data.projects;
    return data.projects.filter(p =>
      Array.isArray(p.category) && p.category.includes(this.state.currentFilter)
    );
  }

  paginate(list) {
    const start = (this.state.currentPage - 1) * this.state.perPage;
    return list.slice(start, start + this.state.perPage);
  }

  renderProjects() {
    const all = this.getFilteredProjects();
    const pageItems = this.paginate(all);
    UI.renderProjects(pageItems);
    UI.renderPagination(all.length, this.state.currentPage, this.state.perPage);
  }

  bindGlobal() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.filter-btn')) {
        this.onFilterClick(e.target);
      } else if (e.target.matches('.view-details-btn')) {
        const card = e.target.closest('.card-item');
        if (!card) return;
        const project = data.projects.find(p => p.id === card.dataset.projectId);
        if (project) Modal.open(project);
      } else if (e.target.matches('.page-btn:not(.disabled):not(.active)')) {
        this.onPageClick(e.target);
      }
    });
  }

  onFilterClick(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    this.state.currentFilter = btn.dataset.filter;
    this.state.currentPage = 1;
    this.renderProjects();
  }

  onPageClick(btn) {
    const txt = btn.textContent.trim();
    const totalPages = Math.ceil(this.getFilteredProjects().length / this.state.perPage);
    if (/^\d+$/.test(txt)) {
      this.state.currentPage = parseInt(txt, 10);
    } else if (btn.querySelector('.fa-chevron-left')) {
      this.state.currentPage = Math.max(1, this.state.currentPage - 1);
    } else if (btn.querySelector('.fa-chevron-right')) {
      this.state.currentPage = Math.min(totalPages, this.state.currentPage + 1);
    }
    this.renderProjects();
    Router.scrollToSectionTop('projects', 'smooth');
  }

  initTyping() {
    const el = document.getElementById('profession-text');
    if (!el || !data.home.professions.length) return;
    let wordIdx = 0, charIdx = 0, deleting = false;

    const tick = () => {
      const word = data.home.professions[wordIdx];
      el.textContent = word.slice(0, charIdx);
      if (!deleting) {
        charIdx++;
        if (charIdx > word.length) {
          deleting = true;
          setTimeout(tick, 1100);
          return;
        }
      } else {
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % data.home.professions.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 95);
    };
    setTimeout(tick, 400);
  }
}

new PortfolioApp();