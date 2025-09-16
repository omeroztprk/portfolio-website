import { Router } from './router.js';
import { Utils } from './utils.js';

/**
 * Modal: project preview + gallery slideshow.
 */
export const Modal = {
  currentProject: null,
  currentImageIndex: 0,
  isOpen: false,
  slideshowInterval: null,
  preModalHash: null,
  SESSION_PRE_HASH: 'portfolio_pre_modal_hash',
  wasAutoPlaying: false,

  open(project, updateHistory = true) {
    if (!project) return;
    if (!this.isOpen) {
      this.preModalHash = window.location.hash || '';
      sessionStorage.setItem(this.SESSION_PRE_HASH, this.preModalHash);
    }
    this.currentProject = project;
    this.currentImageIndex = 0;
    this.isOpen = true;
    if (updateHistory) Router.pushProject(project);
    this.render();
    this.show();
    this.bind();
    if (project.images.length > 1) this.startSlideshow();
  },

  close(updateHistory = true) {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.stopSlideshow();
    this.unbind();
    this.hide();

    const storedPre = sessionStorage.getItem(this.SESSION_PRE_HASH);
    const backHash = storedPre !== null ? storedPre : (this.preModalHash || '');
    sessionStorage.removeItem(this.SESSION_PRE_HASH);

    if (updateHistory) {
      const isSectionHash = backHash.startsWith('#') && !backHash.startsWith('#project/');
      if (isSectionHash) history.replaceState(null, '', backHash);
      else Router.restoreSectionAfterModal();
    }

    this.currentProject = null;
    this.preModalHash = null;
  },

  hasImages() {
    return !!(this.currentProject && Array.isArray(this.currentProject.images) && this.currentProject.images.length);
  },

  render() {
    const modal = document.querySelector('.modal');
    if (!modal || !this.currentProject) return;
    const { title, tags, description, links, images } = this.currentProject;

    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-tags').textContent = tags;
    modal.querySelector('.modal-description').textContent = description;

    const actionBtns = modal.querySelectorAll('.modal-buttons .modal-btn');
    actionBtns.forEach((btn, i) => {
      const l = links?.[i];
      if (l && l.url) {
        btn.href = l.url;
        btn.removeAttribute('aria-disabled');
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      } else {
        btn.href = '#';
        btn.setAttribute('aria-disabled', 'true');
        btn.removeAttribute('target');
        btn.removeAttribute('rel');
      }
    });

    this.buildThumbs(images);
    this.updateImage();
    this.toggleGalleryControls();
  },

  toggleGalleryControls() {
    const multiple = this.currentProject?.images?.length > 1;
    document.querySelectorAll('.gallery-nav').forEach(btn => {
      btn.style.display = multiple ? 'flex' : 'none';
    });
  },

  buildThumbs(images) {
    const wrap = document.querySelector('.modal-thumbs');
    if (!wrap) return;
    wrap.innerHTML = images.map((src, i) => `
      <img src="${src}"
           class="modal-thumb ${i === 0 ? 'active' : ''}"
           data-i="${i}"
           alt="Image ${i + 1} of ${images.length}">
    `).join('');
    wrap.scrollLeft = 0;
  },

  setActiveThumb() {
    if (!this.hasImages()) return;
    const wrap = document.querySelector('.modal-thumbs');
    if (!wrap) return;
    wrap.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
    const active = wrap.querySelector(`.modal-thumb[data-i="${this.currentImageIndex}"]`);
    if (active) {
      active.classList.add('active');
      this.centerActiveThumb(active, wrap);
    }
  },

  centerActiveThumb(activeEl, container) {
    if (!activeEl || !container) return;
    const offset = activeEl.offsetLeft;
    const target = offset - (container.clientWidth - activeEl.clientWidth) / 2;
    const max = container.scrollWidth - container.clientWidth;
    const clamped = Math.max(0, Math.min(target, max));
    container.scrollTo({ left: clamped, behavior: 'smooth' });
  },

  updateImage() {
    const img = document.querySelector('.modal-img');
    if (!img || !this.currentProject) return;

    const newSrc = this.currentProject.images[this.currentImageIndex];
    if (img.dataset.src === newSrc) {
      this.setActiveThumb();
      return;
    }

    const pre = new Image();
    pre.onload = () => {
      img.src = newSrc;
      img.dataset.src = newSrc;
      img.alt = `${this.currentProject.title} - image ${this.currentImageIndex + 1}`;
      this.setActiveThumb();
    };
    pre.src = newSrc;
  },

  navigate(delta) {
    if (!this.hasImages()) return;
    const len = this.currentProject.images.length;
    if (len < 2) return;
    this.currentImageIndex = (this.currentImageIndex + delta + len) % len;
    this.updateImage();
    this.restartSlideshow();
  },

  show() {
    const overlay = document.querySelector('.modal-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => Utils.focusTrapActivate(overlay), 40);
  },

  hide() {
    const overlay = document.querySelector('.modal-overlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    Utils.focusTrapRelease(overlay);
  },

  bind() {
    this.clickHandler = (e) => {
      if (e.target.matches('.modal-close, .modal-overlay')) {
        this.close();
      } else if (e.target.matches('.gallery-nav.prev')) {
        this.navigate(-1);
      } else if (e.target.matches('.gallery-nav.next')) {
        this.navigate(1);
      } else if (e.target.matches('.modal-thumb')) {
        const idx = Number(e.target.dataset.i);
        if (!Number.isNaN(idx) && idx !== this.currentImageIndex) {
          this.currentImageIndex = idx;
          this.updateImage();
          if (this.currentProject.images.length > 1) this.restartSlideshow();
        }
      }
    };

    this.keyHandler = (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      else if (e.key === 'ArrowLeft') this.navigate(-1);
      else if (e.key === 'ArrowRight') this.navigate(1);
    };

    document.addEventListener('click', this.clickHandler);
    document.addEventListener('keydown', this.keyHandler);

    const mainImg = document.querySelector('.modal-img');
    if (mainImg) {
      this.holdStart = () => {
        this.wasAutoPlaying = !!this.slideshowInterval;
        if (this.wasAutoPlaying) this.stopSlideshow();
      };
      this.holdEnd = () => {
        if (this.wasAutoPlaying && !this.slideshowInterval) this.startSlideshow();
        this.wasAutoPlaying = false;
      };
      mainImg.addEventListener('pointerdown', this.holdStart);
      mainImg.addEventListener('pointerup', this.holdEnd);
      mainImg.addEventListener('pointerleave', this.holdEnd);
      mainImg.addEventListener('pointercancel', this.holdEnd);
      this.mainImgEl = mainImg;
    }
  },

  unbind() {
    document.removeEventListener('click', this.clickHandler);
    document.removeEventListener('keydown', this.keyHandler);
    if (this.mainImgEl) {
      this.mainImgEl.removeEventListener('pointerdown', this.holdStart);
      this.mainImgEl.removeEventListener('pointerup', this.holdEnd);
      this.mainImgEl.removeEventListener('pointerleave', this.holdEnd);
      this.mainImgEl.removeEventListener('pointercancel', this.holdEnd);
      this.mainImgEl = null;
    }
  },

  startSlideshow() {
    if (!this.currentProject || this.currentProject.images.length < 2) return;
    this.stopSlideshow();
    this.slideshowInterval = setInterval(() => this.navigate(1), 4000);
  },

  stopSlideshow() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
      this.slideshowInterval = null;
    }
  },

  restartSlideshow() {
    if (!this.hasImages() || this.currentProject.images.length < 2) return;
    this.startSlideshow();
  }
};