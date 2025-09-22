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

document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupTypewriter();
    handleHeaderOnScroll();
    setupScrollSpy();
    setupMobileSmoothAnchors();
});

window.addEventListener("scroll", handleHeaderOnScroll, { passive: true });
