import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import citationsData from '../../data/citations.json';
import type { Citation } from '../../types/citation';
import { formatDate } from '../../utils/formatting';

export const CitationsDrawer: React.FC = () => {
  const { isCitationsOpen, setIsCitationsOpen } = useNavigation();
  const citations: Citation[] = citationsData as Citation[];
  const [filterType, setFilterType] = useState<string>('All');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap / manage focus
  useEffect(() => {
    if (isCitationsOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isCitationsOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCitationsOpen) {
        setIsCitationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCitationsOpen, setIsCitationsOpen]);

  if (!isCitationsOpen) return null;

  const repositories = ['All', 'NSSDCA Master Catalog', 'Apollo Lunar Surface Journal', 'JPL Mission Documentation', 'NASA Mission Documentation', 'Planetary Data System'];

  const filteredCitations = filterType === 'All'
    ? citations
    : citations.filter(c => c.sourceType === filterType);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="citations-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCitationsOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-space-void border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 bg-space-black/90">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
                <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse" />
                <span>NSSDCA VERIFIED ARCHIVE // CITATIONS REPOSITORY</span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setIsCitationsOpen(false)}
                className="px-2.5 py-1 text-xs font-mono rounded border border-white/10 hover:border-white/30 text-stellar-muted hover:text-stellar-white transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold"
                aria-label="Close citations drawer"
              >
                [ESC] CLOSE ✕
              </button>
            </div>

            <h2 id="citations-drawer-title" className="font-display text-2xl font-bold text-stellar-white">
              Authoritative NASA Documentation
            </h2>
            <p className="text-xs text-stellar-gray mt-1 leading-relaxed">
              Every coordinate, date, status, and historical transmission in The Silent Explorers is cross-referenced with official NASA Master Catalog entries, flight journals, and JPL technical publications.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 mt-4 overflow-x-auto pb-1 text-xs font-mono">
              {repositories.map((repo) => (
                <button
                  key={repo}
                  onClick={() => setFilterType(repo)}
                  className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                    filterType === repo
                      ? 'bg-stellar-gold text-space-black font-bold'
                      : 'border border-white/10 text-stellar-muted hover:text-stellar-white'
                  }`}
                >
                  {repo.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredCitations.map((cit) => (
              <article
                key={cit.id}
                className="p-5 rounded-lg bg-space-card/70 border border-white/10 hover:border-stellar-gold/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-stellar-gold border border-stellar-gold/20">
                    {cit.sourceType.toUpperCase()}
                  </span>
                  {cit.nssdcaId && (
                    <span className="text-stellar-cyan font-semibold">
                      COSPAR/NSSDCA: {cit.nssdcaId}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-stellar-white mb-1.5">
                  <a
                    href={cit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-stellar-gold underline decoration-white/20 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{cit.title}</span>
                    <span className="text-xs font-mono" aria-hidden="true">↗</span>
                  </a>
                </h3>

                <p className="text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-zinc-500">Center: </span>{cit.authorOrCenter}
                  {cit.publicationDate && ` // ${formatDate(cit.publicationDate)}`}
                </p>

                <p className="text-sm text-stellar-gray leading-relaxed mb-3">
                  {cit.summary}
                </p>

                {/* Related Artifacts Badges */}
                <div className="flex items-center space-x-1.5 pt-3 border-t border-white/5 text-[11px] font-mono text-stellar-muted">
                  <span className="text-zinc-500">Artifact:</span>
                  {cit.relatedArtifactIds.map((artId) => (
                    <span key={artId} className="px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                      {artId}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-white/10 bg-space-black/90 text-center text-xs font-mono text-stellar-muted">
            <span>NASA OPEN DATA & PUBLIC DOMAIN POLICY COMPLIANT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
