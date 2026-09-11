"use client";

import { ProjectMedia } from "@/data/portfolio-data";
import { Maximize2, Play, Terminal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FullscreenLightbox } from "@/components/FullscreenLightbox";

interface MediaDisplayProps {
  media: ProjectMedia;
  title: string;
  fallbackAscii?: string;
  badge?: string;
  className?: string;
}

export function ProjectMediaViewer({
  media,
  title,
  fallbackAscii,
  badge,
  className = "",
}: MediaDisplayProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isFullScreenVideo, setIsFullScreenVideo] = useState(false);

  const allImages =
    media.screenshots && media.screenshots.length > 0
      ? media.screenshots
      : media.thumbnail
        ? [media.thumbnail]
        : [];

  const hasImages = allImages.length > 0;
  const hasVideo = Boolean(media.video);

  const handleOpenVideoModal = () => {
    setIsFullScreenVideo(true);
    setIsFullScreenOpen(true);
  };

  const handleOpenImageModal = (index?: number) => {
    if (typeof index === "number") {
      setActiveImageIndex(index);
    }
    setIsFullScreenVideo(false);
    setIsFullScreenOpen(true);
  };

  // If screenshots are present, render crisp mockup view with video trigger & gallery thumbs
  if (hasImages) {
    const currentSrc = allImages[activeImageIndex] || allImages[0];
    return (
      <>
        <div
          className={`relative flex flex-col rounded-lg overflow-hidden border border-border-subtle bg-surface transition-all duration-300 hover:border-border-hover ${className}`}
        >
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border-muted bg-surface text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="ml-2 font-mono text-[11px] text-text-secondary truncate max-w-45">
                {title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.preview
              </span>
            </div>

            <div className="flex items-center gap-2">
              {badge && (
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-accent-cyan-subtle text-accent-cyan border border-accent-cyan/20">
                  {badge}
                </span>
              )}
              {/* Fullscreen Expansion Trigger */}
              <button
                onClick={() => handleOpenImageModal()}
                className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-surface border border-border-subtle hover:border-border-hover text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label={`View ${title} screenshot in full screen`}
              >
                <Maximize2 className="w-3 h-3 text-accent-cyan" />
                <span className="hidden sm:inline">Expand</span>
              </button>
            </div>
          </div>

          {/* Screenshot Viewport Container */}
          <div className="relative w-full aspect-video sm:aspect-16/10 bg-terminal flex items-center justify-center overflow-hidden group">
            <Image
              src={currentSrc}
              alt={`${title} Preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />

            {/* Hover overlay hint */}
            <div
              onClick={() => handleOpenImageModal()}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface/90 border border-border-subtle text-text-primary font-medium text-xs shadow-lg shadow-black/50 hover:bg-surface transition-all">
                <Maximize2 className="w-3.5 h-3.5 text-accent-cyan" />
                View Fullscreen
              </span>
            </div>

            {/* Video Play Overlay Button (if demo video available) */}
            {hasVideo && (
              <div className="absolute bottom-3 right-3 z-10">
                <button
                  onClick={handleOpenVideoModal}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary hover:bg-accent-hover text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Walkthrough</span>
                </button>
              </div>
            )}
          </div>

          {/* Multi-Screenshot Gallery Tabs (if multiple images exist) */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-1.5 p-2 bg-surface/60 border-t border-border-muted overflow-x-auto">
              {allImages.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => handleOpenImageModal(idx)}
                  className={`relative w-12 h-8 rounded overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-accent-cyan ring-1 ring-accent-cyan"
                      : "border-border-subtle opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Switch to screenshot ${idx + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Lightbox / Modal */}
        <FullscreenLightbox
          isOpen={isFullScreenOpen}
          onClose={() => {
            setIsFullScreenOpen(false);
            setIsFullScreenVideo(false);
          }}
          title={isFullScreenVideo ? `${title} — Video Walkthrough` : title}
          images={allImages}
          activeIndex={activeImageIndex}
          onIndexChange={setActiveImageIndex}
          video={isFullScreenVideo ? media.video : undefined}
        />
      </>
    );
  }

  // 3. Graceful Fallback: High-tech terminal schematic preview (when no screenshot is available)
  return (
    <div
      className={`relative flex flex-col rounded-lg overflow-hidden border border-border-subtle bg-terminal p-4 font-mono text-xs ${className}`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-muted text-text-muted">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-accent-cyan" />
          <span className="text-[11px] text-text-secondary">
            {title}
            {" // System Topology"}
          </span>
        </div>
        {badge && (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-accent-cyan-subtle text-accent-cyan border border-accent-cyan/20">
            {badge}
          </span>
        )}
      </div>

      <pre className="text-[11px] leading-relaxed text-accent-cyan/90 overflow-x-auto whitespace-pre selection:bg-accent-cyan/20">
        {fallbackAscii ||
          `// System architecture verified\n// Production deployment active`}
      </pre>

      <div className="mt-4 pt-3 border-t border-border-muted flex items-center justify-between text-[10px] text-text-muted">
        <span>STATUS: PRODUCTION DEPLOYED</span>
        <span className="text-accent-emerald flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          VERIFIED
        </span>
      </div>
    </div>
  );
}
