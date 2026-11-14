import type { ReactNode } from 'react';
import type { CinematicSceneData } from '../../types/cinematic';

interface SceneHUDOverlayProps {
  scene: CinematicSceneData;
  totalScenes: number;
  currentSceneIndex: number;
  onSelectScene?: (index: number) => void;
  onPrevScene?: () => void;
  onNextScene?: () => void;
  children?: ReactNode;
  className?: string;
}

export function SceneHUDOverlay({
  scene,
  totalScenes,
  currentSceneIndex,
  onSelectScene,
  onPrevScene,
  onNextScene,
  children,
  className = '',
}: SceneHUDOverlayProps) {
  return (
    <div
      className={`relative z-20 w-full min-h-screen flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-44 sm:pb-48 md:pb-52 box-border min-w-0 ${className}`}
    >
      {/* 1. TOP HUD TELEMETRY BAR */}
      <header className="shrink-0 w-full flex items-center justify-between text-[11px] font-mono text-stellar-muted border-b border-white/10 pb-3">
        {/* Left: Mission & Scene Index */}
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-stellar-gold/90 animate-pulse" />
          <span className="text-stellar-white font-semibold tracking-wider uppercase">
            CHAPTER I // THE SILENCE
          </span>
          <span className="text-zinc-600">//</span>
          <span className="text-stellar-gold font-mono">
            SCENE {String(currentSceneIndex).padStart(2, '0')} OF {String(totalScenes).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Emotional Progression State */}
        <div className="hidden sm:flex items-center space-x-3 text-right">
          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">PROGRESSION:</span>
          <span className="text-stellar-cyan font-mono uppercase tracking-wider font-semibold">
            {scene.emotionalNote}
          </span>
        </div>
      </header>

      {/* 2. MIDDLE NARRATIVE CONTAINER (Natural vertical flow, never collides with HUD) */}
      <main className="flex-1 min-h-0 flex flex-col justify-center py-6 sm:py-8 my-auto max-w-3xl w-full min-w-0">
        {children}
      </main>

      {/* 3. BOTTOM HUD: 3 Distinct Non-Overlapping Regions (Telemetry, Scene Navigation, Scene Selector) */}
      <footer
        className="shrink-0 w-full mb-4 sm:mb-6 bg-space-void/90 sm:bg-space-void/85 border border-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 space-y-3 shadow-2xl z-30 min-w-0 box-border"
        aria-label="Scene Telemetry and Navigation Controls"
      >
        {/* REGION B: Mission Telemetry Grid */}
        {scene.telemetry && scene.telemetry.length > 0 ? (
          <div className="space-y-1.5 w-full min-w-0">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-stellar-gold/90 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-stellar-gold animate-pulse" aria-hidden="true" />
              <span>MISSION TELEMETRY & HISTORICAL COORDINATES:</span>
            </div>

            {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 w-full min-w-0">
              {scene.telemetry.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-black/60 border border-white/10 p-2 sm:p-2.5 flex flex-col justify-center min-w-0 shadow-sm overflow-hidden"
                >
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono truncate block">
                    {item.label}
                  </span>
                  <div className="text-xs font-mono text-stellar-white font-medium break-words leading-relaxed mt-0.5 min-w-0">
                    <span className="break-words">{item.value}</span>
                    {item.unit && (
                      <span className="text-stellar-cyan text-[11px] ml-1.5 break-words">{item.unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-[11px] text-zinc-500 font-mono py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" aria-hidden="true" />
            <span>// TELEMETRY PASSIVE // ARCHIVAL PROLOGUE</span>
          </div>
        )}

        {/* Separator between Telemetry and Controls */}
        <div className="border-t border-white/10 pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs w-full min-w-0">
          {/* REGION A: Scene Navigation Stepper */}
          <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onPrevScene}
              disabled={currentSceneIndex <= 1}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors flex items-center space-x-1 border focus-visible:ring-1 focus-visible:ring-stellar-gold min-h-[36px] ${
                currentSceneIndex <= 1
                  ? 'border-white/5 text-zinc-600 cursor-not-allowed bg-black/20'
                  : 'border-white/15 text-zinc-300 hover:text-stellar-white hover:border-white/40 bg-white/5 hover:bg-white/10'
              }`}
              aria-label="Previous Prologue Scene"
            >
              <span>← PREV SCENE</span>
            </button>

            <div className="px-2.5 py-1.5 rounded bg-black/50 border border-white/10 text-stellar-gold font-mono text-xs font-semibold whitespace-nowrap">
              SCENE {String(currentSceneIndex).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
            </div>

            <button
              type="button"
              onClick={onNextScene}
              disabled={currentSceneIndex >= totalScenes}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors flex items-center space-x-1 border focus-visible:ring-1 focus-visible:ring-stellar-gold min-h-[36px] ${
                currentSceneIndex >= totalScenes
                  ? 'border-white/5 text-zinc-600 cursor-not-allowed bg-black/20'
                  : 'border-stellar-gold/40 text-stellar-gold hover:bg-stellar-gold/15 bg-stellar-gold/5 font-semibold'
              }`}
              aria-label="Next Prologue Scene"
            >
              <span>NEXT SCENE →</span>
            </button>
          </div>

          {/* REGION C: Scene Selector (Numbered Indicators 01–07) */}
          <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-1.5 w-full sm:w-auto overflow-x-auto pb-0.5 shrink-0">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden md:inline mr-1">
              SCENES:
            </span>
            <nav
              className="flex items-center space-x-1 sm:space-x-1.5"
              aria-label="Prologue Scene Navigation"
            >
              {Array.from({ length: totalScenes }).map((_, i) => {
                const idx = i + 1;
                const isActive = idx === currentSceneIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectScene?.(idx)}
                    className={`min-w-[32px] sm:min-w-[36px] h-8 px-2 flex items-center justify-center rounded text-xs font-mono transition-all duration-200 focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                      isActive
                        ? 'bg-stellar-gold text-space-black border border-stellar-gold font-bold shadow-[0_0_10px_rgba(232,154,60,0.3)]'
                        : 'text-zinc-400 hover:text-stellar-white hover:bg-white/10 border border-white/10'
                    }`}
                    aria-label={`Jump to Scene ${idx}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    0{idx}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
