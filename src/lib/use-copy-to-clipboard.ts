'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCopyToClipboardOptions {
  timeoutMs?: number;
}

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: Error | null;
  reset: () => void;
}

/**
 * useCopyToClipboard
 *
 * Robust clipboard hook with state management, timeout reset,
 * safety error handling, and unmount cleanup.
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { timeoutMs = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setCopied(false);
    setError(null);
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      reset();

      if (!navigator?.clipboard?.writeText) {
        // Fallback for non-secure contexts or legacy browsers
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          if (!success) {
            throw new Error('Fallback execCommand failed');
          }
          setCopied(true);
          timerRef.current = setTimeout(() => setCopied(false), timeoutMs);
          return true;
        } catch (err) {
          const e = err instanceof Error ? err : new Error('Failed to copy text');
          setError(e);
          return false;
        }
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        timerRef.current = setTimeout(() => setCopied(false), timeoutMs);
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to copy text');
        setError(e);
        return false;
      }
    },
    [timeoutMs, reset]
  );

  return { copied, copy, error, reset };
}
