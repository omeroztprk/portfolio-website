"use strict";

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

const getHeaderHeight = () => qs(".site-header")?.getBoundingClientRect().height || 0;

function handleHeaderOnScroll() {
    const header = qs(".site-header");
    if (!header) return;
    const scrolled = window.scrollY > 50;
    header.classList.toggle("scrolled", scrolled);
    document.body.classList.toggle("header-small", scrolled);
}

function setupMobileMenu() {
    const toggleBtn = qs(".mobile-menu-toggle");
    const overlay = qs(".mobile-menu-overlay");
    const navPanel = qs("#site-nav .nav-links");
    if (!toggleBtn || !overlay || !navPanel) return;

    let lastFocus = null;

    const openMenu = () => {
        document.body.classList.add("mobile-menu-open");
        toggleBtn.setAttribute("aria-expanded", "true");
        overlay.removeAttribute("hidden");
        lastFocus = document.activeElement;
        navPanel.querySelector(".nav-link")?.focus();
    };

    const closeMenu = () => {
        document.body.classList.remove("mobile-menu-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        overlay.setAttribute("hidden", "");
        lastFocus?.focus?.();
    };

    toggleBtn.addEventListener("click", () => {
        const isOpen = document.body.classList.contains("mobile-menu-open");
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

    navPanel.addEventListener("click", (e) => {
        if (e.target.closest(".nav-link")) closeMenu();
    });
}

function setupTypewriter() {
    const el = document.querySelector("#profession-text");
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = "Full Stack Developer";
        return;
    }

    const items = ["Full Stack Developer", "Frontend Specialist", "Backend Engineer", "UI/UX Enthusiast", "Problem Solver"];
    let i = 0, j = 0, deleting = false;

    const tick = () => {
        const word = items[i];
        el.textContent = deleting ? word.substring(0, j - 1) : word.substring(0, j + 1);
        j += deleting ? -1 : 1;
        const speed = deleting ? 50 : 100;
        if (!deleting && j === word.length) setTimeout(() => (deleting = true), 900);
        else if (deleting && j === 0) { deleting = false; i = (i + 1) % items.length; }
        setTimeout(tick, speed);
    };
    setTimeout(tick, 800);
}

function setupScrollSpy() {
    const sections = qsa("main section[id]");
    const navLinks = qsa(".nav-links .nav-link");

    const setActive = (id) => {
        navLinks.forEach((lnk) => {
            const isActive = (lnk.hash || "").replace(/^#/, "") === id;
            lnk.classList.toggle("active", isActive);
            if (isActive) lnk.setAttribute("aria-current", "page");
            else lnk.removeAttribute("aria-current");
        });
    };

    const getTop = (el) => Math.round(el.getBoundingClientRect().top + window.scrollY);

    let ticking = false;
    let activeId = null;

    const computeActive = () => {
        const headerH = getHeaderHeight();
        const pos = window.scrollY + headerH + 1;
        let current = sections[0]?.id || null;

        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const next = sections[i + 1];
            const top = getTop(sec);
            const nextTop = next ? getTop(next) : Infinity;

            if (pos >= top && pos < nextTop) { current = sec.id; break; }
            if (pos >= nextTop) current = next?.id || sec.id;
        }

        if (current && current !== activeId) {
            activeId = current;
            setActive(activeId);
        }
    };

    const onScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => { computeActive(); ticking = false; });
        }
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeActive, { passive: true });
    window.addEventListener("load", computeActive);
    window.addEventListener("hashchange", () => setTimeout(computeActive, 0));
}

