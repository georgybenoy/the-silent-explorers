import React, { useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import chaptersData from '../../data/chapters.json';
import type { Chapter } from '../../types/chapter';
import { DestinationFilter } from './DestinationFilter';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeChapterId,
    scrollToChapter,
    setIsCitationsOpen,
    isAudioMuted,
    setIsAudioMuted,
    isReducedMotion,
  } = useNavigation();

  const chapters: Chapter[] = chaptersData as Chapter[];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isMobileMenuOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  // Handle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Menu Container */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-space-void border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div>
              <span className="text-xs font-mono text-stellar-gold block">// MISSION MENU</span>
              <h2 className="font-display text-xl font-bold text-stellar-white">The Silent Explorers</h2>
            </div>
            <button
              ref={closeButtonRef}
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded border border-white/10 text-stellar-muted hover:text-stellar-white focus-visible:ring-1 focus-visible:ring-stellar-gold"
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          {/* Destination Filter */}
          <div className="mb-6">
            <span className="text-xs font-mono text-stellar-muted block mb-2">FILTER BY DESTINATION:</span>
            <DestinationFilter className="w-full justify-between" />
          </div>

          {/* Chapter Links */}
          <div className="space-y-1.5 mb-6">
            <span className="text-xs font-mono text-stellar-muted block mb-2">CHAPTERS:</span>
            {chapters.map((ch) => {
              const isActive = ch.id === activeChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToChapter(ch.id)}
                  className={`w-full min-h-[44px] flex items-center justify-between p-3 rounded font-mono text-xs transition-colors ${
                    isActive
                      ? 'bg-stellar-gold text-space-black font-bold shadow-md'
                      : 'bg-space-card/60 text-stellar-gray hover:text-stellar-white hover:bg-white/5 border border-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="font-bold opacity-80">{ch.romanNumeral}.</span>
                    <span>{ch.title}</span>
                  </div>
                  {isActive && <span className="text-[10px] tracking-wider uppercase font-bold">Active</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Utilities Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
          {/* Audio Toggle */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="w-full min-h-[44px] flex items-center justify-between p-3 rounded border border-white/10 text-stellar-white hover:bg-white/5"
          >
            <span>AMBIENT SOUNDSCAPE:</span>
            <span className={isAudioMuted ? 'text-zinc-400' : 'text-status-passive font-bold'}>
              {isAudioMuted ? 'MUTED' : 'ACTIVE'}
            </span>
          </button>

          {/* Citations Drawer Trigger */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCitationsOpen(true);
            }}
            className="w-full min-h-[44px] flex items-center justify-between p-3 rounded border border-stellar-gold/30 text-stellar-gold hover:bg-stellar-gold/10 font-bold"
          >
            <span>NASA SOURCES & CITATIONS</span>
            <span>↗</span>
          </button>

          {/* Accessibility Indicator */}
          {isReducedMotion && (
            <div className="text-[11px] text-zinc-500 text-center">
              Reduced motion preference active
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
