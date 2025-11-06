import { useEffect, useCallback } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * 
 * @param {Object} shortcuts - Object where keys are shortcut strings and values are callbacks
 * @param {Array} dependencies - Dependencies array for useEffect
 * 
 * @example
 * useKeyboardShortcuts({
 *   'ctrl+k': () => openSearch(),
 *   'ctrl+/': () => toggleHelp(),
 *   'esc': () => closeModal()
 * }, [openSearch, toggleHelp, closeModal]);
 */
const useKeyboardShortcuts = (shortcuts, dependencies = []) => {
  const handleKeyDown = useCallback((event) => {
    // Don't trigger shortcuts when typing in input fields
    if (
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'TEXTAREA' ||
      event.target.isContentEditable
    ) {
      // Allow Escape key even in inputs
      if (event.key !== 'Escape') {
        return;
      }
    }

    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    // Build shortcut string
    let shortcutKey = '';
    if (ctrl) shortcutKey += 'ctrl+';
    if (shift) shortcutKey += 'shift+';
    if (alt) shortcutKey += 'alt+';
    shortcutKey += key;

    // Check if shortcut exists
    const callback = shortcuts[shortcutKey] || shortcuts[key];
    
    if (callback) {
      event.preventDefault();
      callback(event);
    }
  }, [shortcuts, ...dependencies]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

/**
 * Hook for creating a keyboard shortcut for a single action
 * 
 * @example
 * useKeyboardShortcut('ctrl+k', openSearch, [openSearch]);
 */
export const useKeyboardShortcut = (shortcut, callback, dependencies = []) => {
  useKeyboardShortcuts({ [shortcut]: callback }, dependencies);
};

export default useKeyboardShortcuts;
