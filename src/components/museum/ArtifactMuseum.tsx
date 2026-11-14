import { useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ArtifactCard } from './ArtifactCard';
import { ArtifactDetailModal } from './ArtifactDetailModal';
import artifactsData from '../../data/artifacts.json';
import type { Artifact, Destination } from '../../types/artifact';
import { matchesDestination, normalizeDestination } from '../../utils/destination';

export function ArtifactMuseum() {
  const {
    activeDestination,
    setActiveDestination,
    selectedArtifactId,
    selectArtifact,
  } = useNavigation();

  const allArtifacts: Artifact[] = artifactsData as Artifact[];

  // Filter artifacts by active destination using normalized comparison
  const filteredArtifacts = useMemo(() => {
    if (normalizeDestination(activeDestination) === 'all') return allArtifacts;
    return allArtifacts.filter((a) => matchesDestination(a.destination, activeDestination));
  }, [allArtifacts, activeDestination]);

  // Find currently selected artifact for modal
  const selectedArtifact = useMemo(() => {
    if (!selectedArtifactId) return null;
    return allArtifacts.find((a) => a.artifactId === selectedArtifactId) || null;
  }, [allArtifacts, selectedArtifactId]);

  const destinationTabs: { id: Destination | 'All'; label: string; count: number }[] = [
    { id: 'All', label: 'ALL DESTINATIONS', count: allArtifacts.length },
    {
      id: 'Moon',
      label: 'THE MOON',
      count: allArtifacts.filter((a) => matchesDestination(a.destination, 'Moon')).length,
    },
    {
      id: 'Mars',
      label: 'MARS',
      count: allArtifacts.filter((a) => matchesDestination(a.destination, 'Mars')).length,
    },
    {
      id: 'Beyond Mars',
      label: 'BEYOND MARS',
      count: allArtifacts.filter((a) => matchesDestination(a.destination, 'Beyond Mars')).length,
    },
  ];

  const getDestinationContext = () => {
    switch (normalizeDestination(activeDestination)) {
      case 'moon':
        return 'The airless basalt plains and highland massifs where Apollo rovers and scientific packages remain in eternal vacuum.';
      case 'mars':
        return 'The wind-swept, iron-oxide deserts where four robotic pioneers traversed ancient flood channels and crater rims.';
      case 'beyond mars':
        return 'Deep space encounters with dwarf planet Ceres and asteroid 433 Eros in the Main Asteroid Belt.';
      case 'all':
      default:
        return 'A curated collection of eight historical spacecraft left across the Moon, Mars, Ceres, and asteroid 433 Eros.';
    }
  };

  return (
    <section
      id="chapter-4"
      className="scroll-mt-24 rounded-2xl bg-space-card/60 border border-white/10 p-6 sm:p-10 space-y-8 relative overflow-hidden"
      aria-label="Chapter IV: Meet the Explorers — Interactive Digital Museum"
    >
      {/* Decorative Corner Framing */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-stellar-gold/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-600 hidden sm:block">
        ARCHIVE REF: NASA-NSSDCA-2026
      </div>

      {/* Header & Mission Mandate */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-stellar-gold animate-pulse" />
          <span className="uppercase tracking-widest font-bold">
            CHAPTER IV // INTERACTIVE DIGITAL MUSEUM
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-stellar-white leading-tight">
          Meet the Explorers
        </h2>

        <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
          {getDestinationContext()}
        </p>

        {/* Museum Collection Overview Stats Strip */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2 font-mono text-xs text-stellar-muted border-t border-white/5">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">EXPLORERS TRACKED</span>
            <span className="text-stellar-white font-bold text-sm">8 Historical Craft</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">CELESTIAL BODIES</span>
            <span className="text-stellar-white font-bold text-sm">4 Explored Bodies</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">HISTORICAL ERA</span>
            <span className="text-stellar-gold font-bold text-sm">1971 — 2024+</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">DOCUMENTATION</span>
            <span className="text-stellar-cyan font-bold text-sm">NASA-Sourced Archive</span>
          </div>
        </div>
      </div>

      {/* Destination Filter Tabs (Aerospace Segmented HUD) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div
          role="tablist"
          aria-label="Filter artifacts by planetary destination"
          className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono"
        >
          {destinationTabs.map((tab) => {
            const isActive = normalizeDestination(activeDestination) === normalizeDestination(tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveDestination(tab.id)}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                  isActive
                    ? 'bg-stellar-gold text-space-black font-bold shadow-[0_0_15px_rgba(232,154,60,0.3)]'
                    : 'text-zinc-400 hover:text-stellar-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] ${
                    isActive ? 'bg-black/20 text-space-black' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-zinc-500 hidden md:inline">
          SHOWING {filteredArtifacts.length} OF {allArtifacts.length} ARTIFACTS
        </span>
      </div>

      {/* Artifacts Collection Grid */}
      {filteredArtifacts.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-white/10 bg-black/40 font-mono space-y-2">
          <p className="text-stellar-gold text-sm font-semibold uppercase tracking-wider">
            No Artifacts Found For This Theater
          </p>
          <p className="text-zinc-400 text-xs">
            Select another destination to inspect historical planetary explorers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredArtifacts.map((artifact) => (
            <ArtifactCard
              key={artifact.artifactId}
              artifact={artifact}
              isSelected={selectedArtifactId === artifact.artifactId}
              onSelect={(id) => selectArtifact(id)}
            />
          ))}
        </div>
      )}

      {/* In-Depth Detailed Artifact Modal */}
      {selectedArtifact && (
        <ArtifactDetailModal
          artifact={selectedArtifact}
          allArtifacts={filteredArtifacts}
          onClose={() => selectArtifact(null)}
          onNavigateArtifact={(id) => selectArtifact(id)}
        />
      )}
    </section>
  );
}
