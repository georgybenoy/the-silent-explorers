import type { CinematicSceneData } from '../../types/cinematic';

interface SceneHUDOverlayProps {
  scene: CinematicSceneData;
  totalScenes: number;
  currentSceneIndex: number;
  onSelectScene?: (index: number) => void;
  className?: string;
}

export function SceneHUDOverlay({
  scene,
  totalScenes,
  currentSceneIndex,
  onSelectScene,
  className = '',
}: SceneHUDOverlayProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 ${className}`}>
      {/* Top HUD Telemetry Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-stellar-muted border-b border-white/10 pb-3">
        {/* Left: Mission & Scene Index */}
        <div className="flex items-center space-x-3 pointer-events-auto">
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
      </div>

      {/* Middle Corner HUD Brackets */}
      <div className="w-full flex justify-between items-center pointer-events-none opacity-40">
        <div className="w-3 h-3 border-l-2 border-t-2 border-stellar-gold/40" />
        <div className="w-3 h-3 border-r-2 border-t-2 border-stellar-gold/40" />
      </div>

      {/* Bottom HUD: Live Telemetry Metrics & Scene Dots */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono">
        {/* Telemetry Readout */}
        {scene.telemetry && scene.telemetry.length > 0 ? (
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto">
            {scene.telemetry.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  {item.label}
                </span>
                <span className="text-stellar-white font-medium">
                  {item.value} <span className="text-stellar-cyan text-[10px]">{item.unit || ''}</span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-zinc-600 font-mono">
            // TELEMETRY PASSIVE // ARCHIVAL PROLOGUE
          </div>
        )}

        {/* Scene Navigation Nodes */}
        <nav
          className="flex items-center space-x-1.5 pointer-events-auto"
          aria-label="Chapter I Scene Navigation"
        >
          {Array.from({ length: totalScenes }).map((_, i) => {
            const idx = i + 1;
            const isActive = idx === currentSceneIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectScene?.(idx)}
                className={`h-7 px-2 flex items-center justify-center rounded text-[10px] font-mono transition-all duration-200 focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                  isActive
                    ? 'bg-stellar-gold/20 text-stellar-gold border border-stellar-gold/40 font-bold'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
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
  );
}
