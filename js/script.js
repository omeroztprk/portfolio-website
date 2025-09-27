"use strict";

/* =========================================================
   Interactive Functionality System
   ========================================================= */

// Shared utilities
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const getHeaderHeight = () => $('.header')?.getBoundingClientRect().height || 0;

/* =========================================================
   Header Controller
   ========================================================= */
const HeaderController = (() => {
    const init = () => {
        const header = $('.header');
        if (!header) return;

        const updateHeaderState = () => {
            const isScrolled = window.scrollY > 50;
            header.classList.toggle('header-scrolled', isScrolled);
            document.body.classList.toggle('header-compact', isScrolled);
        };

        updateHeaderState();
        window.addEventListener('scroll', updateHeaderState, { passive: true });
    };

    return { init };
})();

/* =========================================================
   Mobile Menu Controller
   ========================================================= */
const MobileMenuController = (() => {
    let lastFocus = null;

    const openMenu = () => {
        document.body.classList.add('menu-open');
        $('.menu-toggle')?.setAttribute('aria-expanded', 'true');
        $('.menu-overlay')?.removeAttribute('hidden');
        lastFocus = document.activeElement;
        $('.nav-list .nav-link')?.focus();
    };

    const closeMenu = () => {
        document.body.classList.remove('menu-open');
        $('.menu-toggle')?.setAttribute('aria-expanded', 'false');
        $('.menu-overlay')?.setAttribute('hidden', '');
        lastFocus?.focus?.();
    };

    const init = () => {
        const toggle = $('.menu-toggle');
        const overlay = $('.menu-overlay');
        const navList = $('.nav-list');

        if (!toggle || !overlay || !navList) return;

        const isMenuOpen = () => document.body.classList.contains('menu-open');

        toggle.addEventListener('click', () => isMenuOpen() ? closeMenu() : openMenu());
        overlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
        navList.addEventListener('click', e => e.target.closest('.nav-link') && closeMenu());
    };

    return { init };
})();

/* =========================================================
   Typewriter Effect
   ========================================================= */
const TypewriterEffect = (() => {
    const run = () => {
        const element = $('.hero-typewriter-text');
        if (!element) return;

        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const items = window.TYPEWRITER_ITEMS || ['Full Stack Developer'];

        if (hasReducedMotion) {
            element.textContent = items[0];
            return;
        }

        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = items[currentIndex];

            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            const typeSpeed = isDeleting ? 55 : 95;

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 900);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % items.length;
            }

            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 800);
    };

    return { run };
})();

/* =========================================================
   Scroll Spy Navigation
   ========================================================= */
const ScrollSpyController = (() => {
    let activeId = null;
    let ticking = false;

    const setActiveNavLink = id => {
        $$('.nav-list .nav-link').forEach(link => {
            const isActive = (link.hash || '').replace(/^#/, '') === id;
            link.classList.toggle('nav-link-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const getSectionTop = element => Math.round(element.getBoundingClientRect().top + window.scrollY);

    const updateActiveSection = () => {
        const sections = $$('main .section[id]');
        if (!sections.length) return;

        const headerHeight = getHeaderHeight();
        const scrollPosition = window.scrollY + headerHeight + 1;
        let currentSection = sections[0]?.id || null;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const nextSection = sections[i + 1];
            const sectionTop = getSectionTop(section);
            const nextSectionTop = nextSection ? getSectionTop(nextSection) : Infinity;

            if (scrollPosition >= sectionTop && scrollPosition < nextSectionTop) {
                currentSection = section.id;
                break;
            }

            if (scrollPosition >= nextSectionTop) {
                currentSection = nextSection?.id || section.id;
            }
        }

        if (currentSection && currentSection !== activeId) {
            activeId = currentSection;
            setActiveNavLink(activeId);
        }
    };

    const handleScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
        }
    };

    const init = () => {
        const sections = $$('main .section[id]');
        const links = $$('.nav-list .nav-link');

        if (!sections.length || !links.length) return;

        updateActiveSection();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateActiveSection, { passive: true });
        window.addEventListener('load', updateActiveSection);
        window.addEventListener('hashchange', () => setTimeout(updateActiveSection, 0));
    };

    return { init };
})();

/* =========================================================
   Mobile Smooth Scroll
   ========================================================= */
const MobileSmoothScroll = (() => {
    const easingFunction = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animateScrollTo = (targetY, duration = 900) => new Promise(resolve => {
        const startY = window.scrollY;
        const deltaY = targetY - startY;
        let startTime;

        const step = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(1, (timestamp - startTime) / duration);

            window.scrollTo(0, Math.round(startY + deltaY * easingFunction(progress)));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        };

        requestAnimationFrame(step);
    });

    const init = () => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isMobile || hasReducedMotion) return;

        const documentElement = document.documentElement;

        document.addEventListener('click', async e => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;

            const targetId = anchor.getAttribute('href')?.slice(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const previousBehavior = documentElement.style.scrollBehavior;
            documentElement.style.scrollBehavior = 'auto';

            const headerHeight = getHeaderHeight();
            const targetY = Math.max(0, Math.round(
                targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
            ));

            await animateScrollTo(targetY, 900);
            history.pushState(null, '', `#${targetId}`);

            documentElement.style.scrollBehavior = previousBehavior || '';
        }, { passive: false });
    };

    return { init };
})();

