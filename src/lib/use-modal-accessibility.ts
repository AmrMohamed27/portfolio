'use client';

import { useEffect, useRef, RefObject } from 'react';

interface UseModalAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  restoreFocus?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * useModalAccessibility
 *
 * Full accessibility orchestration for modal dialogs:
 * - Focus trapping (cycles Tab / Shift+Tab)
 * - Restores previous focused element on modal close
 * - Dismisses on Escape key
 * - Locks document body scroll during presentation
 */
export function useModalAccessibility({
  isOpen,
  onClose,
  containerRef,
  initialFocusRef,
  restoreFocus = true,
  closeOnEscape = true,
  lockScroll = true,
}: UseModalAccessibilityOptions) {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus later
    if (typeof document !== 'undefined') {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    // Set initial focus
    const focusTimer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          containerRef.current.focus();
        }
      }
    }, 50);

    // Keyboard handlers: Escape & Focus Trap (Tab / Shift+Tab)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === 'Tab' && containerRef.current) {
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null); // visible elements only

        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement || !containerRef.current.contains(document.activeElement)) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !containerRef.current.contains(document.activeElement)) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) {
        document.body.style.overflow = originalOverflow;
      }
      if (restoreFocus && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus?.();
      }
    };
  }, [isOpen, onClose, containerRef, initialFocusRef, restoreFocus, closeOnEscape, lockScroll]);
}
