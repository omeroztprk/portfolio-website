/**
 * Generic utility helpers.
 */
export const Utils = {
  /**
   * Throttle: executes at leading, schedules trailing if invoked during delay.
   */
  throttle(fn, delay = 120) {
    let last = 0, timer;
    return (...args) => {
      const now = performance.now();
      if (now - last >= delay) {
        last = now;
        fn(...args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          last = performance.now();
          fn(...args);
        }, delay - (now - last));
      }
    };
  },

  scrollToY(y, behavior = 'auto') {
    window.scrollTo({ top: Math.max(0, y), behavior });
  },

  getHeaderHeight() {
    const el = document.querySelector('.site-header');
    return el ? el.getBoundingClientRect().height : 0;
  },

  /**
   * Focus trap for modal/dialog containers.
   */
  focusTrapActivate(container) {
    if (!container) return;
    const selectors = 'button,a[href],area,input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const nodes = Array.from(container.querySelectorAll(selectors))
      .filter(el => !el.disabled && !el.getAttribute('aria-hidden'));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    container.trapHandler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', container.trapHandler);
    first.focus();
  },

  focusTrapRelease(container) {
    if (container?.trapHandler) {
      document.removeEventListener('keydown', container.trapHandler);
      delete container.trapHandler;
    }
  },

  /**
   * Lightweight image preload.
   */
  preload(src) {
    if (!src) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  },

  activeScroll: null,

  easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },

  cancelSmoothScroll() {
    if (this.activeScroll) {
      cancelAnimationFrame(this.activeScroll.raf);
      this.activeScroll = null;
    }
  },

  cancelSmoothScroll() {
    if (this.activeScroll) {
      cancelAnimationFrame(this.activeScroll.raf);
      this.activeScroll = null;
    }
  },

  smoothScrollTo(targetY, opts = {}) {
    this.cancelSmoothScroll();
    targetY = Math.max(0, targetY);
    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      return;
    }

    const easing = opts.easing || this.easeInOutCubic;
    const baseDuration = opts.duration || this.computeDuration(Math.abs(distance));
    const startTime = performance.now();

    const state = {
      raf: null,
      cancelOnUserInput: () => {
        this.cancelSmoothScroll();
        window.removeEventListener('wheel', state.cancelOnUserInput, { passive: true });
        window.removeEventListener('touchstart', state.cancelOnUserInput, { passive: true });
        window.removeEventListener('keydown', state.cancelOnUserInput);
      }
    };
    this.activeScroll = state;

    const step = (now) => {
      if (this.activeScroll !== state) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / baseDuration);
      const eased = easing(t);
      const y = startY + distance * eased;
      window.scrollTo(0, y);
      if (t < 1) {
        state.raf = requestAnimationFrame(step);
      } else {
        this.activeScroll = null;
        window.removeEventListener('wheel', state.cancelOnUserInput, { passive: true });
        window.removeEventListener('touchstart', state.cancelOnUserInput, { passive: true });
        window.removeEventListener('keydown', state.cancelOnUserInput);
      }
    };

    window.addEventListener('wheel', state.cancelOnUserInput, { passive: true });
    window.addEventListener('touchstart', state.cancelOnUserInput, { passive: true });
    window.addEventListener('keydown', state.cancelOnUserInput);

    state.raf = requestAnimationFrame(step);
  },

  computeDuration(dist) {
    return Math.max(350, Math.min(1100, dist * 0.55));
  }
};