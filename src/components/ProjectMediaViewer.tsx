"use client";

import { ProjectMedia } from "@/data/portfolio-data";
import { Play, Terminal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allImages =
    media.screenshots && media.screenshots.length > 0
      ? media.screenshots
      : media.thumbnail
        ? [media.thumbnail]
        : [];

  const hasImages = allImages.length > 0;
  const hasVideo = Boolean(media.video);

  // 1. If video is provided and active, render interactive HTML5 video player
  if (hasVideo && isVideoPlaying && media.video) {
    return (
      <div
        className={`relative w-full rounded-lg overflow-hidden border border-border-subtle bg-terminal ${className}`}
      >
        <video
          src={media.video}
          controls
          autoPlay
          playsInline
          className="w-full aspect-video object-cover"
        >
          Your browser does not support video playback.
        </video>
        <button
          onClick={() => setIsVideoPlaying(false)}
          className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-bg-surface/80 text-text-muted hover:text-text-primary border border-border-subtle backdrop-blur"
        >
          Close Video
        </button>
      </div>
    );
  }

  // 2. If screenshots are present, render crisp mockup view with video trigger & gallery thumbs
  if (hasImages) {
    const currentSrc = allImages[activeImageIndex] || allImages[0];
    return (
      <div
        className={`relative flex flex-col rounded-lg overflow-hidden border border-border-subtle bg-surface transition-all duration-300 hover:border-border-hover ${className}`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border-muted bg-bg-surface-elevated text-xs text-text-muted">
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
            {hasVideo && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-accent-primary hover:bg-accent-primary-hover text-white transition-colors"
                aria-label={`Play demonstration video for ${title}`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Demo</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative w-full aspect-video overflow-hidden bg-terminal group">
          <Image
            src={currentSrc}
            alt={`${title} Preview Screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            priority={false}
          />

          {hasVideo && (
            <div
              onClick={() => setIsVideoPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/90 text-white font-medium text-xs shadow-lg shadow-black/50 hover:bg-accent-primary transition-all">
                <Play className="w-4 h-4 fill-current" />
                <span>Watch System Walkthrough</span>
              </div>
            </div>
          )}
        </div>

        {/* Multi-Screenshot Gallery Tabs (if multiple images exist) */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-1.5 p-2 bg-bg-surface-elevated/60 border-t border-border-muted overflow-x-auto">
            {allImages.map((img, idx) => (
              <button
                key={img}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-12 h-8 rounded overflow-hidden border transition-all shrink-0 ${
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
