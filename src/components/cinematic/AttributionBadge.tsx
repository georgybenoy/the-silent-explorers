import { useState } from 'react';
import type { NasaAttribution } from '../../types/cinematic';

interface AttributionBadgeProps {
  attribution: NasaAttribution;
  className?: string;
}

export function AttributionBadge({ attribution, className = '' }: AttributionBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative inline-block z-20 font-mono text-xs select-none ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      <div
        className="flex items-center space-x-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-stellar-white hover:border-stellar-gold/40 transition-colors duration-200 cursor-default focus-visible:ring-1 focus-visible:ring-stellar-gold"
        tabIndex={0}
        role="region"
        aria-label={`NASA Archival Photo Attribution: ${attribution.photoId}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-stellar-gold animate-pulse" />
        <span className="text-[10px] text-stellar-muted uppercase tracking-wider">NASA ARCHIVE //</span>
        <span className="text-[11px] font-medium text-stellar-white">{attribution.photoId}</span>
      </div>

      {/* Expanded Tooltip / Stencil Card */}
      {isExpanded && (
        <div
          className="absolute bottom-full left-0 mb-2 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] p-3.5 rounded bg-space-card/95 backdrop-blur-xl border border-white/15 shadow-2xl text-[11px] font-mono space-y-2 z-30 animate-fade-in"
          role="tooltip"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-stellar-gold font-bold">
            <span className="text-[10px] uppercase tracking-wider">NASA ARCHIVAL RECORD</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-stellar-gold/15 text-stellar-gold font-mono">
              {attribution.license}
            </span>
          </div>

          <div className="text-stellar-white font-medium leading-tight">
            {attribution.credit}
          </div>

          {attribution.managingCenter && (
            <div className="text-zinc-400">
              <span className="text-stellar-muted">CENTER:</span> {attribution.managingCenter}
            </div>
          )}

          {attribution.mission && (
            <div className="text-zinc-400">
              <span className="text-stellar-muted">MISSION:</span> {attribution.mission}
            </div>
          )}

          {attribution.date && (
            <div className="text-zinc-400">
              <span className="text-stellar-muted">ACQUIRED:</span> {attribution.date}
            </div>
          )}

          {attribution.rightsNote && (
            <div className="text-[10px] text-zinc-400/90 leading-normal pt-1 border-t border-white/5">
              <span className="text-stellar-muted font-bold">RIGHTS / USE:</span> {attribution.rightsNote}
            </div>
          )}

          {attribution.catalogUrl && (
            <div className="pt-1.5 border-t border-white/5">
              <a
                href={attribution.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-stellar-cyan hover:underline flex items-center space-x-1 font-medium"
              >
                <span>VERIFY RECORD IN NASA CATALOG ↗</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
