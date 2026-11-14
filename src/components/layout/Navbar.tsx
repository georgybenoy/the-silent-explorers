import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ChapterProgress } from './ChapterProgress';
import { DestinationFilter } from './DestinationFilter';
import citationsData from '../../data/citations.json';

export const Navbar: React.FC = () => {
  const {
    scrollToChapter,
    audioState,
    toggleAudio,
    isCitationsOpen,
    setIsCitationsOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useNavigation();

  const getAudioLabel = () => {
    switch (audioState) {
      case 'on':
        return 'Mute ambient deep-space soundscape';
      case 'starting':
        return 'Ambient soundscape starting';
      case 'unavailable':
        return 'Ambient audio unavailable';
      case 'off':
      default:
        return 'Play ambient deep-space soundscape';
    }
  };

  const getAudioIndicator = () => {
    switch (audioState) {
      case 'on':
        return <span className="w-2 h-2 rounded-full bg-status-passive shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />;
      case 'starting':
        return <span className="w-2 h-2 rounded-full bg-stellar-amber animate-ping" />;
      case 'unavailable':
        return <span className="w-2 h-2 rounded-full bg-zinc-600" />;
      case 'off':
      default:
        return <span className="w-2 h-2 rounded-full bg-zinc-600" />;
    }
  };

  const getAudioText = () => {
    switch (audioState) {
      case 'on':
        return 'AUDIO: ON';
      case 'starting':
        return 'AUDIO: STARTING...';
      case 'unavailable':
        return 'AUDIO: UNAVAILABLE';
      case 'off':
      default:
        return 'AUDIO: OFF';
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-space-black/90 border-b border-white/10 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Home Trigger */}
        <div className="flex items-center space-x-3.5 shrink-0">
          <button
            onClick={() => scrollToChapter(1)}
            className="flex items-center space-x-3 text-left group focus-visible:ring-1 focus-visible:ring-stellar-gold rounded p-1"
            aria-label="The Silent Explorers home - Return to Chapter 1"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full bg-stellar-gold animate-pulse group-hover:scale-125 transition-transform" 
              aria-hidden="true" 
            />
            <div>
              <span className="font-display tracking-tight text-lg font-bold uppercase text-stellar-white block group-hover:text-stellar-gold transition-colors">
                The Silent Explorers
              </span>
              <span className="text-[10px] text-stellar-muted font-mono tracking-widest block uppercase">
                NASA SPACE APPS 2026<span className="hidden sm:inline"> // NSSDCA ARCHIVE</span>
              </span>
            </div>
          </button>
        </div>

        {/* Center: Chapter Progress Indicator (Desktop / Tablet) */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-auto">
          <ChapterProgress />
        </div>

        {/* Right: Actions & Mobile Hamburger */}
        <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
          {/* Destination Selector (Desktop) */}
          <div className="hidden lg:block">
            <DestinationFilter showCounts={false} />
          </div>

          {/* Citations Drawer Trigger Button */}
          <button
            onClick={() => setIsCitationsOpen(!isCitationsOpen)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded border transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold ${
              isCitationsOpen
                ? 'bg-stellar-gold text-space-black font-bold border-stellar-gold'
                : 'border-white/10 hover:border-white/30 text-stellar-white hover:bg-white/5'
            }`}
            aria-label="Open NASA citations drawer"
            aria-expanded={isCitationsOpen}
          >
            <span>CITATIONS</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-stellar-gold">
              {citationsData.length}
            </span>
          </button>

          {/* Global Ambient Audio Toggle */}
          <button
            onClick={toggleAudio}
            disabled={audioState === 'unavailable'}
            className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded border transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold ${
              audioState === 'on'
                ? 'border-emerald-500/40 bg-emerald-950/20 text-stellar-white hover:bg-emerald-950/40'
                : audioState === 'unavailable'
                ? 'border-white/5 text-zinc-600 cursor-not-allowed'
                : 'border-white/10 hover:border-white/30 text-stellar-white hover:bg-white/5'
            }`}
            aria-label={getAudioLabel()}
            aria-pressed={audioState === 'on'}
          >
            {getAudioIndicator()}
            <span>{getAudioText()}</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded border border-white/10 text-stellar-white hover:bg-white/5 focus-visible:ring-1 focus-visible:ring-stellar-gold"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="text-lg font-bold leading-none">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