function setupMobileSmoothAnchors() {
    const mqlMobile = window.matchMedia('(max-width: 768px)');
    if (!mqlMobile.matches) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const root = document.documentElement;

    const easeInOutQuad = (t) => (t < 0.5)
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animateScrollTo = (toY, duration = 900) => new Promise((resolve) => {
        const startY = window.scrollY;
        const delta = toY - startY;
        let start;

        const step = (ts) => {
            if (start == null) start = ts;
            const p = Math.min(1, (ts - start) / duration);
            const y = Math.round(startY + delta * easeInOutQuad(p));
            window.scrollTo(0, y);
            if (p < 1) requestAnimationFrame(step);
            else resolve();
        };

        requestAnimationFrame(step);
    });

    document.addEventListener('click', async (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;

        const hash = a.getAttribute('href') || '';
        const id = hash.slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();

        const prevBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';

        const headerH = getHeaderHeight();
        const toY = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - headerH));

        await animateScrollTo(toY, 900);

        history.pushState(null, '', `#${id}`);

        root.style.scrollBehavior = prevBehavior || '';
    }, { passive: false });
}

function setupProjects() {
    const DATA = window.PROJECTS;
    const CATS = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
    if (!Array.isArray(DATA)) return;

    const DEFAULTS = {
        projectCover: "images/projects/defaults/project-default.png",
        emptyCover: "images/projects/defaults/empty-default.png"
    };

    const $filters = qs("#project-filters");
    const $grid = qs("#projects-grid");
    const $pager = qs("#projects-pagination");

    const FILTERS = [{ key: "all", label: "All" }, ...CATS];
    const state = { filter: "all", page: 1, perPage: 6 };

    const matchesFilter = (p) =>
        state.filter === "all" ||
        (Array.isArray(p.categories) && p.categories.includes(state.filter));

    const getFiltered = () => DATA.filter(matchesFilter);

    const paginate = (arr) => {
        const start = (state.page - 1) * state.perPage;
        return arr.slice(start, start + state.perPage);
    };

    const renderFilters = () => {
        const wasInside = document.activeElement && $filters.contains(document.activeElement);
        $filters.innerHTML = FILTERS.map(f => `
      <button class="btn btn--filter btn--sm"
              type="button"
              data-filter="${f.key}"
              aria-controls="projects-grid"
              aria-pressed="${f.key === state.filter}">
        ${f.label}
      </button>
    `).join("");
        if (wasInside) {
            qs(`.btn--filter[data-filter="${state.filter}"]`, $filters)?.focus();
        }
    };

    const getCover = (src, isEmptyCard = false) =>
        (src && src.trim()) ? src : (isEmptyCard ? DEFAULTS.emptyCover : DEFAULTS.projectCover);

    const BADGE_LABELS = { featured: "Featured", new: "New" };

    const renderGrid = () => {
        const filtered = getFiltered();
        const data = paginate(filtered);

        if (!data.length) {
            $grid.innerHTML = `
        <article class="project-card project-card--empty" role="status" aria-live="polite">
          <div class="card-thumb card-thumb--empty" aria-hidden="true">
            <img
              src="${getCover('', true)}"
              alt="This category has no projects"
              loading="lazy" decoding="async"
              onerror="this.onerror=null;this.src='${DEFAULTS.emptyCover}'"
            >
          </div>
          <div class="card-body">
            <h3 class="card-title">No Projects</h3>
            <p class="card-empty-text">This category has no projects.</p>
          </div>
        </article>
      `;
            return;
        }

        $grid.innerHTML = data.map(p => {
            const hasLive = !!p.live;
            const hasRepo = !!p.repo;
            const hasCustomCover = !!(p.cover && p.cover.trim());
            const coverSrc = getCover(p.cover);
            const coverAlt = hasCustomCover
                ? `${p.title} cover image`
                : `Preview unavailable for ${p.title}`;
            const tags = (p.tags || []).map(t => `<span class="chip chip--primary">${t}</span>`).join("");

            const badges = Array.isArray(p.badges) ? p.badges : [];
            const isFeatured = badges.includes("featured");
            const isNew = badges.includes("new");

            let leftBadge = null, rightBadge = null;
            if (isFeatured && isNew) { leftBadge = "featured"; rightBadge = "new"; }
            else if (isFeatured) { leftBadge = "featured"; }
            else if (isNew) { leftBadge = "new"; }

            const badgeHTML = `
      <div class="card-badges" aria-hidden="false">
        ${leftBadge ? `<span class="badge badge--${leftBadge} badge--tl">${BADGE_LABELS[leftBadge]}</span>` : ""}
        ${rightBadge ? `<span class="badge badge--${rightBadge} badge--tr">${BADGE_LABELS[rightBadge]}</span>` : ""}
      </div>
    `;

            return `
      <article class="project-card">
        <div class="card-thumb">
          <img
            src="${coverSrc}"
            alt="${coverAlt}"
            loading="lazy" decoding="async"
            onerror="this.onerror=null;this.src='${DEFAULTS.projectCover}'"
          >
          ${badgeHTML}
          <div class="card-overlay">
            ${hasLive ? `
              <a class="icon icon--demo" href="${p.live}" target="_blank" rel="noopener noreferrer" aria-label="Open Live Demo">
                <i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i>
              </a>` : ``}
            ${hasRepo ? `
              <a class="icon icon--github" href="${p.repo}" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub Repo">
                <i class="fab fa-github" aria-hidden="true"></i>
              </a>` : ``}
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <div class="card-meta" aria-label="Project tags">${tags}</div>
        </div>
      </article>
    `;
        }).join("");
    };

    const renderPagination = () => {
        const total = getFiltered().length;
        const pages = Math.ceil(total / state.perPage);

        if (pages <= 1) {
            $pager.innerHTML = "";
            $pager.setAttribute("hidden", "");
            state.page = 1;
            return;
        }

        $pager.removeAttribute("hidden");
        state.page = Math.min(state.page, pages);

        const prevDisabled = state.page === 1 ? "disabled aria-disabled=\"true\"" : "";
        const nextDisabled = state.page === pages ? "disabled aria-disabled=\"true\"" : "";

        const btn = (i) =>
            `<button class="page-btn" type="button" data-page="${i}" ${i === state.page ? 'aria-current="page"' : ""}>${i}</button>`;

        const range = Array.from({ length: pages }, (_, i) => i + 1).map(btn).join("");

        $pager.innerHTML = `
      <button class="page-btn" type="button" data-page="prev" ${prevDisabled} aria-label="Previous page">
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
      ${range}
      <button class="page-btn" type="button" data-page="next" ${nextDisabled} aria-label="Next page">
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
    `;
    };

    const scrollProjectsSection = () => {
        const sec = qs("#projects");
        if (!sec) return;
        const headerH = getHeaderHeight();
        const top = Math.round(sec.getBoundingClientRect().top + window.scrollY - headerH);
        window.scrollTo({ top, behavior: 'smooth' });
    };

    const update = () => {
        renderFilters();
        renderGrid();
        renderPagination();
    };

    $filters.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn--filter");
        if (!btn) return;
        const next = btn.getAttribute("data-filter");
        if (next && next !== state.filter) {
            state.filter = next;
            state.page = 1;
            update();
            scrollProjectsSection();
        }
    });

    $pager.addEventListener("click", (e) => {
        const btn = e.target.closest(".page-btn");
        if (!btn) return;
        const key = btn.getAttribute("data-page");
        const total = getFiltered().length;
        const pages = Math.max(1, Math.ceil(total / state.perPage));

        if (key === "prev" && state.page > 1) state.page--;
        else if (key === "next" && state.page < pages) state.page++;
        else if (/^\d+$/.test(key)) state.page = parseInt(key, 10);

        update();
        scrollProjectsSection();
    });

    $pager.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            const total = getFiltered().length;
            const pages = Math.max(1, Math.ceil(total / state.perPage));
            if (e.key === "ArrowLeft" && state.page > 1) state.page--;
            if (e.key === "ArrowRight" && state.page < pages) state.page++;
            update();
        }
    });

    update();
}


document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupTypewriter();
    handleHeaderOnScroll();
    setupScrollSpy();
    setupMobileSmoothAnchors();
    setupProjects();
});

window.addEventListener("scroll", handleHeaderOnScroll, { passive: true });
