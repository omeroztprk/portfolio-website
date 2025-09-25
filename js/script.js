"use strict";

/* =========================================================
   DOM Helpers
   ========================================================= */
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const getHeaderHeight = () => qs(".header")?.getBoundingClientRect().height || 0;

/* =========================================================
   Header Shrink on Scroll
   ========================================================= */
const Header = (() => {
    function shrinkOnScroll() {
        const header = qs(".header");
        if (!header) return;
        const update = () => {
            const compact = window.scrollY > 50;
            header.classList.toggle("header-scrolled", compact);
            document.body.classList.toggle("header-compact", compact);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
    }
    return { shrinkOnScroll };
})();

/* =========================================================
   Mobile Menu
   ========================================================= */
const MobileMenu = (() => {
    function init() {
        const toggle = qs(".menu-toggle");
        const overlay = qs(".menu-overlay");
        const navList = qs(".nav-list");
        if (!toggle || !overlay || !navList) return;

        let lastFocus = null;
        const open = () => {
            document.body.classList.add("menu-open");
            toggle.setAttribute("aria-expanded", "true");
            overlay.removeAttribute("hidden");
            lastFocus = document.activeElement;
            navList.querySelector(".nav-link")?.focus();
        };
        const close = () => {
            document.body.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
            overlay.setAttribute("hidden", "");
            lastFocus?.focus?.();
        };

        toggle.addEventListener("click", () => document.body.classList.contains("menu-open") ? close() : open());
        overlay.addEventListener("click", close);
        document.addEventListener("keydown", e => e.key === "Escape" && close());
        navList.addEventListener("click", e => e.target.closest(".nav-link") && close());
    }
    return { init };
})();

/* =========================================================
   Typewriter Effect
   ========================================================= */
const Typewriter = (() => {
    function run() {
        const el = qs(".hero-typewriter-text");
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.textContent = (window.TYPEWRITER_ITEMS && window.TYPEWRITER_ITEMS[0]) || "Full Stack Developer";
            return;
        }
        const items = Array.isArray(window.TYPEWRITER_ITEMS) && window.TYPEWRITER_ITEMS.length
            ? window.TYPEWRITER_ITEMS
            : ["Full Stack Developer"];
        let i = 0, j = 0, del = false;
        const tick = () => {
            const word = items[i];
            el.textContent = del ? word.slice(0, j - 1) : word.slice(0, j + 1);
            j += del ? -1 : 1;
            const speed = del ? 55 : 95;
            if (!del && j === word.length) setTimeout(() => del = true, 900);
            else if (del && j === 0) { del = false; i = (i + 1) % items.length; }
            setTimeout(tick, speed);
        };
        setTimeout(tick, 800);
    }
    return { run };
})();

/* =========================================================
   Scroll Spy Navigation
   ========================================================= */
const ScrollSpy = (() => {
    function init() {
        const sections = qsa("main .section[id]");
        const links = qsa(".nav-list .nav-link");
        if (!sections.length || !links.length) return;

        const setActive = id => {
            links.forEach(a => {
                const active = (a.hash || "").replace(/^#/, "") === id;
                a.classList.toggle("nav-link-active", active);
                active ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
            });
        };
        const topOf = el => Math.round(el.getBoundingClientRect().top + window.scrollY);

        let activeId = null;
        const compute = () => {
            const headerH = getHeaderHeight();
            const pos = window.scrollY + headerH + 1;
            let current = sections[0]?.id || null;
            for (let i = 0; i < sections.length; i++) {
                const sec = sections[i], next = sections[i + 1];
                const top = topOf(sec), nextTop = next ? topOf(next) : Infinity;
                if (pos >= top && pos < nextTop) { current = sec.id; break; }
                if (pos >= nextTop) current = next?.id || sec.id;
            }
            if (current && current !== activeId) {
                activeId = current;
                setActive(activeId);
            }
        };
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => { compute(); ticking = false; });
            }
        };
        compute();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", compute, { passive: true });
        window.addEventListener("load", compute);
        window.addEventListener("hashchange", () => setTimeout(compute, 0));
    }
    return { init };
})();

