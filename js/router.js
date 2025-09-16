import { Utils } from './utils.js';

/**
 * Scroll-driven section activation + hash + project modal routing.
 */
export const Router = {
  modalRef: null,
  dataRef: null,
  sections: [],
  observer: null,
  visibleSections: new Map(),
  activeSection: 'home',
  clickTarget: null,
  clickTs: 0,

  // session keys
  SESSION_SCROLL: 'portfolio_scrollY',
  SESSION_PRE_HASH: 'portfolio_pre_modal_hash',

  init({ modal, data }) {
    this.modalRef = modal;
    this.dataRef = data;
    this.collectSections();
    this.setupPersistence();
    this.restoreState();
    this.initObserver();
    this.bindEvents();
    this.bindHeaderState();
    this.bindScrollSave();
    this.updateNav(this.activeSection);
  },

  collectSections() {
    this.sections = Array.from(document.querySelectorAll('main section[id]'));
    if (!this.sections.length) return;
    if (!this.activeSection) this.activeSection = this.sections[0].id;
  },

  setupPersistence() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(this.SESSION_SCROLL, String(window.scrollY));
    });
  },

  bindScrollSave() {
    let last = 0;
    window.addEventListener('scroll', () => {
      const now = performance.now();
      if (now - last > 250) {
        last = now;
        sessionStorage.setItem(this.SESSION_SCROLL, String(window.scrollY));
      }
    }, { passive: true });
  },

  headerOffset(extra = 12) {
    return Utils.getHeaderHeight() + extra;
  },

  scrollToSectionTop(id, behavior = 'smooth') {
    const el = document.getElementById(id);
    if (!el) return;
    const target = el.offsetTop - this.headerOffset();
    if (behavior === 'auto') {
      Utils.cancelSmoothScroll();
      Utils.scrollToY(target, 'auto');
    } else {
      Utils.smoothScrollTo(target);
    }
  },

  restoreState() {
    const hash = window.location.hash;
    const storedScrollRaw = sessionStorage.getItem(this.SESSION_SCROLL);
    const hasStored = storedScrollRaw !== null;
    const storedScroll = hasStored ? parseInt(storedScrollRaw, 10) : null;

    // Project deep link
    if (hash.startsWith('#project/')) {
      const projectId = hash.replace('#project/', '');
      const project = this.dataRef?.projects.find(p => p.id === projectId);
      if (project) {
        const existingPre = sessionStorage.getItem(this.SESSION_PRE_HASH);
        if (!existingPre) {
          const sec = this.detectSectionAt(window.scrollY);
            sessionStorage.setItem(this.SESSION_PRE_HASH, `#${sec}`);
          this.activeSection = sec;
        }
        this.modalRef.open(project, false);
        if (hasStored) requestAnimationFrame(() => Utils.scrollToY(storedScroll, 'auto'));
        requestAnimationFrame(() => {
          this.activeSection = this.detectSectionAt(window.scrollY);
          this.updateNav(this.activeSection);
        });
        return;
      } else {
        history.replaceState(null, '', '#home');
        this.activeSection = 'home';
      }
    }

    // Standard section hash
    if (hash.startsWith('#') && hash.length > 1) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        this.activeSection = id;
        if (hasStored) {
          requestAnimationFrame(() => Utils.scrollToY(storedScroll, 'auto'));
        } else {
          requestAnimationFrame(() => this.scrollToSectionTop(id, 'auto'));
        }
        return;
      }
    }

    // No hash but stored scroll
    if (!hash && hasStored) {
      requestAnimationFrame(() => {
        Utils.scrollToY(storedScroll, 'auto');
        this.activeSection = this.detectSectionAt(window.scrollY);
        history.replaceState(null, '', `#${this.activeSection}`);
        this.updateNav(this.activeSection);
      });
      return;
    }

    if (!hash) {
      this.activeSection = this.detectSectionAt(window.scrollY);
      history.replaceState(null, '', `#${this.activeSection}`);
    } else {
      this.activeSection = this.detectSectionAt(window.scrollY);
    }
  },

  detectSectionAt(scrollY) {
    let candidate = this.sections[0]?.id || 'home';
    const vh = window.innerHeight;
    const centerLine = scrollY + vh / 2;
    let bestScore = -Infinity;
    for (const sec of this.sections) {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const bottom = top + h;
      const inView = bottom > scrollY + 40 && top < scrollY + vh - 40;
      if (!inView) continue;
      const visibleRatio = Math.min(1,
        Math.max(0, (Math.min(bottom, scrollY + vh) - Math.max(top, scrollY)) / vh));
      const distCenter = Math.abs((top + h / 2) - centerLine);
      const centerScore = 1 - (distCenter / (vh / 2));
      const score = visibleRatio * 0.6 + centerScore * 0.4;
      if (score > bestScore) {
        bestScore = score;
        candidate = sec.id;
      }
    }
    return candidate;
  },

  initObserver() {
    if (!this.sections.length) return;
    const headerH = Utils.getHeaderHeight();
    const topRM = -(headerH + 20);
    this.observer = new IntersectionObserver(this.onIntersect.bind(this), {
      root: null,
      rootMargin: `${topRM}px 0px -45% 0px`,
      threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
    });
    this.sections.forEach(s => this.observer.observe(s));
  },

  onIntersect(entries) {
    for (const entry of entries) {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        this.visibleSections.set(id, {
          ratio: entry.intersectionRatio,
          rect: entry.boundingClientRect
        });
      } else {
        this.visibleSections.delete(id);
      }
    }
    if (this.visibleSections.size) this.evaluateActiveSection();
  },

  evaluateActiveSection() {
    const viewportCenter = window.innerHeight / 2;
    let bestId = null;
    let bestScore = -Infinity;
    for (const [id, meta] of this.visibleSections.entries()) {
      const mid = meta.rect.top + meta.rect.height / 2;
      const centerDist = Math.abs(mid - viewportCenter);
      const centerScore = 1 - Math.min(1, centerDist / viewportCenter);
      const composite = meta.ratio * 0.7 + centerScore * 0.3;
      if (composite > bestScore) {
        bestScore = composite;
        bestId = id;
      }
    }
    if (!bestId || bestId === this.activeSection) {
      if (this.clickTarget && bestId === this.clickTarget) this.activateSection(bestId, true);
      return;
    }
    this.activateSection(bestId, false);
  },

  activateSection(id, forcePushFromClick) {
    if (this.modalRef?.isOpen) {
      this.activeSection = id;
      this.updateNav(id);
      return;
    }
    const fromClick = this.clickTarget === id && (performance.now() - this.clickTs) < 2500;
    this.activeSection = id;
    this.updateNav(id);
    const newHash = `#${id}`;
    if (window.location.hash !== newHash) {
      if (fromClick || forcePushFromClick) history.pushState(null, '', newHash);
      else history.replaceState(null, '', newHash);
    }
    if (fromClick) this.clickTarget = null;
  },

  updateNav(id) {
    document.querySelectorAll('.nav-link, .footer-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  },

  pushProject(project) {
    const h = `#project/${project.id}`;
    if (window.location.hash !== h) history.pushState(null, '', h);
  },

  restoreSectionAfterModal() {
    if (!this.activeSection) this.activeSection = this.detectSectionAt(window.scrollY);
    const target = `#${this.activeSection}`;
    if (window.location.hash !== target) history.replaceState(null, '', target);
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (href.startsWith('#project/')) return;

      e.preventDefault();
      const id = href.slice(1);
      if (!document.getElementById(id)) return;

      if (this.modalRef?.isOpen) this.modalRef.close(false);

      this.clickTarget = id;
      this.clickTs = performance.now();
      this.scrollToSectionTop(id, 'smooth');
    });

    window.addEventListener('popstate', () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const id = hash.replace('#project/', '');
        const project = this.dataRef?.projects.find(p => p.id === id);
        if (project) this.modalRef.open(project, false);
        return;
      }
      if (this.modalRef?.isOpen) this.modalRef.close(false);
      if (hash.startsWith('#') && hash.length > 1) {
        const id = hash.slice(1);
        if (document.getElementById(id)) {
          this.clickTarget = null;
          this.scrollToSectionTop(id, 'auto');
          this.activeSection = id;
          this.updateNav(id);
        }
      }
    });
  },

  bindHeaderState() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll',
      Utils.throttle(() => header.classList.toggle('scrolled', window.scrollY > 60), 120),
      { passive: true }
    );
  }
};