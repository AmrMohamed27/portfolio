'use client';

import { useRef, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAccessibleMotion } from '@/lib/use-accessible-motion';
import { useModalAccessibility } from '@/lib/use-modal-accessibility';

const emptySubscribe = () => () => {};

export interface FullscreenLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  video?: string;
}

export function FullscreenLightbox({
  isOpen,
  onClose,
  title,
  images,
  activeIndex = 0,
  onIndexChange,
  video,
}: FullscreenLightboxProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { prefersReduced } = useAccessibleMotion();

  useModalAccessibility({
    isOpen,
    onClose,
    containerRef,
    initialFocusRef: closeButtonRef,
    lockScroll: true,
    closeOnEscape: true,
  });

  // Arrow key navigation for multi-image lightbox
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
        onIndexChange?.(prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
        onIndexChange?.(next);
      }
    };

    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [isOpen, images.length, activeIndex, onIndexChange]);

  const hasVideo = Boolean(video);
  const currentImage = images[activeIndex] || images[0];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (currentImage || hasVideo) && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} Fullscreen Screenshot`}
        >
          {/* Backdrop Click Dismiss */}
          <div
            className="absolute inset-0 -z-10"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={
              prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
            }
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close button */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="font-mono text-xs sm:text-sm text-text-secondary truncate pr-4">
                {title}
                {!hasVideo && images.length > 1 && (
                  <span className="text-text-muted ml-2">
                    ({activeIndex + 1} of {images.length})
                  </span>
                )}
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 rounded-lg bg-surface/80 border border-border-subtle hover:bg-surface text-text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fullscreen Media Container (Video or Image) */}
            <div className="relative w-full aspect-video sm:aspect-16/10 max-h-[75vh] rounded-xl overflow-hidden border border-border-muted bg-terminal shadow-2xl flex items-center justify-center">
              {hasVideo ? (
                <video
                  src={video}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                currentImage && (
                  <Image
                    src={currentImage}
                    alt={`${title} Fullscreen View`}
                    fill
                    className="object-contain"
                    priority
                  />
                )
              )}

              {/* Prev/Next arrows on screen if multi-image */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const prev = activeIndex > 0 ? activeIndex - 1 : images.length - 1;
                      onIndexChange?.(prev);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 hover:bg-surface border border-border-subtle text-text-secondary hover:text-text-primary backdrop-blur-sm transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      const next = activeIndex < images.length - 1 ? activeIndex + 1 : 0;
                      onIndexChange?.(next);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 hover:bg-surface border border-border-subtle text-text-secondary hover:text-text-primary backdrop-blur-sm transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Multi-image thumbnail navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto p-1 max-w-full no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => onIndexChange?.(idx)}
                    className={`relative w-16 h-10 rounded-md overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      activeIndex === idx
                        ? 'border-accent-cyan ring-2 ring-accent-cyan opacity-100'
                        : 'border-border-subtle opacity-50 hover:opacity-90'
                    }`}
                    aria-label={`Switch to image ${idx + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
