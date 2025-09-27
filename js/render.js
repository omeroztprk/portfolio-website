"use strict";

/* =========================================================
   Content Renderer Module
   ========================================================= */
const ContentRenderer = (() => {
    const $ = selector => document.querySelector(selector);

    const renderHome = () => {
        const data = window.HOME_DATA;
        if (!data) return;

        const heroTitle = $('.hero-title');
        const heroDescription = $('.hero-description');

        if (heroTitle) {
            heroTitle.innerHTML = `${data.title} <span class="hero-highlight">${data.name}</span>`;
        }

        if (heroDescription) {
            heroDescription.textContent = data.description;
        }

        if (Array.isArray(data.typewriter)) {
            window.TYPEWRITER_ITEMS = data.typewriter;
        }
    };

    const renderAbout = () => {
        const data = window.ABOUT_DATA;
        if (!data) return;

        const profileImg = $('.about-image img');
        const descriptionContainer = $('.about-description');
        const resumeBtn = $('.about-actions .btn-primary');

        if (profileImg && data.profileImage) {
            profileImg.src = data.profileImage;
            profileImg.alt = window.HOME_DATA?.name || 'Profile Image';
        }

        if (descriptionContainer && Array.isArray(data.description)) {
            descriptionContainer.innerHTML = data.description
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }

        if (resumeBtn && data.resumeLink) {
            resumeBtn.href = data.resumeLink;
        }

        renderSocialLinks('.about-social');
    };

    const renderSocialLinks = containerSelector => {
        const container = $(containerSelector);
        const socialData = window.SOCIAL_DATA;

        if (!container || !Array.isArray(socialData)) return;

        container.innerHTML = socialData
            .map(social => `
                <a href="${social.url}" 
                   class="icon ${social.class}" 
                   aria-label="${social.name}"
                   ${social.url !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    <i class="${social.icon}"></i>
                </a>
            `)
            .join('');
    };

    const renderSkills = () => {
        const data = window.SKILLS_DATA;
        const container = $('.skills-content');

        if (!Array.isArray(data) || !container) return;

        container.innerHTML = data
            .map(category => `
                <div class="skills-card">
                    <div class="skills-card-header">
                        <h3 class="skills-card-title">${category.title}</h3>
                        <div class="skills-card-icon">
                            <i class="${category.icon}"></i>
                        </div>
                    </div>
                    <div class="skills-grid">
                        ${category.skills
                    .map(skill => `
                                <div class="skill-item" data-tooltip="${skill.tooltip}">
                                    <i class="${skill.icon}"></i>
                                </div>
                            `)
                    .join('')}
                    </div>
                </div>
            `)
            .join('');
    };

    const renderContact = () => {
        const data = window.CONTACT_DATA;
        if (!data) return;

        const description = $('.contact-description p');
        const grid = $('.contact-grid');

        if (description && data.description) {
            description.textContent = data.description;
        }

        if (grid && Array.isArray(data.contacts)) {
            grid.innerHTML = data.contacts
                .map(contact => `
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="${contact.icon}"></i>
                        </div>
                        <div class="contact-text">
                            <h3>${contact.title}</h3>
                            ${contact.type === 'link'
                        ? `<a href="${contact.href}">${contact.value}</a>`
                        : `<p>${contact.value}</p>`
                    }
                        </div>
                    </div>
                `)
                .join('');
        }
    };

    const renderProjectFilters = () => {
        const filters = $('.projects-filters');
        if (!filters) return;

        const categories = window.PROJECTS_DATA?.categories || [];
        const allFilters = [{ key: "all", label: "All" }, ...categories];

        filters.innerHTML = allFilters
            .map(filter => `
                <button class="btn btn-filter"
                    type="button"
                    data-filter="${filter.key}"
                    aria-controls="projects-grid"
                    aria-pressed="${filter.key === 'all'}">
                    ${filter.label}
                </button>
            `)
            .join('');
    };

    const renderProjectGrid = (projects = [], isEmpty = false) => {
        const grid = $('.projects-grid');
        if (!grid) return;

        const defaults = window.PROJECTS_DATA?.defaults || {
            project: "images/projects/defaults/project-default.png",
            empty: "images/projects/defaults/empty-default.png"
        };

        if (isEmpty || !projects.length) {
            grid.innerHTML = `
                <article class="card card-empty" role="status" aria-live="polite">
                    <div class="card-media">
                        <img src="${defaults.empty}" alt="No projects in this category" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">No Projects</h3>
                        <p class="card-empty-text">This category has no projects.</p>
                    </div>
                </article>
            `;
            return;
        }

        const BADGE_LABELS = { featured: "Featured", new: "New" };

        grid.innerHTML = projects
            .map(project => {
                const { id, title, cover, tags = [], badges = [], live, repo } = project;
                const hasLive = live && live !== "#";
                const hasRepo = repo && repo !== "#";
                const coverSrc = cover || defaults.project;

                const tagsHTML = tags
                    .map(tag => `<span class="chip chip-primary">${tag}</span>`)
                    .join('');

                const badgesHTML = badges
                    .map(badge => `<span class="badge badge-${badge} badge-top-right">${BADGE_LABELS[badge]}</span>`)
                    .join('');

                return `
                    <article class="card" data-id="${id}" tabindex="0">
                        <div class="card-media">
                            <img src="${coverSrc}" alt="${title} cover" loading="lazy" 
                                 onerror="this.src='${defaults.project}'">
                            ${badgesHTML ? `<div class="card-badges">${badgesHTML}</div>` : ''}
                            <div class="card-overlay">
                                <button class="icon icon-eye" type="button" aria-label="View details">
                                    <i class="fa-regular fa-eye"></i>
                                </button>
                                ${hasLive ? `
                                    <a class="icon icon-demo" href="${live}" target="_blank" rel="noopener" aria-label="Live Demo">
                                        <i class="fa-solid fa-up-right-from-square"></i>
                                    </a>` : ''}
                                ${hasRepo ? `
                                    <a class="icon icon-github" href="${repo}" target="_blank" rel="noopener" aria-label="GitHub Repo">
                                        <i class="fab fa-github"></i>
                                    </a>` : ''}
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${title}</h3>
                            <div class="card-tags">${tagsHTML}</div>
                        </div>
                    </article>
                `;
            })
            .join('');
    };

    const renderProjectPagination = (currentPage, totalPages, isHidden = false) => {
        const pagination = $('.pagination');
        if (!pagination) return;

        if (isHidden || totalPages <= 1) {
            pagination.innerHTML = "";
            pagination.setAttribute("hidden", "");
            return;
        }

        pagination.removeAttribute("hidden");

        const prevDisabled = currentPage === 1 ? "disabled aria-disabled=\"true\"" : "";
        const nextDisabled = currentPage === totalPages ? "disabled aria-disabled=\"true\"" : "";

        const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
            .map(i => `
                <button class="pagination-btn" type="button" data-page="${i}" 
                    ${i === currentPage ? 'aria-current="page"' : ""}>${i}
                </button>
            `)
            .join('');

        pagination.innerHTML = `
            <button class="pagination-btn" type="button" data-page="prev" ${prevDisabled} aria-label="Previous page">
                <i class="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            ${pageButtons}
            <button class="pagination-btn" type="button" data-page="next" ${nextDisabled} aria-label="Next page">
                <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
        `;
    };

    const renderFooter = () => {
        renderSocialLinks('.footer-social');
    };

    const renderAll = () => {
        renderHome();
        renderAbout();
        renderSkills();
        renderContact();
        renderProjectFilters();
        renderFooter();
    };

    return {
        renderAll,
        renderHome,
        renderAbout,
        renderSkills,
        renderContact,
        renderFooter,
        renderProjectFilters,
        renderProjectGrid,
        renderProjectPagination
    };
})();

/* =========================================================
   Auto-Initialize
   ========================================================= */
document.addEventListener('DOMContentLoaded', ContentRenderer.renderAll);