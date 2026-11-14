import { useEffect, useRef } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { WebGLProvider } from './context/WebGLContext';
import { Navbar } from './components/layout/Navbar';
import { TimelineBar } from './components/layout/TimelineBar';
import { CitationsDrawer } from './components/layout/CitationsDrawer';
import { MobileMenu } from './components/layout/MobileMenu';
import { ChapterOneSilence } from './components/cinematic/ChapterOneSilence';
import { InteractiveSolarSystem } from './components/solarSystem/InteractiveSolarSystem';
import { ForgottenWorldsStage } from './components/planetary/ForgottenWorldsStage';
import { ArtifactMuseum } from './components/museum/ArtifactMuseum';
import { FinalChapter } from './components/finalChapter/FinalChapter';
import { WhatTheyLeftBehind } from './components/leftBehind/WhatTheyLeftBehind';
import { TheLegacy } from './components/legacy/TheLegacy';
import chaptersData from './data/chapters.json';
import type { Chapter } from './types/chapter';

const CHAPTER_IDS = [1, 2, 3, 4, 5, 6, 7];

function ShellContent() {
  const {
    activeChapterId,
    setActiveChapterId,
    activeDestination,
    isReducedMotion,
    isNavigatingChapterRef,
  } = useNavigation();

  const chapters: Chapter[] = chaptersData as Chapter[];
  const currentActiveChapterIdRef = useRef<number>(activeChapterId);

  useEffect(() => {
    currentActiveChapterIdRef.current = activeChapterId;
  }, [activeChapterId]);

  // Robust active-section detection system across all seven chapters
  useEffect(() => {
    let rafId: number | null = null;

    const detectActiveChapter = () => {
      // If user triggered an intentional navigation click and smooth scroll is animating, skip detection
      if (isNavigatingChapterRef.current) {
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page boundary: Chapter 1 is active
      if (scrollY <= 80) {
        if (currentActiveChapterIdRef.current !== 1) {
          setActiveChapterId(1);
        }
        return;
      }

      // 2. Bottom of page boundary: Chapter 7 is active
      if (scrollY + windowHeight >= documentHeight - 100) {
        if (currentActiveChapterIdRef.current !== 7) {
          setActiveChapterId(7);
        }
        return;
      }

      // 3. Primary Reading Line (probe zone): 35% of viewport height, accounting for sticky navbar
      const readingLine = Math.min(Math.max(windowHeight * 0.35, 120), windowHeight - 140);

      const viewportTop = 70; // Below sticky header
      const viewportBottom = windowHeight - 90; // Above fixed timeline

      let candidateChapter = 1;
      let maxVisibleHeight = -1;

      for (const id of CHAPTER_IDS) {
        const el = document.getElementById(`chapter-${id}`);
        if (!el) continue;

        // Chapter 1 may be wrapped in a GSAP .pin-spacer during pinned scroll
        let container: HTMLElement = el;
        if (id === 1 && el.parentElement?.classList.contains('pin-spacer')) {
          container = el.parentElement;
        }

        const rect = container.getBoundingClientRect();

        // Direct hit: the reading probe line is inside this chapter
        if (rect.top <= readingLine && rect.bottom > readingLine) {
          candidateChapter = id;
          maxVisibleHeight = Infinity;
          break;
        }

        // Fallback: Compute visible overlap inside the active reading window
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          candidateChapter = id;
        }
      }

      if (candidateChapter >= 1 && candidateChapter <= 7 && candidateChapter !== currentActiveChapterIdRef.current) {
        setActiveChapterId(candidateChapter);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        detectActiveChapter();
        rafId = null;
      });
    };

    const handleScrollEnd = () => {
      isNavigatingChapterRef.current = false;
      detectActiveChapter();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });

    // Check for initial URL anchor or run initial detection
    const initialHash = window.location.hash;
    if (initialHash) {
      const match = initialHash.match(/^#chapter-(\d+)$/);
      if (match) {
        const hashId = parseInt(match[1], 10);
        if (hashId >= 1 && hashId <= 7) {
          setActiveChapterId(hashId);
        }
      }
    } else {
      detectActiveChapter();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [setActiveChapterId, isNavigatingChapterRef]);

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
        <section id="chapter-2" className="scroll-mt-24">
          <InteractiveSolarSystem />
        </section>

        {/* Chapter 3: The Forgotten Worlds */}
        <section id="chapter-3" className="scroll-mt-24">
          <ForgottenWorldsStage />
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
      <WebGLProvider>
        <ShellContent />
      </WebGLProvider>
    </NavigationProvider>
  );
}

export default App;
