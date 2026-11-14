import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import artifactsData from '../../data/artifacts.json';
import { TranscriptCard } from '../museum/TranscriptCard';
import type { Artifact } from '../../types/artifact';
import { matchesDestination, normalizeDestination } from '../../utils/destination';

export const FinalChapter: React.FC = () => {
  const { selectArtifact, scrollToChapter, isReducedMotion, activeDestination, setActiveDestination } = useNavigation();
  const artifacts: Artifact[] = artifactsData as Artifact[];

  // Filter for Section 2 using shared destination state
  const displayedArtifacts = normalizeDestination(activeDestination) === 'all'
    ? artifacts 
    : artifacts.filter(a => matchesDestination(a.destination, activeDestination));

  // Helper for destination badges
  const getDestinationBadge = (destination: string) => {
    switch (destination) {
      case 'Moon':
        return 'text-stellar-cyan bg-stellar-cyan/10 border-stellar-cyan/30';
      case 'Mars':
        return 'text-stellar-amber bg-stellar-amber/10 border-stellar-amber/30';
      case 'Beyond Mars':
        return 'text-purple-400 bg-purple-950/40 border-purple-500/30';
      default:
        return 'text-zinc-300 bg-zinc-800/40 border-zinc-700/30';
    }
  };

  // Helper for ending category tags
  const getEndingTag = (artifactId: string) => {
    switch (artifactId) {
      case 'apollo-17-lrv':
        return { label: 'PLANNED LUNAR PARK SITE', color: 'text-zinc-300 border-zinc-700 bg-zinc-900/60' };
      case 'apollo-15-alsep':
        return { label: 'DECOMMISSIONED BY GROUND COMMAND', color: 'text-zinc-300 border-zinc-700 bg-zinc-900/60' };
      case 'sojourner-pathfinder':
        return { label: 'COMMUNICATIONS LOST (SOL 83)', color: 'text-status-lost border-status-lost/30 bg-red-950/30' };
      case 'spirit-mer-a':
        return { label: 'SAND TRAP & LOW SOLAR POWER', color: 'text-status-concluded border-status-concluded/30 bg-amber-950/30' };
      case 'opportunity-mer-b':
        return { label: 'DUST STORM (τ ≈ 10.8)', color: 'text-status-concluded border-status-concluded/30 bg-amber-950/30' };
      case 'ingenuity-mars2020':
        return { label: 'ROTOR TIP FRACTURE', color: 'text-status-concluded border-status-concluded/30 bg-amber-950/30' };
      case 'dawn-spacecraft':
        return { label: 'STABLE CERES ORBIT', color: 'text-status-stable border-status-stable/30 bg-sky-950/30' };
      case 'near-shoemaker':
        return { label: 'LAST CONTACT // EXTREME COLD', color: 'text-purple-300 border-purple-500/30 bg-purple-950/30' };
      default:
        return { label: 'MISSION CONCLUDED', color: 'text-zinc-400 border-white/10 bg-black/40' };
    }
  };

  return (
    <section
      id="chapter-5"
      className="scroll-mt-24 rounded-2xl bg-space-card/70 border border-white/10 p-6 sm:p-10 md:p-14 space-y-16 sm:space-y-24 relative overflow-hidden"
      aria-label="Chapter V: The Final Chapter — Mission Conclusions & Silence"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-950/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-stellar-gold/5 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-6 right-6 text-[10px] font-mono text-zinc-600 hidden sm:block tracking-widest">
        ARCHIVE REF: NASA-NSSDCA-FINAL-OPS
      </div>

      {/* =========================================================================
          SECTION 1: THE LAST SIGNAL
          Visual atmospheric environment, subtle waveform, editorial typography,
          and documentary overview of diverse spacecraft endings.
         ========================================================================= */}
      <div className="space-y-8 max-w-4xl">
        {/* Chapter Header Badge */}
        <div className="flex items-center space-x-2 text-xs font-mono text-status-concluded">
          <span className="w-1.5 h-1.5 rounded-full bg-status-concluded animate-pulse" />
          <span className="uppercase tracking-widest font-bold">
            CHAPTER V // MISSION CONCLUSIONS & SILENCE
          </span>
        </div>

        {/* Editorial Title & Core Theme Quote */}
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stellar-white leading-tight">
            The Final Chapter
          </h2>
          <p className="text-xl sm:text-2xl font-display italic text-stellar-gold font-medium">
            "Every mission has a final signal. Not every story has an ending."
          </p>
        </div>

        {/* Telemetry Carrier Signal Visualization */}
        <div 
          className="rounded-xl border border-white/10 bg-black/60 p-5 sm:p-6 backdrop-blur-sm space-y-4"
          aria-label="Conceptual Telemetry Carrier Signal Waveform Monitor"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-zinc-400 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isReducedMotion ? 'bg-zinc-500' : 'bg-status-concluded animate-ping'}`} />
              <span className="text-stellar-white uppercase tracking-wider font-semibold">
                DEEP SPACE NETWORK CARRIER FREQUENCY MONITOR
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
                ILLUSTRATIVE CONCEPT
              </span>
            </div>
            <div className="flex items-center space-x-4 text-zinc-500">
              <span>FREQUENCY: ~8.4 GHz (X-BAND)</span>
              <span>//</span>
              <span className="text-status-concluded">CARRIER: UNMODULATED → LOSS</span>
            </div>
          </div>

          {/* Explicit Illustrative Disclosure */}
          <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900/60 border border-white/5 rounded px-3 py-1.5 flex items-center justify-between">
            <span>ℹ Illustrative communication visualization; not a reconstruction of a specific mission transmission.</span>
            <span className="hidden md:inline text-zinc-500">Missions utilized diverse architectures (VHF, UHF, S-band, X-band)</span>
          </div>

          {/* SVG Waveform Visualizer */}
          <div className="relative h-16 w-full flex items-center justify-center overflow-hidden">
            <svg 
              className="w-full h-full text-status-concluded/40" 
              viewBox="0 0 1000 64" 
              fill="none" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Baseline reference grid */}
              <line x1="0" y1="32" x2="1000" y2="32" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              
              {/* Decaying Sine Carrier Wave transitioning to Flat Baseline */}
              <path
                d="M 0,32 
                   Q 25,10 50,32 T 100,32 T 150,32 T 200,32 T 250,32 T 300,32 
                   Q 325,16 350,32 T 400,32 T 450,32 T 500,32 
                   Q 525,22 550,32 T 600,32 T 650,32 
                   Q 675,27 700,32 T 750,32 
                   Q 775,30 800,32 L 1000,32"
                stroke="currentColor"
                strokeWidth="1.75"
                fill="none"
                className={isReducedMotion ? '' : 'animate-pulse'}
              />
            </svg>

            {/* Sweep indicator line (disabled with reduced motion) */}
            {!isReducedMotion && (
              <div 
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-status-concluded/15 to-transparent pointer-events-none animate-[shimmer_4s_infinite_linear]"
                style={{
                  animation: 'sweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                }}
              />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
            <span>STATIONS: DSN GOLDSTONE / CANBERRA / MADRID & APOLLO MSFN</span>
            <span>TRANSMITTER STATE: PASSIVE / CARRIER CEASED</span>
          </div>
        </div>

        {/* Narrative Prose */}
        <div className="space-y-4 text-base sm:text-lg text-stellar-gray leading-relaxed">
          <p>
            Across hundreds of millions of kilometers, humanity’s extraterrestrial scouts did not conclude according to a single script. 
            There was no universal shutdown. Instead, the final hours of each machine reflected the radical diversity of planetary exploration.
          </p>
          <p>
            Some concluded deliberately—their transmitters powered off by human command from Houston and Greenbelt when mission objectives had been fulfilled and fiscal budgets expired. 
            Others fought against Martian physics for years past their planned warranties, their solar panels progressively choked by atmospheric dust storms or their aluminum wheels trapped in treacherous sulfate sand. 
            One remains in a long-term stable orbit around dwarf planet Ceres under strict NASA planetary protection requirements, calculated with greater than 99% confidence to remain in orbit for at least 50 years (an estimate, not a guarantee).
          </p>
          <p className="text-stellar-white font-medium">
            Below are the documented final moments, official radio logs, and enduring resting sites of all eight explorers.
          </p>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: EIGHT ENDINGS (DOCUMENTARY SEQUENCE)
          Complete sequence of all 8 explorers with authentic imagery, verified
          dates, ending circumstances, historical transmissions, and museum links.
         ========================================================================= */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-stellar-gold tracking-widest uppercase block mb-1">
              SECTION 2 // HISTORICAL RECORD
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-stellar-white">
              Eight Endings: How the Missions Concluded
            </h3>
          </div>

          {/* Quick Filter Tabs */}
          <div 
            role="tablist"
            aria-label="Filter mission conclusion records by destination"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 font-mono text-xs"
          >
            {(['All', 'Moon', 'Mars', 'Beyond Mars'] as const).map((tab) => {
              const isSelected = normalizeDestination(activeDestination) === normalizeDestination(tab);
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveDestination(tab)}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    isSelected
                      ? 'bg-stellar-gold text-space-black font-bold shadow-[0_0_10px_rgba(232,154,60,0.3)]'
                      : 'text-zinc-400 hover:text-stellar-white hover:bg-white/5'
                  }`}
                  aria-label={`Filter ending records by ${tab}`}
                >
                  {tab === 'All' ? 'ALL 8 EXPLORERS' : tab.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explorer Ending Cards Grid */}
        {displayedArtifacts.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-white/10 bg-black/40 font-mono space-y-2">
            <p className="text-stellar-gold text-sm font-semibold uppercase tracking-wider">
              No Ending Profiles Found For This Theater
            </p>
            <p className="text-zinc-400 text-xs">
              Select another destination to inspect historical mission conclusions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayedArtifacts.map((artifact) => {
            const tag = getEndingTag(artifact.artifactId);
            const destinationBadge = getDestinationBadge(artifact.destination);
            const lastTransmission = artifact.historicalTransmissions?.[0];

            return (
              <article
                key={artifact.artifactId}
                id={`ending-${artifact.artifactId}`}
                className="rounded-xl border border-white/10 bg-space-card/80 overflow-hidden flex flex-col justify-between hover:border-stellar-gold/30 transition-all duration-300 shadow-lg group"
                aria-label={`Ending profile of ${artifact.name}`}
              >
                {/* Top Image Plate & Badges */}
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/90">
                    <img
                      src={artifact.media.fallbackImagePath}
                      alt={artifact.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-card via-black/20 to-black/60 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-widest uppercase border backdrop-blur-md ${destinationBadge}`}>
                        {artifact.destination}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border backdrop-blur-md ${tag.color}`}>
                        {tag.label}
                      </span>
                    </div>

                    {/* Bottom Image Overlay Strip */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>PHOTO: {artifact.media.photoCredits}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-5">
                    {/* Title & Mission Header */}
                    <div>
                      <div className="text-[11px] font-mono text-stellar-muted uppercase tracking-wider mb-1">
                        MISSION: {artifact.missionName} ({artifact.missionNssdcaId})
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-stellar-white group-hover:text-stellar-gold transition-colors">
                        {artifact.name}
                      </h4>
                    </div>

                    {/* Operational Telemetry Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block">LAST CONTACT</span>
                        <span className="text-stellar-white font-semibold">
                          {artifact.lastContactDate || artifact.endOfMissionDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block">OPERATIONAL SPAN</span>
                        <span className="text-stellar-cyan font-semibold">
                          {artifact.specs.actualLifespanDays} Days
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-zinc-500 uppercase block">FINAL LOCATION</span>
                        <span className="text-stellar-amber font-semibold truncate block" title={artifact.coordinates.semanticLabel}>
                          {artifact.coordinates.semanticLabel}
                        </span>
                      </div>
                    </div>

                    {/* Verified Final Moments Narrative */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-stellar-gray uppercase tracking-wider block">
                        CIRCUMSTANCES OF CONCLUSION
                      </span>
                      <p className="text-sm sm:text-base text-stellar-gray leading-relaxed">
                        {artifact.finalMomentsStory}
                      </p>
                    </div>

                    {/* Verbatim Historical Transmission Log */}
                    {lastTransmission && (
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                          AUTHENTIC HISTORICAL RECORD
                        </span>
                        <TranscriptCard record={lastTransmission} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions: Link to Museum Dossier */}
                <div className="px-6 py-4 bg-black/30 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-zinc-500">
                    COORDINATES: <span className="text-zinc-300">{artifact.coordinates.coordinateString}</span>
                  </div>

                  <button
                    onClick={() => selectArtifact(artifact.artifactId)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-stellar-gold/15 hover:bg-stellar-gold/25 border border-stellar-gold/40 text-stellar-gold font-mono text-xs font-semibold tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-stellar-gold"
                    aria-label={`Open full museum dossier for ${artifact.name}`}
                  >
                    <span>VIEW MUSEUM DOSSIER</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        )}
      </div>

      {/* =========================================================================
          SECTION 3: THE SILENCE IS NOT THE SAME (ENDING TAXONOMY)
          Visual comparison of the three distinct ending categories:
          1. Intentionally Left Behind
          2. Lost Contact / Ceased Operations
          3. Still Physically Present Beyond Earth
         ========================================================================= */}
      <div className="space-y-8 border-t border-white/10 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono text-stellar-cyan tracking-widest uppercase block">
            SECTION 3 // ENDING TAXONOMY & COMPARISON
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            The Silence Is Not the Same
          </h3>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            Humanity tends to describe silent spacecraft under a single word: "abandoned." 
            Yet the physics, engineering, and operational choices behind their final silence fall into three fundamentally distinct paradigms.
          </p>
        </div>

        {/* 3 Comparative Taxonomy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1: Intentionally Left Behind */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  CATEGORY I
                </span>
                <span className="text-xs font-mono text-stellar-cyan font-semibold">2 EXPLORERS</span>
              </div>
              <h4 className="font-display text-xl font-bold text-stellar-white">
                Intentionally Left Behind
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Hardware engineered as part of an integrated Apollo lunar exploration architecture where only the crew and lunar samples returned to Earth. 
                These machines were deliberately parked at the completion of surface operations or powered down by ground command once their science programs concluded.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase block">REPRESENTATIVE CRAFT</span>
              <ul className="space-y-1.5 text-stellar-white">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-cyan" />
                  <span>Apollo 17 Lunar Roving Vehicle</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-cyan" />
                  <span>Apollo 15 ALSEP Central Station</span>
                </li>
              </ul>
              <div className="text-[11px] text-zinc-400 pt-2">
                <strong>Physical Environment:</strong> Airless lunar surface; spared from atmospheric wind and water erosion, but subject to space weathering, micrometeoroid bombardment, and extreme diurnal thermal cycling (+120°C to -130°C).
              </div>
            </div>
          </div>

          {/* Category 2: Lost Contact / Ceased Operations */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-amber-950/60 text-stellar-amber border border-amber-800/40">
                  CATEGORY II
                </span>
                <span className="text-xs font-mono text-stellar-amber font-semibold">4 EXPLORERS</span>
              </div>
              <h4 className="font-display text-xl font-bold text-stellar-white">
                Lost Contact / Ceased Operations
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Mobile robotic pioneers that pushed far beyond their designed lifespans until planetary forces—global dust storms, cold Martian winters, sulfate sand traps, or rotor blade impact—ended operations.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase block">REPRESENTATIVE CRAFT</span>
              <ul className="space-y-1.5 text-stellar-white">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-amber" />
                  <span>Sojourner (Sol 83)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-amber" />
                  <span>Spirit (Sol 2,210)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-amber" />
                  <span>Opportunity (Sol 5,111)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-amber" />
                  <span>Ingenuity (Flight 72)</span>
                </li>
              </ul>
              <div className="text-[11px] text-zinc-400 pt-2">
                <strong>Physical Environment:</strong> Martian carbon dioxide winds, settling iron-oxide dust, severe diurnal freeze cycles.
              </div>
            </div>
          </div>

          {/* Category 3: Still Physically Present Beyond Earth */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                  CATEGORY III
                </span>
                <span className="text-xs font-mono text-purple-400 font-semibold">2 EXPLORERS</span>
              </div>
              <h4 className="font-display text-xl font-bold text-stellar-white">
                Still Present Beyond Earth
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Deep space robotic explorers stationed in stable extraterrestrial environments beyond Mars. One softly touched down on an asteroid; the other resides in a long-term stable orbit around Ceres under NASA planetary protection requirements to protect potential subsurface environments.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase block">REPRESENTATIVE CRAFT</span>
              <ul className="space-y-1.5 text-stellar-white">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Dawn (Ceres Stable Orbit)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>NEAR Shoemaker (Asteroid 433 Eros)</span>
                </li>
              </ul>
              <div className="text-[11px] text-zinc-400 pt-2">
                <strong>Physical Environment:</strong> Deep space microgravity vacuum, cosmic radiation, solar radiation pressure.
              </div>
            </div>
          </div>
        </div>

        {/* Explicit Curatorial / Storytelling Disclaimer */}
        <div className="rounded-lg p-4 sm:p-5 border border-white/10 bg-black/50 font-mono text-xs text-stellar-muted space-y-1.5">
          <div className="flex items-center space-x-2 text-stellar-gold font-bold uppercase tracking-wider text-[11px]">
            <span>ℹ</span>
            <span>CURATORIAL NOTE ON MISSION CATEGORIZATION</span>
          </div>
          <p className="leading-relaxed text-zinc-400">
            These three categories represent a curated narrative framework developed for <em>The Silent Explorers</em> to illustrate the diversity of spacecraft conclusions across human spaceflight, planetary rovers, and deep-space orbital mechanics. They are educational storytelling perspectives, not mutually exclusive or rigid official NASA engineering designations.
          </p>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: WHAT REMAINS & FORWARD TRANSITION
          Solemn reflection on the enduring scientific footprint and smooth
          transition to Chapter VI: What They Left Behind.
         ========================================================================= */}
      <div className="space-y-8 border-t border-white/10 pt-12 sm:pt-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-stellar-gold tracking-widest uppercase block">
            SECTION 4 // THE SCIENTIFIC ECHO
          </span>

          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-stellar-white leading-tight">
            "Their transmissions ended. Their discoveries did not."
          </h3>

          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            The silence of these machines is not a void. Across alien regolith and frozen dust, their physical presence continues to perform quiet science. 
            On the Moon, passive laser retroreflectors ping back green laser pulses from Earth observatories every week, tracking the lunar orbit with sub-millimeter precision. 
            On Mars, the tracks of Spirit and Opportunity have become geological features, demonstrating how wind and dust transport regolith across centuries.
          </p>

          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            They went beyond. They discovered. They remain.
          </p>
        </div>

        {/* Transition Button to Chapter VI */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToChapter(6)}
            className="inline-flex items-center space-x-3 px-6 py-4 rounded-xl bg-stellar-gold hover:bg-stellar-amber text-space-black font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(232,154,60,0.3)] hover:shadow-[0_0_35px_rgba(232,154,60,0.5)] focus-visible:ring-2 focus-visible:ring-stellar-gold focus-visible:ring-offset-2 focus-visible:ring-offset-space-black"
            aria-label="Proceed to Chapter VI: What They Left Behind"
          >
            <span>PROCEED TO CHAPTER VI: WHAT THEY LEFT BEHIND</span>
            <span className="text-lg font-bold" aria-hidden="true">→</span>
          </button>

          <span className="text-xs font-mono text-zinc-500">
            NEXT: THE ENDURING PHYSICAL & SCIENTIFIC FOOTPRINT
          </span>
        </div>
      </div>
    </section>
  );
};
