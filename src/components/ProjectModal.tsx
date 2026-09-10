'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Zap } from 'lucide-react';
import { CaseStudy } from '@/data/portfolio-data';
import { motionTokens } from '@/lib/motion-tokens';
import { useAccessibleMotion } from '@/lib/use-accessible-motion';
import { useModalAccessibility } from '@/lib/use-modal-accessibility';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onOpenImage?: (image: { src: string; title: string }) => void;
}

export function ProjectModal({
  project,
  onClose,
  onOpenImage,
}: ProjectModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { prefersReduced } = useAccessibleMotion();

  useModalAccessibility({
    isOpen: Boolean(project),
    onClose,
    containerRef,
    initialFocusRef: closeButtonRef,
    lockScroll: true,
    closeOnEscape: true,
  });

  return (
    <AnimatePresence>
      {project && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Backdrop with swift fade exit (< 200ms) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10 cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            initial={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 8,
                    transition: { duration: 0.15, ease: 'easeIn' },
                  }
            }
            transition={motionTokens.toastSpring}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border-hover bg-surface p-6 sm:p-8 shadow-2xl text-left"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover border border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-2">
              {project.media.logo && (
                <div className="relative w-8 h-8 rounded bg-canvas border border-border-muted p-1">
                  <Image
                    src={project.media.logo}
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <span className="font-mono text-xs text-accent-cyan font-medium">
                  {project.client} • {project.role}
                </span>
                <span className="block text-xs font-mono text-text-muted">
                  Timeline: {project.timeline}
                </span>
              </div>
            </div>

            <h3
              id="modal-project-title"
              className="text-2xl font-bold text-text-primary mt-3"
            >
              {project.title}
            </h3>
            <p className="text-sm text-text-secondary mt-1 font-medium">
              {project.subtitle}
            </p>

            {/* Full Screenshot if present */}
            {project.media.thumbnail && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border-subtle my-5 bg-terminal group/modalimg">
                <Image
                  src={project.media.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (project.media.thumbnail && onOpenImage) {
                      onOpenImage({
                        src: project.media.thumbnail,
                        title: project.title,
                      });
                    }
                  }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-sm border border-border-subtle text-text-primary text-xs font-mono opacity-0 group-hover/modalimg:opacity-100 transition-all shadow-lg hover:bg-surface focus-visible:opacity-100 cursor-pointer"
                  aria-label={`View ${project.title} in full screen`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </button>
              </div>
            )}

            {/* Summary */}
            <p className="text-sm text-text-secondary leading-relaxed mt-4">
              {project.summary}
            </p>

            {/* Metrics */}
            <div className="mt-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Engineering Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-terminal border border-border-muted text-xs font-mono text-accent-cyan"
                  >
                    <Zap className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem / Solution */}
            <div className="mt-6 pt-5 border-t border-border-muted space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold mb-1">
                  The Challenge:
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {project.problem.join(' ')}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent-cyan font-semibold mb-1">
                  The Technical Solution:
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {project.solution.join(' ')}
                </p>
              </div>
            </div>

            {/* ASCII Diagram snippet */}
            {project.architectureDiagramAscii && (
              <div className="mt-6 p-4 rounded-lg bg-terminal border border-border-subtle font-mono text-[11px] text-accent-cyan overflow-x-auto">
                <span className="block text-[10px] text-text-muted mb-2 uppercase tracking-wider">
                  Architecture Overview:
                </span>
                <pre>{project.architectureDiagramAscii}</pre>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="mt-6 pt-5 border-t border-border-muted flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-terminal text-text-code border border-border-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
