import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigation } from '../../context/NavigationContext';
import { chapterOneScenes } from '../../data/chapterOneScenes';
import { CosmicDustCanvas } from './CosmicDustCanvas';
import { AttributionBadge } from './AttributionBadge';
import { SceneHUDOverlay } from './SceneHUDOverlay';
import type { CinematicSceneData } from '../../types/cinematic';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ChapterOneSilence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scenesTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(1);
  const { isReducedMotion, scrollToChapter, selectArtifact } = useNavigation();

  const totalScenes = chapterOneScenes.length;
  const currentScene: CinematicSceneData =
    chapterOneScenes[activeSceneIndex - 1] || chapterOneScenes[0];

  // GSAP ScrollTrigger Integration for Smooth Pin-Scrubbed Storytelling
  useGSAP(
    () => {
      if (isReducedMotion || !containerRef.current) return;

      const scenes = gsap.utils.toArray<HTMLElement>('.cinematic-scene-panel');
      if (scenes.length === 0) return;

      // Create main pinned scroll trigger
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScenes * 100}%`,
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const calculatedIndex = Math.min(
            totalScenes,
            Math.max(1, Math.floor(progress * totalScenes) + 1)
          );
          setActiveSceneIndex((prev) => (prev !== calculatedIndex ? calculatedIndex : prev));
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [isReducedMotion, totalScenes] }
  );

  // Direct scene navigation (jump smoothly and synchronize scroll position)
  const jumpToScene = (targetIndex: number) => {
    setActiveSceneIndex(targetIndex);

    if (containerRef.current) {
      if (targetIndex === 1) {
        // True beginning reset
        containerRef.current.scrollIntoView({
          behavior: isReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      } else if (!isReducedMotion) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollY =
          window.scrollY +
          rect.top +
          ((targetIndex - 1) / (totalScenes - 1)) * (totalScenes * window.innerHeight * 0.85);

        window.scrollTo({
          top: scrollY,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleNextScene = () => {
    if (activeSceneIndex < totalScenes) {
      jumpToScene(activeSceneIndex + 1);
    }
  };

  const handlePrevScene = () => {
    if (activeSceneIndex > 1) {
      jumpToScene(activeSceneIndex - 1);
    }
  };

  return (
    <section
      id="chapter-1"
      ref={containerRef}
      className="relative w-full min-h-screen bg-space-black text-stellar-white overflow-hidden select-none border-b border-white/10"
      aria-label="Chapter I: The Silence — Cinematic Space Prologue"
    >
      {/* Background Cosmic Starfield & Particle Atmosphere */}
      <CosmicDustCanvas />

      {/* Visual Scene Plates with Smooth Transitions & Ken Burns Effect */}
      <div
        ref={scenesTrackRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        {chapterOneScenes.map((scene, idx) => {
          const isCurrent = idx + 1 === activeSceneIndex;

          return (
            <div
              key={scene.id}
              className={`cinematic-scene-panel absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out ${
                isCurrent ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {/* Primary Background NASA Imagery with Restrained Ken Burns Drift */}
              {scene.imageSrc && (
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={scene.imageSrc}
                    alt={scene.imageAlt || scene.sceneTitle}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-out filter brightness-[0.75] contrast-[1.1] ${
                      isCurrent && !isReducedMotion ? 'scale-105 translate-x-1' : 'scale-100'
                    }`}
                  />
                  {/* Subtle Cinematic Vignette & Deep Space Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/50 to-space-black/80 pointer-events-none" />
                  <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-80" />
                </div>
              )}

              {/* Secondary Comparison Imagery for Multi-world scenes (e.g. Moon + Mars in Scene 4) */}
              {scene.secondaryImageSrc && (
                <div className="hidden lg:block absolute right-8 top-1/4 w-80 h-48 rounded-lg overflow-hidden border border-white/20 shadow-2xl z-10 backdrop-blur-sm">
                  <img
                    src={scene.secondaryImageSrc}
                    alt={scene.secondaryImageAlt || 'Secondary Exploration Context'}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  {scene.secondaryAttribution && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <AttributionBadge attribution={scene.secondaryAttribution} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Atmospheric Aerospace HUD Overlay */}
      <SceneHUDOverlay
        scene={currentScene}
        totalScenes={totalScenes}
        currentSceneIndex={activeSceneIndex}
        onSelectScene={jumpToScene}
      />

      {/* Foreground Editorial Narrative Container */}
      <div className="relative z-20 max-w-5xl mx-auto min-h-screen flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto space-y-6">
          {/* Scene Header Telemetry Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black/60 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-stellar-gold animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-stellar-gold uppercase">
              {currentScene.sceneTag}
            </span>
            <span className="text-zinc-600">//</span>
            <span className="text-[11px] font-mono text-stellar-muted uppercase">
              {currentScene.emotionalNote}
            </span>
          </div>

          {/* Primary Scene Headings */}
          {activeSceneIndex === 6 ? (
            /* Scene 6: Monolithic Title Reveal */
            <div className="space-y-4 pt-4">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stellar-white uppercase leading-none drop-shadow-2xl">
                THE SILENT EXPLORERS
              </h1>
              <p className="font-mono text-base sm:text-lg text-stellar-gold tracking-widest uppercase font-semibold">
                THEY WENT BEYOND. THEY DISCOVERED. THEY REMAIN.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stellar-white leading-tight">
                {currentScene.primaryHeading}
              </h2>
              {currentScene.sceneSubtitle && (
                <p className="text-base sm:text-lg text-stellar-gold font-mono tracking-wide">
                  {currentScene.sceneSubtitle}
                </p>
              )}
            </div>
          )}

          {/* Documentary Narrative Lines */}
          <div className="space-y-4 text-base sm:text-lg text-stellar-gray font-normal leading-relaxed max-w-2xl">
            {currentScene.narrativeLines.map((line, idx) => (
              <p
                key={idx}
                className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Official NASA Source Attribution Badge */}
          {currentScene.nasaAttribution && (
            <div className="pt-2">
              <AttributionBadge attribution={currentScene.nasaAttribution} />
            </div>
          )}

          {/* Scene 7: Interactive Journey Invitation CTAs */}
          {activeSceneIndex === 7 && (
            <div className="pt-6 flex flex-wrap items-center gap-4 animate-fade-in">
              <button
                type="button"
                onClick={() => scrollToChapter(2)}
                className="px-6 py-3.5 rounded-lg bg-stellar-gold text-space-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-stellar-amber transition-all duration-200 shadow-[0_0_25px_rgba(232,154,60,0.4)] flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>ENTER THE EXPEDITION RECORD</span>
                <span className="text-sm font-sans">→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  scrollToChapter(4);
                  selectArtifact('apollo-17-lrv');
                }}
                className="px-5 py-3.5 rounded-lg bg-white/5 border border-white/15 text-stellar-white font-mono text-xs font-medium uppercase tracking-wider hover:bg-white/10 hover:border-stellar-gold/40 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-stellar-gold"
              >
                <span>EXPLORE THE 8 EXPLORERS</span>
              </button>

              <button
                type="button"
                onClick={() => jumpToScene(1)}
                className="px-4 py-3.5 rounded-lg text-zinc-400 hover:text-stellar-white font-mono text-xs uppercase tracking-wider transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold"
              >
                <span>↺ REPLAY PROLOGUE</span>
              </button>
            </div>
          )}

          {/* Stepper Controls for Manual Navigation / Accessibility */}
          <div className="pt-4 flex items-center space-x-4">
            <button
              type="button"
              onClick={handlePrevScene}
              disabled={activeSceneIndex === 1}
              className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-colors flex items-center space-x-1 border focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                activeSceneIndex === 1
                  ? 'border-white/5 text-zinc-600 cursor-not-allowed'
                  : 'border-white/10 text-zinc-400 hover:text-stellar-white hover:border-white/30'
              }`}
              aria-label="Previous Prologue Scene"
            >
              <span>← PREV SCENE</span>
            </button>

            <button
              type="button"
              onClick={handleNextScene}
              disabled={activeSceneIndex === totalScenes}
              className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-colors flex items-center space-x-1 border focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                activeSceneIndex === totalScenes
                  ? 'border-white/5 text-zinc-600 cursor-not-allowed'
                  : 'border-stellar-gold/40 text-stellar-gold hover:bg-stellar-gold/10'
              }`}
              aria-label="Next Prologue Scene"
            >
              <span>NEXT SCENE →</span>
            </button>

            <span className="text-[11px] font-mono text-zinc-500">
              [ SCENE {activeSceneIndex} / {totalScenes} ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
