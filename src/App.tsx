import { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/layout/Navbar';
import { TimelineBar } from './components/layout/TimelineBar';
import { CitationsDrawer } from './components/layout/CitationsDrawer';
import { MobileMenu } from './components/layout/MobileMenu';
import { ChapterOneSilence } from './components/cinematic/ChapterOneSilence';
import { ArtifactMuseum } from './components/museum/ArtifactMuseum';
import { FinalChapter } from './components/finalChapter/FinalChapter';
import { WhatTheyLeftBehind } from './components/leftBehind/WhatTheyLeftBehind';
import { TheLegacy } from './components/legacy/TheLegacy';
import chaptersData from './data/chapters.json';
import type { Chapter } from './types/chapter';

function ShellContent() {
  const {
    activeChapterId,
    setActiveChapterId,
    activeDestination,
    isReducedMotion,
  } = useNavigation();

  const chapters: Chapter[] = chaptersData as Chapter[];

  // Synchronize active chapter with viewport scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idMatch = entry.target.id.match(/^chapter-(\d+)$/);
            if (idMatch) {
              const chapterNum = parseInt(idMatch[1], 10);
              setActiveChapterId(chapterNum);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    const chapterElements = document.querySelectorAll('[id^="chapter-"]');
    chapterElements.forEach((el) => observer.observe(el));

    return () => {
      chapterElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [setActiveChapterId]);


  return (
    <div className="min-h-screen bg-space-black text-stellar-white font-sans selection:bg-stellar-gold/20 selection:text-stellar-gold pb-36">
      {/* Primary Fixed Navbar */}
      <Navbar />

      {/* Slide-out Drawers & Overlays */}
      <MobileMenu />
      <CitationsDrawer />

      {/* Chapter 1: The Silence (Full-Viewport Cinematic Documentary Opening) */}
      <ChapterOneSilence />

      {/* Main Container for Chapters II - VII */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-16 space-y-24">
        {/* Active Telemetry Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-space-card/60 border border-white/5 font-mono text-xs text-stellar-muted">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-passive" />
            <span className="text-stellar-white font-semibold uppercase">HYBRID TELEMETRY ACTIVE</span>
            <span>//</span>
            <span>CURRENT CHAPTER: {chapters[activeChapterId - 1]?.romanNumeral} ({chapters[activeChapterId - 1]?.title})</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>DESTINATION: <strong className="text-stellar-gold">{activeDestination.toUpperCase()}</strong></span>
            {isReducedMotion && (
              <span className="text-zinc-500">// REDUCED MOTION MODE</span>
            )}
          </div>
        </div>


        {/* Chapter 2: Beyond Earth */}
        <section
          id="chapter-2"
          className="scroll-mt-24 p-8 rounded-xl bg-space-card/40 border border-white/10"
        >
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-stellar-cyan tracking-widest uppercase block mb-2">
              CHAPTER II // TRANSIT MECHANICS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-stellar-white">
              Beyond Earth
            </h2>
            <p className="text-stellar-gray text-lg leading-relaxed mb-6">
              Escaping Earth's gravity well demands an acceleration to eleven kilometers per second. Every machine that ventured into the void was built within microscopic tolerances to survive the violent acoustic vibration of launch and the deep freeze of cosmic space.
            </p>
          </div>
        </section>

        {/* Chapter 3: The Forgotten Worlds */}
        <section
          id="chapter-3"
          className="scroll-mt-24 p-8 rounded-xl bg-space-card/40 border border-white/10"
        >
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-stellar-amber tracking-widest uppercase block mb-2">
              CHAPTER III // PLANETARY CONTEXT
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-stellar-white">
              The Forgotten Worlds
            </h2>
            <p className="text-stellar-gray text-lg leading-relaxed mb-6">
              The equipment was never scattered at random. Each machine touched down on coordinates selected with surgical scientific precision across the Moon, Mars, Ceres, and asteroid 433 Eros.
            </p>
          </div>
        </section>

        {/* Chapter 4: Meet the Explorers (Interactive Digital Museum) */}
        <ArtifactMuseum />

        {/* Chapter 5: The Final Chapter (Mission Conclusions & Silence) */}
        <FinalChapter />

        {/* Chapter 6: What They Left Behind (Physical & Scientific Footprint) */}
        <WhatTheyLeftBehind />

        {/* Chapter 7: The Legacy (Future Horizons & Epilogue) */}
        <TheLegacy />
      </main>

      {/* Interactive Chronological Timeline (Pinned to bottom) */}
      <TimelineBar />
    </div>
  );
}

export function App() {
  return (
    <NavigationProvider>
      <ShellContent />
    </NavigationProvider>
  );
}

export default App;