/* =========================================================
   Smooth Anchor Scroll (Mobile)
   ========================================================= */
const MobileSmoothAnchors = (() => {
    function init() {
        if (!window.matchMedia("(max-width: 767px)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const root = document.documentElement;
        const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const animateScrollTo = (toY, duration = 900) => new Promise(resolve => {
            const startY = window.scrollY, delta = toY - startY;
            let start;
            const step = ts => {
                if (start == null) start = ts;
                const p = Math.min(1, (ts - start) / duration);
                window.scrollTo(0, Math.round(startY + delta * ease(p)));
                p < 1 ? requestAnimationFrame(step) : resolve();
            };
            requestAnimationFrame(step);
        });
        document.addEventListener("click", async e => {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const id = (a.getAttribute("href") || "").slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const prev = root.style.scrollBehavior;
            root.style.scrollBehavior = "auto";
            const headerH = getHeaderHeight();
            const toY = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - headerH));
            await animateScrollTo(toY, 900);
            history.pushState(null, "", `#${id}`);
            root.style.scrollBehavior = prev || "";
        }, { passive: false });
    }
    return { init };
})();

/* =========================================================
   Projects: Filters, Pagination, Modal Hook
   ========================================================= */
const Projects = (() => {
    function init() {
        const DATA = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
        const CATS = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
        if (!DATA.length) return;

        const DEFAULTS = {
            cover: "images/projects/defaults/project-default.png",
            empty: "images/projects/defaults/empty-default.png"
        };
        const els = {
            filters: qs(".projects-filters"),
            grid: qs(".projects-grid"),
            pager: qs(".pagination")
        };
        if (!els.filters || !els.grid || !els.pager) return;

        const FILTERS = [{ key: "all", label: "All" }, ...CATS];
        const BADGE_LABELS = { featured: "Featured", new: "New" };
        const state = { filter: "all", page: 1, perPage: 6 };

        const matchesFilter = p =>
            state.filter === "all" ||
            (Array.isArray(p.categories) && p.categories.includes(state.filter));
        const getFiltered = () => DATA.filter(matchesFilter);
        const paginate = arr => arr.slice((state.page - 1) * state.perPage, state.page * state.perPage);

        function renderFilters() {
            const wasInside = document.activeElement && els.filters.contains(document.activeElement);
            els.filters.innerHTML = FILTERS.map(f => `
                <button class="btn btn-filter"
                    type="button"
                    data-filter="${f.key}"
                    aria-controls="projects-grid"
                    aria-pressed="${f.key === state.filter}">
                    ${f.label}
                </button>
            `).join("");
            if (wasInside) qs(`.btn-filter[data-filter="${state.filter}"]`, els.filters)?.focus();
        }

        function getCover(src, empty = false) {
            return src && src.trim() ? src : (empty ? DEFAULTS.empty : DEFAULTS.cover);
        }

        function renderGrid() {
            const filtered = getFiltered();
            const data = paginate(filtered);
            if (!data.length) {
                els.grid.innerHTML = `
                    <article class="card card-empty" role="status" aria-live="polite">
                        <div class="card-media" aria-hidden="true">
                            <img src="${getCover("", true)}" alt="This category has no projects"
                                loading="lazy" decoding="async"
                                onerror="this.onerror=null;this.src='${DEFAULTS.empty}'">
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">No Projects</h3>
                            <p class="card-empty-text">This category has no projects.</p>
                        </div>
                    </article>
                `;
                return;
            }
            els.grid.innerHTML = data.map(p => {
                const hasLive = !!p.live && p.live !== "#";
                const hasRepo = !!p.repo && p.repo !== "#";
                const coverSrc = getCover(p.cover);
                const coverAlt = p.cover?.trim()
                    ? `${p.title} cover image`
                    : `Preview unavailable for ${p.title}`;
                const tags = (p.tags || []).map(t => `<span class="chip chip-primary">${t}</span>`).join("");
                const badges = Array.isArray(p.badges) ? p.badges : [];
                const isFeatured = badges.includes("featured");
                const isNew = badges.includes("new");
                let leftBadge = null, rightBadge = null;
                if (isFeatured && isNew) { rightBadge = "featured"; leftBadge = "new"; }
                else if (isFeatured) { rightBadge = "featured"; }
                else if (isNew) { rightBadge = "new"; }
                const badgeHTML = `
                    <div class="card-badges" aria-hidden="false">
                        ${rightBadge ? `<span class="badge badge-${rightBadge} badge-top-right">${BADGE_LABELS[rightBadge]}</span>` : ""}
                        ${leftBadge ? `<span class="badge badge-${leftBadge} badge-top-left">${BADGE_LABELS[leftBadge]}</span>` : ""}
                    </div>
                `;
                return `
                    <article class="card" data-id="${p.id}" tabindex="0">
                        <div class="card-media">
                            <img src="${getCover(p.cover)}" alt="${coverAlt}"
                                loading="lazy" decoding="async"
                                onerror="this.onerror=null;this.src='${DEFAULTS.cover}'">
                            ${badgeHTML}
                            <div class="card-overlay">
                                <button class="icon icon-eye" type="button" aria-label="View details">
                                    <i class="fa-regular fa-eye"></i>
                                </button>
                                ${hasLive ? `
                                    <a class="icon icon-demo" href="${p.live}" target="_blank" rel="noopener noreferrer" aria-label="Open Live Demo">
                                        <i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i>
                                    </a>` : ``}
                                ${hasRepo ? `
                                    <a class="icon icon-github" href="${p.repo}" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub Repo">
                                        <i class="fab fa-github" aria-hidden="true"></i>
                                    </a>` : ``}
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${p.title}</h3>
                            <div class="card-tags" aria-label="Project tags">${tags}</div>
                        </div>
                    </article>
                `;
            }).join("");
        }

        function renderPagination() {
            const total = getFiltered().length;
            const pages = Math.ceil(total / state.perPage);
            if (pages <= 1) {
                els.pager.innerHTML = "";
                els.pager.setAttribute("hidden", "");
                state.page = 1;
                return;
            }
            els.pager.removeAttribute("hidden");
            state.page = Math.min(state.page, pages);
            const prevDisabled = state.page === 1 ? "disabled aria-disabled=\"true\"" : "";
            const nextDisabled = state.page === pages ? "disabled aria-disabled=\"true\"" : "";
            const btn = i =>
                `<button class="pagination-btn" type="button" data-page="${i}" ${i === state.page ? 'aria-current="page"' : ""}>${i}</button>`;
            const range = Array.from({ length: pages }, (_, i) => i + 1).map(btn).join("");
            els.pager.innerHTML = `
                <button class="pagination-btn" type="button" data-page="prev" ${prevDisabled} aria-label="Previous page">
                    <i class="fas fa-chevron-left" aria-hidden="true"></i>
                </button>
                ${range}
                <button class="pagination-btn" type="button" data-page="next" ${nextDisabled} aria-label="Next page">
                    <i class="fas fa-chevron-right" aria-hidden="true"></i>
                </button>
            `;
        }

        function scrollProjectsTop() {
            const sec = document.getElementById("projects") || qs(".section#projects");
            if (!sec) return;
            const headerH = getHeaderHeight();
            const top = Math.round(sec.getBoundingClientRect().top + window.scrollY - headerH - 8);
            window.scrollTo({ top, behavior: "smooth" });
        }

        function update() {
            renderFilters();
            renderGrid();
            renderPagination();
        }

        els.filters.addEventListener("click", e => {
            const btn = e.target.closest(".btn-filter");
            if (!btn) return;
            const next = btn.getAttribute("data-filter");
            if (next && next !== state.filter) {
                state.filter = next;
                state.page = 1;
                update();
                scrollProjectsTop();
            }
        });

        els.pager.addEventListener("click", e => {
            const btn = e.target.closest(".pagination-btn");
            if (!btn) return;
            const key = btn.getAttribute("data-page");
            const total = getFiltered().length;
            const pages = Math.max(1, Math.ceil(total / state.perPage));
            if (key === "prev" && state.page > 1) state.page--;
            else if (key === "next" && state.page < pages) state.page++;
            else if (/^\d+$/.test(key)) state.page = parseInt(key, 10);
            update();
            scrollProjectsTop();
        });

        els.pager.addEventListener("keydown", e => {
            if (e.key === "ArrowLeft" && state.page > 1) { e.preventDefault(); state.page--; update(); }
            if (e.key === "ArrowRight" && state.page < Math.ceil(getFiltered().length / state.perPage)) { e.preventDefault(); state.page++; update(); }
        });

        update();
        ProjectModal.hookGrid(els.grid);
    }
    return { init };
})();

