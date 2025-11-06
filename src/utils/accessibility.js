/**
 * Accessibility utility functions
 */

/**
 * Trap focus within a modal or dialog
 */
export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
    
    if (e.key === 'Escape') {
      element.dispatchEvent(new CustomEvent('escape'));
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  
  // Focus first element
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Create skip link for keyboard navigation
 */
export const createSkipLink = (targetId, text = 'Skip to main content') => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md';
  skipLink.textContent = text;
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  return skipLink;
};

/**
 * Announce to screen readers
 */
export const announce = (message, priority = 'polite') => {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.textContent = message;
  
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Keyboard shortcut handler
 */
export class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  register(key, callback, options = {}) {
    const { ctrl = false, shift = false, alt = false } = options;
    const shortcutKey = `${ctrl ? 'ctrl+' : ''}${shift ? 'shift+' : ''}${alt ? 'alt+' : ''}${key.toLowerCase()}`;
    this.shortcuts.set(shortcutKey, callback);
  }

  unregister(key, options = {}) {
    const { ctrl = false, shift = false, alt = false } = options;
    const shortcutKey = `${ctrl ? 'ctrl+' : ''}${shift ? 'shift+' : ''}${alt ? 'alt+' : ''}${key.toLowerCase()}`;
    this.shortcuts.delete(shortcutKey);
  }

  handleKeyDown(e) {
    const key = e.key.toLowerCase();
    const shortcutKey = `${e.ctrlKey || e.metaKey ? 'ctrl+' : ''}${e.shiftKey ? 'shift+' : ''}${e.altKey ? 'alt+' : ''}${key}`;
    
    const callback = this.shortcuts.get(shortcutKey);
    if (callback) {
      e.preventDefault();
      callback(e);
    }
  }

  enable() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disable() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}

/**
 * Focus management utilities
 */
export const focusManagement = {
  lastFocusedElement: null,

  saveFocus() {
    this.lastFocusedElement = document.activeElement;
  },

  restoreFocus() {
    if (this.lastFocusedElement && this.lastFocusedElement.focus) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  },

  focusFirstDescendant(element) {
    const focusable = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable[0]) {
      focusable[0].focus();
      return true;
    }
    return false;
  }
};

/**
 * ARIA live region announcer class
 */
export class LiveRegionAnnouncer {
  constructor() {
    this.politeRegion = null;
    this.assertiveRegion = null;
    this.init();
  }

  init() {
    // Create polite live region
    this.politeRegion = document.createElement('div');
    this.politeRegion.setAttribute('role', 'status');
    this.politeRegion.setAttribute('aria-live', 'polite');
    this.politeRegion.setAttribute('aria-atomic', 'true');
    this.politeRegion.className = 'sr-only';
    document.body.appendChild(this.politeRegion);

    // Create assertive live region
    this.assertiveRegion = document.createElement('div');
    this.assertiveRegion.setAttribute('role', 'alert');
    this.assertiveRegion.setAttribute('aria-live', 'assertive');
    this.assertiveRegion.setAttribute('aria-atomic', 'true');
    this.assertiveRegion.className = 'sr-only';
    document.body.appendChild(this.assertiveRegion);
  }

  announce(message, priority = 'polite') {
    const region = priority === 'assertive' ? this.assertiveRegion : this.politeRegion;
    
    // Clear previous message
    region.textContent = '';
    
    // Small delay to ensure screen reader picks up the change
    setTimeout(() => {
      region.textContent = message;
    }, 100);

    // Clear after announcement
    setTimeout(() => {
      region.textContent = '';
    }, 1000);
  }

  destroy() {
    if (this.politeRegion) {
      document.body.removeChild(this.politeRegion);
    }
    if (this.assertiveRegion) {
      document.body.removeChild(this.assertiveRegion);
    }
  }
}

/**
 * Check if element is visible
 */
export const isElementVisible = (element) => {
  if (!element) return false;
  
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0
  );
};

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container = document) => {
  return container.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
};

/**
 * Create accessible button from div
 */
export const makeButtonAccessible = (element, onClick) => {
  element.setAttribute('role', 'button');
  element.setAttribute('tabindex', '0');
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };
  
  element.addEventListener('click', onClick);
  element.addEventListener('keypress', handleKeyPress);
  
  return () => {
    element.removeEventListener('click', onClick);
    element.removeEventListener('keypress', handleKeyPress);
  };
};

export default {
  trapFocus,
  createSkipLink,
  announce,
  prefersReducedMotion,
  KeyboardShortcuts,
  focusManagement,
  LiveRegionAnnouncer,
  isElementVisible,
  getFocusableElements,
  makeButtonAccessible
};