/* =========================================================
   Projects Controller
   ========================================================= */
const ProjectsController = (() => {
    let state = {
        filter: 'all',
        page: 1,
        perPage: 6
    };

    let elements = {};
    let projectsData = [];

    const filterProjects = project =>
        state.filter === 'all' ||
        (Array.isArray(project.categories) && project.categories.includes(state.filter));

    const getFilteredProjects = () => projectsData.filter(filterProjects);

    const paginateProjects = projects =>
        projects.slice((state.page - 1) * state.perPage, state.page * state.perPage);

    const updateFilterStates = () => {
        const wasInsideFocus = document.activeElement && elements.filters.contains(document.activeElement);

        $$('.btn-filter', elements.filters).forEach(button => {
            const filterKey = button.getAttribute('data-filter');
            const isActive = filterKey === state.filter;
            button.setAttribute('aria-pressed', isActive.toString());
        });

        if (wasInsideFocus) {
            $(`.btn-filter[data-filter="${state.filter}"]`, elements.filters)?.focus();
        }
    };

    const scrollToProjectsTop = () => {
        const projectsSection = $('#projects');
        if (!projectsSection) return;

        const headerHeight = getHeaderHeight();
        const targetY = Math.round(
            projectsSection.getBoundingClientRect().top + window.scrollY - headerHeight - 8
        );

        window.scrollTo({ top: targetY, behavior: 'smooth' });
    };

    const updateProjectsDisplay = () => {
        const filteredProjects = getFilteredProjects();
        const totalPages = Math.ceil(filteredProjects.length / state.perPage);
        const paginatedProjects = paginateProjects(filteredProjects);

        updateFilterStates();

        ContentRenderer.renderProjectGrid(paginatedProjects, paginatedProjects.length === 0);
        ContentRenderer.renderProjectPagination(state.page, totalPages, totalPages <= 1);
    };

    const handleFilterClick = e => {
        const button = e.target.closest('.btn-filter');
        if (!button) return;

        const newFilter = button.getAttribute('data-filter');
        if (newFilter && newFilter !== state.filter) {
            state.filter = newFilter;
            state.page = 1;
            updateProjectsDisplay();
            scrollToProjectsTop();
        }
    };

    const handlePaginationClick = e => {
        const button = e.target.closest('.pagination-btn');
        if (!button) return;

        const action = button.getAttribute('data-page');
        const totalProjects = getFilteredProjects().length;
        const totalPages = Math.max(1, Math.ceil(totalProjects / state.perPage));

        if (action === 'prev' && state.page > 1) {
            state.page--;
        } else if (action === 'next' && state.page < totalPages) {
            state.page++;
        } else if (/^\d+$/.test(action)) {
            state.page = parseInt(action, 10);
        }

        updateProjectsDisplay();
        scrollToProjectsTop();
    };

    const handlePaginationKeydown = e => {
        const totalProjects = getFilteredProjects().length;
        const totalPages = Math.ceil(totalProjects / state.perPage);

        if (e.key === 'ArrowLeft' && state.page > 1) {
            e.preventDefault();
            state.page--;
            updateProjectsDisplay();
        } else if (e.key === 'ArrowRight' && state.page < totalPages) {
            e.preventDefault();
            state.page++;
            updateProjectsDisplay();
        }
    };

    const init = () => {
        projectsData = window.PROJECTS_DATA?.projects || [];
        if (!projectsData.length) return;

        elements = {
            filters: $('.projects-filters'),
            grid: $('.projects-grid'),
            pagination: $('.pagination')
        };

        if (!elements.filters || !elements.grid || !elements.pagination) return;

        elements.filters.addEventListener('click', handleFilterClick);
        elements.pagination.addEventListener('click', handlePaginationClick);
        elements.pagination.addEventListener('keydown', handlePaginationKeydown);

        updateProjectsDisplay();
        ProjectModal.hookGrid(elements.grid, projectsData);
    };

    return { init };
})();