/* =========================================================
   Project Modal System
   ========================================================= */
const ProjectModal = (() => {
    const DEFAULTS = { cover: "images/projects/defaults/project-default.png" };
    const els = {};
    const state = {
        project: null,
        images: [],
        currentIndex: 0,
        autoplayTimer: null,
        autoplayInterval: 3500,
        isUserInteracting: false,
        lastFocus: null,
        prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
    let isInitialized = false;

    function initDOM() {
        if (isInitialized) return true;
        Object.assign(els, {
            modal: qs("#project-modal"),
            overlay: qs("#project-modal .modal-overlay"),
            dialog: qs("#project-modal .modal-dialog"),
            closeBtn: qs("#project-modal .modal-close"),
            galleryMain: qs("#project-modal .modal-gallery-main"),
            mainImg: qs("#project-modal .modal-gallery-main img"),
            prevBtn: qs("#project-modal .modal-gallery-nav-prev"),
            nextBtn: qs("#project-modal .modal-gallery-nav-next"),
            thumbs: qs("#project-modal .modal-gallery-thumbs"),
            details: qs("#project-modal .modal-details"),
            title: qs("#project-modal .modal-title"),
            desc: qs("#project-modal .modal-description"),
            tags: qs("#project-modal .modal-tags"),
            live: qs("#project-modal .btn-primary"),
            repo: qs("#project-modal .btn-secondary")
        });
        if (Object.values(els).some(el => !el)) return false;
        bindEvents();
        isInitialized = true;
        return true;
    }

    function bindEvents() {
        els.closeBtn.addEventListener("click", close);
        els.overlay.addEventListener("click", close);
        els.prevBtn.addEventListener("click", () => navigate(-1, true));
        els.nextBtn.addEventListener("click", () => navigate(1, true));
        els.thumbs.addEventListener("click", handleThumbClick);
        els.thumbs.addEventListener("keydown", handleThumbKeydown);
        els.galleryMain.addEventListener("pointerdown", galleryPress);
        els.galleryMain.addEventListener("pointerup", galleryRelease);
        els.galleryMain.addEventListener("pointerleave", galleryRelease);
        document.addEventListener("keydown", globalKeydown);
        document.addEventListener("visibilitychange", visibilityChange);
    }

    function sanitizeImages(project) {
        if (Array.isArray(project.images) && project.images.length) {
            return project.images.filter((src, i, arr) =>
                src && src.trim() && arr.indexOf(src) === i
            );
        }
        return [DEFAULTS.cover];
    }

    function setMainImage(index) {
        if (!state.images.length) return;
        state.currentIndex = ((index % state.images.length) + state.images.length) % state.images.length;
        const src = state.images[state.currentIndex];
        const title = state.project?.title || "Project";
        els.mainImg.src = src;
        els.mainImg.alt = `${title} - Image ${state.currentIndex + 1} of ${state.images.length}`;
        els.mainImg.onerror = () => { els.mainImg.onerror = null; els.mainImg.src = DEFAULTS.cover; };
        updateThumbStates();
        scrollThumbIntoView(state.currentIndex);
    }

    function updateThumbStates() {
        qsa(".modal-thumb", els.thumbs).forEach((thumb, idx) => {
            const active = idx === state.currentIndex;
            thumb.classList.toggle("modal-thumb-active", active);
            thumb.setAttribute("aria-selected", String(active));
            thumb.setAttribute("tabindex", active ? "0" : "-1");
        });
    }

    function scrollThumbIntoView(index) {
        const thumb = qs(`.modal-thumb[data-index="${index}"]`, els.thumbs);
        thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }

    function renderThumbs() {
        els.thumbs.innerHTML = state.images.map((src, idx) => `
            <button class="modal-thumb" role="tab" data-index="${idx}"
                aria-selected="${idx === 0}" tabindex="${idx === 0 ? "0" : "-1"}">
                <img src="${src}" alt="Thumbnail ${idx + 1}" loading="lazy" decoding="async"
                    onerror="this.onerror=null;this.src='${DEFAULTS.cover}'">
            </button>
        `).join("");
    }

    function navigate(dir, manual = false) {
        setMainImage(state.currentIndex + dir);
        if (manual) restartAutoplay();
    }

    function goToImage(idx, manual = false) {
        setMainImage(idx);
        if (manual) restartAutoplay();
    }

    function startAutoplay() {
        stopAutoplay();
        if (state.prefersReducedMotion || state.images.length <= 1 || state.isUserInteracting || !isOpen()) return;
        state.autoplayTimer = setInterval(() => navigate(1, false), state.autoplayInterval);
    }

    function stopAutoplay() {
        if (state.autoplayTimer) clearInterval(state.autoplayTimer);
        state.autoplayTimer = null;
    }

    function restartAutoplay() {
        if (state.prefersReducedMotion) return;
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    }

    function handleThumbClick(e) {
        const thumb = e.target.closest(".modal-thumb");
        if (!thumb) return;
        const idx = parseInt(thumb.dataset.index, 10);
        if (!isNaN(idx)) {
            goToImage(idx, true);
            thumb.focus();
        }
    }

    function handleThumbKeydown(e) {
        const keys = ["ArrowLeft", "ArrowRight", "Home", "End", "Enter", " "];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        e.stopPropagation();
        const thumbs = qsa(".modal-thumb", els.thumbs);
        if (!thumbs.length) return;
        let idx = state.currentIndex;
        switch (e.key) {
            case "ArrowRight": idx = (idx + 1) % thumbs.length; break;
            case "ArrowLeft": idx = (idx - 1 + thumbs.length) % thumbs.length; break;
            case "Home": idx = 0; break;
            case "End": idx = thumbs.length - 1; break;
            case "Enter":
            case " ":
                const focused = document.activeElement.closest(".modal-thumb");
                const fIdx = focused ? parseInt(focused.dataset.index, 10) : state.currentIndex;
                if (!Number.isNaN(fIdx)) idx = fIdx;
                break;
        }
        goToImage(idx, true);
        thumbs[idx]?.focus();
    }

    function galleryPress(e) {
        if (state.prefersReducedMotion) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        state.isUserInteracting = true;
        stopAutoplay();
    }

    function galleryRelease() {
        if (!state.isUserInteracting) return;
        state.isUserInteracting = false;
        if (isOpen()) restartAutoplay();
    }

    function globalKeydown(e) {
        if (!isOpen()) return;
        const inThumbs = e.target && (
            e.target.closest(".modal-gallery-thumbs") ||
            e.target.closest(".modal-thumb")
        );
        if (inThumbs && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return;
        if (e.key === "Escape") { e.preventDefault(); close(); return; }
        if (e.key === "Tab") { trapFocus(e); return; }
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1, true); }
        else if (e.key === "ArrowRight") { e.preventDefault(); navigate(1, true); }
    }

    function visibilityChange() {
        document.hidden ? stopAutoplay() : isOpen() && restartAutoplay();
    }

    function trapFocus(e) {
        const focusable = qsa(`
            a[href], button:not([disabled]),
            textarea, input, select,
            [tabindex]:not([tabindex="-1"])
        `, els.dialog).filter(el => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function populateContent(project) {
        els.title.textContent = project.title || "Untitled Project";
        const desc = (project.description || "").trim();
        if (desc) {
            const paragraphs = desc.split(/\n{2,}|\n/).map(p => p.trim()).filter(Boolean);
            els.desc.innerHTML = paragraphs.map(p => `<p>&emsp;${p}</p>`).join("");
        } else {
            els.desc.innerHTML = "<p>No description available.</p>";
        }
        els.tags.innerHTML = (project.tags || []).map(tag =>
            `<span class="chip chip-primary">${tag}</span>`
        ).join("");
        updateActionBtn(els.live, project.live);
        updateActionBtn(els.repo, project.repo);
    }

    function updateActionBtn(btn, href) {
        if (!btn) return;
        if (href && href !== "#") {
            btn.href = href;
            btn.style.display = "";
            btn.removeAttribute("aria-disabled");
        } else {
            btn.href = "#";
            btn.style.display = "none";
            btn.setAttribute("aria-disabled", "true");
        }
    }

    function resetScrolls() {
        els.dialog && (els.dialog.scrollTop = 0);
        els.details && (els.details.scrollTop = 0);
        els.thumbs && (els.thumbs.scrollLeft = 0);
    }

    function isOpen() {
        return els.modal && !els.modal.hasAttribute("hidden");
    }

    function open(project) {
        if (!initDOM()) return;
        state.lastFocus = document.activeElement;
        state.project = project;
        state.images = sanitizeImages(project);
        state.currentIndex = 0;
        state.isUserInteracting = false;
        populateContent(project);
        renderThumbs();
        setMainImage(0);
        resetScrolls();
        els.modal.removeAttribute("hidden");
        document.body.classList.add("modal-open");
        startAutoplay();
        requestAnimationFrame(() => els.closeBtn.focus());
    }

    function close() {
        if (!isOpen()) return;
        stopAutoplay();
        state.isUserInteracting = false;
        els.modal.setAttribute("hidden", "");
        document.body.classList.remove("modal-open");
        state.lastFocus?.focus?.();
    }

    function hookGrid(gridEl) {
        if (!gridEl) return;
        gridEl.addEventListener("click", e => {
            const card = e.target.closest(".card");
            if (!card || card.classList.contains("card-empty")) return;
            if (e.target.closest(".icon-view")) {
                const id = card.getAttribute("data-id");
                if (id) openById(id);
                return;
            }
            if (e.target.closest("a")) return;
            const id = card.getAttribute("data-id");
            if (id) openById(id);
        });
        gridEl.addEventListener("keydown", e => {
            if (e.key !== "Enter" && e.key !== " ") return;
            const card = e.target.closest(".card");
            if (!card || card.classList.contains("card-empty")) return;
            if (e.target.closest("a")) return;
            e.preventDefault();
            const id = card.getAttribute("data-id");
            if (id) openById(id);
        });
    }

    function openById(id) {
        const project = (window.PROJECTS || []).find(p => p.id === id);
        if (project) open(project);
    }

    return {
        openById,
        close,
        hookGrid
    };
})();

/* =========================================================
   Init
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    Header.shrinkOnScroll();
    MobileMenu.init();
    Typewriter.run();
    ScrollSpy.init();
    MobileSmoothAnchors.init();
    Projects.init();
});