/* =========================================================
   Project Modal
   ========================================================= */
const ProjectModal = (() => {
    let elements = {};
    let state = {
        project: null,
        images: [],
        currentIndex: 0,
        autoplayTimer: null,
        autoplayInterval: 3500,
        isUserInteracting: false,
        lastFocus: null,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
    let isInitialized = false;

    const getDefaults = () => window.PROJECTS_DATA?.defaults || {
        project: 'images/projects/defaults/project-default.png'
    };

    const initializeElements = () => {
        if (isInitialized) return true;

        elements = {
            modal: $('#project-modal'),
            overlay: $('#project-modal .modal-overlay'),
            dialog: $('#project-modal .modal-dialog'),
            closeButton: $('#project-modal .modal-close'),
            galleryMain: $('#project-modal .modal-gallery-main'),
            mainImage: $('#project-modal .modal-gallery-main img'),
            prevButton: $('#project-modal .modal-gallery-nav-prev'),
            nextButton: $('#project-modal .modal-gallery-nav-next'),
            thumbnails: $('#project-modal .modal-gallery-thumbs'),
            details: $('#project-modal .modal-details'),
            title: $('#project-modal .modal-title'),
            description: $('#project-modal .modal-description'),
            tags: $('#project-modal .modal-tags'),
            liveButton: $('#project-modal .btn-primary'),
            repoButton: $('#project-modal .btn-secondary')
        };

        if (Object.values(elements).some(element => !element)) return false;

        bindEvents();
        isInitialized = true;
        return true;
    };

    const bindEvents = () => {
        elements.closeButton.addEventListener('click', closeModal);
        elements.overlay.addEventListener('click', closeModal);
        elements.prevButton.addEventListener('click', () => navigateImage(-1, true));
        elements.nextButton.addEventListener('click', () => navigateImage(1, true));
        elements.thumbnails.addEventListener('click', handleThumbnailClick);
        elements.thumbnails.addEventListener('keydown', handleThumbnailKeydown);
        elements.galleryMain.addEventListener('pointerdown', handleGalleryPress);
        elements.galleryMain.addEventListener('pointerup', handleGalleryRelease);
        elements.galleryMain.addEventListener('pointerleave', handleGalleryRelease);
        document.addEventListener('keydown', handleGlobalKeydown);
        document.addEventListener('visibilitychange', handleVisibilityChange);
    };

    const sanitizeImages = project => {
        if (Array.isArray(project.images) && project.images.length) {
            return project.images.filter((src, i, arr) =>
                src && src.trim() && arr.indexOf(src) === i
            );
        }
        return [getDefaults().project];
    };

    const setMainImage = index => {
        if (!state.images.length) return;

        state.currentIndex = ((index % state.images.length) + state.images.length) % state.images.length;
        const imageSrc = state.images[state.currentIndex];
        const projectTitle = state.project?.title || 'Project';

        elements.mainImage.src = imageSrc;
        elements.mainImage.alt = `${projectTitle} - Image ${state.currentIndex + 1} of ${state.images.length}`;
        elements.mainImage.onerror = () => {
            elements.mainImage.onerror = null;
            elements.mainImage.src = getDefaults().project;
        };

        updateThumbnailStates();
        scrollThumbnailIntoView(state.currentIndex);
    };

    const updateThumbnailStates = () => {
        $$('.modal-thumb', elements.thumbnails).forEach((thumb, index) => {
            const isActive = index === state.currentIndex;
            thumb.classList.toggle('modal-thumb-active', isActive);
            thumb.setAttribute('aria-selected', String(isActive));
            thumb.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    };

    const scrollThumbnailIntoView = index => {
        const thumbnail = $(`.modal-thumb[data-index="${index}"]`, elements.thumbnails);
        thumbnail?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    };

    const renderThumbnails = () => {
        const defaults = getDefaults();
        elements.thumbnails.innerHTML = state.images
            .map((src, index) => `
                <button class="modal-thumb" role="tab" data-index="${index}"
                    aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}">
                    <img src="${src}" alt="Thumbnail ${index + 1}" loading="lazy" decoding="async"
                        onerror="this.onerror=null;this.src='${defaults.project}'">
                </button>
            `)
            .join('');
    };

    const navigateImage = (direction, isManual = false) => {
        setMainImage(state.currentIndex + direction);
        if (isManual) restartAutoplay();
    };

    const goToImage = (index, isManual = false) => {
        setMainImage(index);
        if (isManual) restartAutoplay();
    };

    const startAutoplay = () => {
        stopAutoplay();
        if (state.prefersReducedMotion ||
            state.images.length <= 1 ||
            state.isUserInteracting ||
            !isModalOpen()) return;

        state.autoplayTimer = setInterval(() => navigateImage(1, false), state.autoplayInterval);
    };

    const stopAutoplay = () => {
        if (state.autoplayTimer) {
            clearInterval(state.autoplayTimer);
            state.autoplayTimer = null;
        }
    };

    const restartAutoplay = () => {
        if (state.prefersReducedMotion) return;
        stopAutoplay();
        setTimeout(startAutoplay, 1000);
    };

    const handleThumbnailClick = e => {
        const thumbnail = e.target.closest('.modal-thumb');
        if (!thumbnail) return;

        const index = parseInt(thumbnail.dataset.index, 10);
        if (!isNaN(index)) {
            goToImage(index, true);
            thumbnail.focus();
        }
    };

    const handleThumbnailKeydown = e => {
        const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '];
        if (!allowedKeys.includes(e.key)) return;

        e.preventDefault();
        e.stopPropagation();

        const thumbnails = $$('.modal-thumb', elements.thumbnails);
        if (!thumbnails.length) return;

        let targetIndex = state.currentIndex;

        switch (e.key) {
            case 'ArrowRight':
                targetIndex = (targetIndex + 1) % thumbnails.length;
                break;
            case 'ArrowLeft':
                targetIndex = (targetIndex - 1 + thumbnails.length) % thumbnails.length;
                break;
            case 'Home':
                targetIndex = 0;
                break;
            case 'End':
                targetIndex = thumbnails.length - 1;
                break;
            case 'Enter':
            case ' ':
                const focusedThumb = document.activeElement.closest('.modal-thumb');
                const focusedIndex = focusedThumb ? parseInt(focusedThumb.dataset.index, 10) : state.currentIndex;
                if (!Number.isNaN(focusedIndex)) targetIndex = focusedIndex;
                break;
        }

        goToImage(targetIndex, true);
        thumbnails[targetIndex]?.focus();
    };

    const handleGalleryPress = e => {
        if (state.prefersReducedMotion) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        state.isUserInteracting = true;
        stopAutoplay();
    };

    const handleGalleryRelease = () => {
        if (!state.isUserInteracting) return;

        state.isUserInteracting = false;
        if (isModalOpen()) restartAutoplay();
    };

    const handleGlobalKeydown = e => {
        if (!isModalOpen()) return;

        const isInThumbnails = e.target && (
            e.target.closest('.modal-gallery-thumbs') ||
            e.target.closest('.modal-thumb')
        );

        if (isInThumbnails && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }

        if (e.key === 'Tab') {
            trapFocus(e);
            return;
        }

        if (e.altKey || e.ctrlKey || e.metaKey) return;

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateImage(-1, true);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateImage(1, true);
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            stopAutoplay();
        } else if (isModalOpen()) {
            restartAutoplay();
        }
    };

    const trapFocus = e => {
        const focusableElements = $$(`
            a[href], button:not([disabled]),
            textarea, input, select,
            [tabindex]:not([tabindex="-1"])
        `, elements.dialog).filter(el => el.offsetParent !== null);

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    };

    const populateContent = project => {
        elements.title.textContent = project.title || 'Untitled Project';

        if (Array.isArray(project.description)) {
            elements.description.innerHTML = project.description
                .filter(paragraph => paragraph?.trim())
                .map(paragraph => `<p>&emsp;${paragraph.trim()}</p>`)
                .join('');
        } else {
            elements.description.innerHTML = '<p>No description available.</p>';
        }

        elements.tags.innerHTML = (project.tags || [])
            .map(tag => `<span class="chip chip-primary">${tag}</span>`)
            .join('');

        updateActionButton(elements.liveButton, project.live);
        updateActionButton(elements.repoButton, project.repo);
    };

    const updateActionButton = (button, href) => {
        if (!button) return;

        if (href && href !== '#') {
            button.href = href;
            button.style.display = '';
            button.removeAttribute('aria-disabled');
        } else {
            button.href = '#';
            button.style.display = 'none';
            button.setAttribute('aria-disabled', 'true');
        }
    };

    const resetScrollPositions = () => {
        if (elements.dialog) elements.dialog.scrollTop = 0;
        if (elements.details) elements.details.scrollTop = 0;
        if (elements.thumbnails) elements.thumbnails.scrollLeft = 0;
    };

    const isModalOpen = () => elements.modal && !elements.modal.hasAttribute('hidden');

    const openModal = project => {
        if (!initializeElements()) return;

        state.lastFocus = document.activeElement;
        state.project = project;
        state.images = sanitizeImages(project);
        state.currentIndex = 0;
        state.isUserInteracting = false;

        populateContent(project);
        renderThumbnails();
        setMainImage(0);
        resetScrollPositions();

        elements.modal.removeAttribute('hidden');
        document.body.classList.add('modal-open');

        startAutoplay();
        requestAnimationFrame(() => elements.closeButton.focus());
    };

    const closeModal = () => {
        if (!isModalOpen()) return;

        stopAutoplay();
        state.isUserInteracting = false;

        elements.modal.setAttribute('hidden', '');
        document.body.classList.remove('modal-open');

        state.lastFocus?.focus?.();
    };

    const openProjectById = (id, projectsData = null) => {
        const data = projectsData || window.PROJECTS_DATA?.projects || [];
        const project = data.find(p => p.id === id);
        if (project) openModal(project);
    };

    const hookGrid = (gridElement, projectsData) => {
        if (!gridElement) return;

        gridElement.addEventListener('click', e => {
            const card = e.target.closest('.card');
            if (!card || card.classList.contains('card-empty')) return;

            if (e.target.closest('.icon-eye')) {
                const projectId = card.getAttribute('data-id');
                if (projectId) openProjectById(projectId, projectsData);
                return;
            }

            if (e.target.closest('a')) return;

            const projectId = card.getAttribute('data-id');
            if (projectId) openProjectById(projectId, projectsData);
        });

        gridElement.addEventListener('keydown', e => {
            if (e.key !== 'Enter' && e.key !== ' ') return;

            const card = e.target.closest('.card');
            if (!card || card.classList.contains('card-empty')) return;
            if (e.target.closest('a')) return;

            e.preventDefault();
            const projectId = card.getAttribute('data-id');
            if (projectId) openProjectById(projectId, projectsData);
        });
    };

    return {
        openProjectById,
        closeModal,
        hookGrid
    };
})();

/* =========================================================
   Application Initialization
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    HeaderController.init();
    MobileMenuController.init();
    TypewriterEffect.run();
    ScrollSpyController.init();
    MobileSmoothScroll.init();
    ProjectsController.init();
});