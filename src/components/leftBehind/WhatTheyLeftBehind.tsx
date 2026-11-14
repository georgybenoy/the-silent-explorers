import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import artifactsData from '../../data/artifacts.json';
import type { Artifact } from '../../types/artifact';

export const WhatTheyLeftBehind: React.FC = () => {
  const { selectArtifact, scrollToChapter, isReducedMotion } = useNavigation();
  const artifacts: Artifact[] = artifactsData as Artifact[];
  const [activeDestination, setActiveDestination] = useState<'All' | 'Moon' | 'Mars' | 'Beyond Mars'>('All');

  // Filter artifacts by destination for Section 2
  const filteredArtifacts = activeDestination === 'All'
    ? artifacts
    : artifacts.filter(a => a.destination === activeDestination);

  // Helper for destination badges
  const getDestinationBadge = (dest: string) => {
    switch (dest) {
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

  return (
    <section
      id="chapter-6"
      className="scroll-mt-24 rounded-2xl bg-space-card/70 border border-white/10 p-6 sm:p-10 md:p-14 space-y-16 sm:space-y-24 relative overflow-hidden"
      aria-label="Chapter VI: What They Left Behind — Physical & Scientific Enduring Footprint"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-stellar-gold/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-6 right-6 text-[10px] font-mono text-zinc-600 hidden sm:block tracking-widest">
        ARCHIVE REF: NASA-NSSDCA-LEGACY-06
      </div>

      {/* =========================================================================
          SECTION 1: THE OBJECTS THAT REMAIN
          Visual transition from Chapter V carrier loss into physical planetary presence.
         ========================================================================= */}
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-center space-x-2 text-xs font-mono text-status-passive">
          <span className="w-1.5 h-1.5 rounded-full bg-status-passive animate-pulse" />
          <span className="uppercase tracking-widest font-bold">
            CHAPTER VI // ENDURING FOOTPRINTS & SCIENCE
          </span>
        </div>

        {/* Editorial Title & Central Narrative */}
        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stellar-white leading-tight">
            What They Left Behind
          </h2>
          <p className="text-xl sm:text-2xl font-display italic text-stellar-gold font-medium">
            "They left more than machines. They left evidence."
          </p>
        </div>

        {/* Visual Transition Plate: From Signal Loss to Physical Terrain */}
        <div 
          className="rounded-xl border border-white/10 bg-black/60 p-5 sm:p-6 backdrop-blur-sm space-y-4"
          aria-label="Transition Visualizer: From Waveform to Extraterrestrial Regolith"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-zinc-400 border-b border-white/10 pb-3">
            <span className="text-stellar-white uppercase font-semibold">
              TRANSITION // TELEMETRY TERMINATION → PHYSICAL PRESENCE
            </span>
            <span className="text-status-passive">STATUS: PHYSICAL HARBOR CONFIRMED</span>
          </div>

          {/* SVG Visual Contour: Signal dying out into planetary horizon */}
          <div className="relative h-20 w-full flex items-center justify-center overflow-hidden">
            <svg 
              className="w-full h-full text-zinc-400" 
              viewBox="0 0 1000 80" 
              fill="none" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Flat Carrier Baseline */}
              <line x1="0" y1="20" x2="350" y2="20" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Transition curve into planetary surface contour */}
              <path
                d="M 350,20 C 420,20 460,55 520,55 C 580,55 620,40 680,48 C 740,56 800,42 860,50 L 1000,52"
                stroke="#10B981"
                strokeWidth="2"
                fill="none"
              />

              {/* Surface Regolith Shading */}
              <path
                d="M 520,55 C 580,55 620,40 680,48 C 740,56 800,42 860,50 L 1000,52 L 1000,80 L 520,80 Z"
                fill="rgba(16, 185, 129, 0.06)"
              />

              {/* Marker Pips on the Horizon */}
              <circle cx="580" cy="52" r="3" fill="#E89A3C" className={isReducedMotion ? '' : 'animate-pulse'} />
              <circle cx="720" cy="49" r="3" fill="#38BDF8" className={isReducedMotion ? '' : 'animate-pulse'} />
              <circle cx="890" cy="50" r="3" fill="#A855F7" className={isReducedMotion ? '' : 'animate-pulse'} />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
            <span>DISPOSITION: 6 SURFACE RESTING SITES // 1 GRAVITATIONAL ORBIT // 1 ASTEROID REGOLITH</span>
            <span>RADIO STATE: SILENT</span>
          </div>
        </div>

        {/* Lead Narrative */}
        <div className="space-y-4 text-base sm:text-lg text-stellar-gray leading-relaxed">
          <p className="font-display text-xl sm:text-2xl text-stellar-white font-semibold">
            What remains is more than silence.
          </p>
          <p>
            When a spacecraft sends its last signal, its story does not vanish into the void. 
            Across the inner solar system, their physical hulls remain anchored to basalt plateaus, resting in iron-oxide sands, or continuing along stable gravitational orbits.
          </p>
          <p>
            These machines are not abandoned scrap. They are humanity's farthest archaeological sites and world-class scientific monuments. 
            They mapped ancient oceans, proved controlled flight is possible in razor-thin alien air, and left physical markers that still reflect green laser light back to terrestrial telescopes today.
          </p>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: A MUSEUM WITHOUT WALLS
          Curated visual collection of the eight explorers plus Apollo 15 LRRR,
          grouped by destination (The Moon, Mars, Beyond Mars).
         ========================================================================= */}
      <div className="space-y-10 border-t border-white/10 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-stellar-gold tracking-widest uppercase block mb-1">
              SECTION 2 // THE PHYSICAL RECORD
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-stellar-white">
              A Museum Without Walls
            </h3>
            <p className="text-sm text-stellar-gray mt-1">
              The permanent physical artifacts, locations, and surviving hardware left across four worlds.
            </p>
          </div>

          {/* Destination Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 font-mono text-xs">
            {(['All', 'Moon', 'Mars', 'Beyond Mars'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDestination(tab)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeDestination === tab
                    ? 'bg-white/15 text-stellar-white font-bold'
                    : 'text-zinc-400 hover:text-stellar-white hover:bg-white/5'
                }`}
                aria-label={`Filter artifacts by ${tab}`}
              >
                {tab === 'All' ? 'ALL OBJECTS' : tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredArtifacts.map((artifact) => {
            const destBadge = getDestinationBadge(artifact.destination);

            return (
              <article
                key={artifact.artifactId}
                id={`left-behind-${artifact.artifactId}`}
                className="rounded-xl border border-white/10 bg-space-card/80 overflow-hidden flex flex-col justify-between hover:border-status-passive/40 transition-all duration-300 shadow-lg group"
                aria-label={`Physical legacy profile for ${artifact.name}`}
              >
                <div>
                  {/* Archival Photography Header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/90">
                    <img
                      src={artifact.media.fallbackImagePath}
                      alt={artifact.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-card via-black/20 to-black/60 pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-widest uppercase border backdrop-blur-md ${destBadge}`}>
                        {artifact.destination}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border backdrop-blur-md bg-black/60 text-zinc-300 border-white/10">
                        {artifact.locationType.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>PHOTO: {artifact.media.photoCredits}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <div className="text-[11px] font-mono text-stellar-muted uppercase tracking-wider mb-1">
                        MISSION: {artifact.missionName} ({artifact.missionNssdcaId})
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-stellar-white group-hover:text-status-passive transition-colors">
                        {artifact.name}
                      </h4>
                    </div>

                    {/* Coordinates & Location Strip */}
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500 uppercase">CURRENT LOCATION</span>
                        <span className="text-stellar-white font-semibold">{artifact.coordinates.coordinateString}</span>
                      </div>
                      <div className="text-[11px] text-stellar-amber truncate">
                        {artifact.coordinates.semanticLabel}
                      </div>
                    </div>

                    {/* What Physically Remains */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-status-passive uppercase tracking-wider font-semibold block">
                        WHAT PHYSICALLY REMAINS
                      </span>
                      <p className="text-sm text-stellar-gray leading-relaxed">
                        {artifact.currentCondition}
                      </p>
                    </div>

                    {/* Enduring Scientific Value */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-stellar-gold uppercase tracking-wider font-semibold block">
                        SCIENTIFIC LEGACY & EVIDENCE
                      </span>
                      <p className="text-sm text-stellar-gray leading-relaxed">
                        {artifact.scientificLegacy}
                      </p>
                    </div>

                    {/* Associated Equipment Callout: Apollo 15 LRRR */}
                    {artifact.associatedEquipment && artifact.associatedEquipment.length > 0 && (
                      <div className="rounded-lg p-3 bg-stellar-cyan/5 border border-stellar-cyan/20 space-y-1 font-mono text-xs">
                        <div className="flex items-center space-x-2 text-stellar-cyan font-bold text-[11px]">
                          <span>✦</span>
                          <span className="uppercase tracking-wider">SEPARATE PASSIVE EXPERIMENT: LRRR</span>
                        </div>
                        <p className="text-zinc-300 text-[11px] leading-relaxed">
                          The 300-prism Laser Ranging Retroreflector was deployed ~40 m away as an independent, unpowered optical array. Unlike the deactivated ALSEP central station, the reflector requires zero electricity and continues to reflect laser pulses fired from Earth observatories today.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link to Museum Dossier */}
                <div className="px-6 py-4 bg-black/30 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">
                    STATUS: {artifact.statusLabel}
                  </span>
                  <button
                    onClick={() => selectArtifact(artifact.artifactId)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-status-passive/15 hover:bg-status-passive/25 border border-status-passive/40 text-status-passive font-mono text-xs font-semibold tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-status-passive"
                    aria-label={`Inspect museum dossier for ${artifact.name}`}
                  >
                    <span>VIEW DOSSIER</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: THE EVIDENCE THEY LEFT
          Documentary deep dive into the lasting scientific contributions.
         ========================================================================= */}
      <div className="space-y-10 border-t border-white/10 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono text-stellar-cyan tracking-widest uppercase block">
            SECTION 3 // VERIFIED DISCOVERIES
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            The Evidence They Left
          </h3>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            The enduring value of these missions is not measured solely in physical metal, but in the paradigm-shifting evidence they gathered across decades of exploration.
          </p>
        </div>

        {/* Thematic Scientific Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Apollo 15 ALSEP & LRRR */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stellar-cyan/10 border border-stellar-cyan/30 text-stellar-cyan uppercase font-bold tracking-wider">
                LUNAR GEOPHYSICS & LASER RANGING
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Apollo 15: Lunar Interior & Orbit
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                As part of the Apollo Passive Seismic Experiment network, Apollo 15 operated alongside Stations 12, 14, and 16 to collectively record lunar seismic events and tidal stresses, establishing the baseline for lunar crustal thickness and core models. Nearby, the separate passive 300-prism LRRR optical array continues to return Earth laser pulses, measuring the Moon's 3.8 cm/year recession and testing gravitational physics without electrical power.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: Apollo Lunar Surface Journal / LRRR Apache Point
            </div>
          </div>

          {/* Apollo 17 LRV */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stellar-cyan/10 border border-stellar-cyan/30 text-stellar-cyan uppercase font-bold tracking-wider">
                HUMAN LUNAR MOBILITY
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Apollo 17 LRV: 35.89 km Traverses
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                By enabling Commander Eugene Cernan and astronaut-geologist Harrison Schmitt to traverse 35.89 km across Taurus-Littrow (up to 7.6 km from the lander), the rover provided the mobility needed for Schmitt to discover the volcanic orange glass beads at Shorty Crater, which provided evidence of ancient explosive pyroclastic volcanism in lunar history.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: NASA SP-287 / NSSDCA 1972-096A
            </div>
          </div>

          {/* Sojourner */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stellar-amber/10 border border-stellar-amber/30 text-stellar-amber uppercase font-bold tracking-wider">
                AUTONOMOUS SURFACE MOBILITY
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Sojourner: Pioneering Mobile Mars
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Demonstrated that microrovers using rocker-bogie suspensions and forward stereo cameras could safely navigate extraterrestrial boulders. Its APXS contact spectrometer analyzed "Barnacle Bill" and "Yogi", establishing volcanic andesite-like compositions in Ares Vallis.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: USGS / JPL Mars Pathfinder Science Results
            </div>
          </div>

          {/* Spirit (MER-A) */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stellar-amber/10 border border-stellar-amber/30 text-stellar-amber uppercase font-bold tracking-wider">
                HYDROTHERMAL PROCESSES
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Spirit: Silica-Rich Soil Discovery at Home Plate
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                While exploring near Home Plate—months before becoming immobilized in the sands of Troy—Spirit churned up bright subsurface soil containing up to 90% silica with its malfunctioning, dragging right-front wheel. Planetary scientists identified volcanic fumaroles or hot springs as leading candidate environments for its formation, pointing to past water-rock chemical alteration.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: NASA JPL Spirit Science Archive / Squyres et al.
            </div>
          </div>

          {/* Opportunity (MER-B) */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stellar-amber/10 border border-stellar-amber/30 text-stellar-amber uppercase font-bold tracking-wider">
                ANCIENT AQUEOUS ENVIRONMENTS
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Opportunity: 45.16 km & Ancient Water Alteration
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Traversed 45.16 kilometers across Meridiani Planum. At Eagle Crater and surrounding outcrops, Opportunity discovered hematite-rich spherules ('blueberries') and the sulfate mineral jarosite, providing strong on-site mineralogical evidence of past liquid water and acidic groundwater percolation through ancient Martian rocks.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: NASA JPL MER Press Release 2019-022
            </div>
          </div>

          {/* Ingenuity */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stellar-amber/10 border border-stellar-amber/30 text-stellar-amber uppercase font-bold tracking-wider">
                EXTRATERRESTRIAL AERODYNAMICS
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Ingenuity: 72 Martian Aerial Flights
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Proved that controlled aerodynamic flight is possible in Mars's 1% density atmosphere. Over 72 flights spanning 17.0 km and 128.8 minutes of airtime, it acted as an aerial scout for Perseverance, fundamentally changing paradigms for planetary surface reconnaissance.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: NASA JPL Ingenuity Flight Logs / Teddy Tzanetos
            </div>
          </div>

          {/* Dawn */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-400/10 border border-purple-500/30 text-purple-300 uppercase font-bold tracking-wider">
                DEEP SPACE ION PROPULSION
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Dawn: Vesta & Ceres Ocean World
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                The first spacecraft to orbit two separate extraterrestrial bodies. Revealed that Ceres is an icy ocean-relic world featuring cryovolcanism (Ahuna Mons) and bright sodium carbonate faculae in Occator Crater, redefining where liquid brine can persist in the solar system.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: NASA JPL Dawn Science Archive / Russell et al.
            </div>
          </div>

          {/* NEAR Shoemaker */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-400/10 border border-purple-500/30 text-purple-300 uppercase font-bold tracking-wider">
                ASTEROID TOUCHDOWN & PRISTINE NEBULA
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                NEAR: 433 Eros Composition
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                The first spacecraft to orbit and softly land on an asteroid. Returned the first surface gamma-ray spectrometry from an asteroid across seven days of post-landing operations, yielding elemental abundance ratios consistent with ordinary chondritic composition, though the compositional link was not definitive.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              SOURCE: JHU-APL NEAR Operations / NSSDCA 1996-008A
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: THE INVISIBLE LEGACY
          Scientific data preservation, planetary cartography, and future planning.
         ========================================================================= */}
      <div className="space-y-8 border-t border-white/10 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono text-stellar-gold tracking-widest uppercase block">
            SECTION 4 // DATA BEYOND METAL
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            The Invisible Legacy
          </h3>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            A mission’s scientific life does not terminate when its battery discharges or carrier drops. Long after the hardware goes silent, its telemetry and observations continue to generate new discoveries on Earth.
          </p>
        </div>

        {/* 4 Pillars of Invisible Legacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3">
            <div className="text-stellar-cyan font-mono text-xs font-bold uppercase tracking-wider">
              01 // OPEN SCIENTIFIC ARCHIVES
            </div>
            <h4 className="font-display text-xl font-bold text-stellar-white">
              The Planetary Data System
            </h4>
            <p className="text-sm text-stellar-gray leading-relaxed">
              Every spectral reading, panoramic frame, and atmospheric temperature record is deposited into NASA's Planetary Data System (PDS) and the NSSDCA. Decades later, planetary scientists re-process Apollo seismic tapes or Pathfinder APXS spectra using modern algorithms, extracting discoveries that 1970s and 1990s computers could not detect.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3">
            <div className="text-stellar-amber font-mono text-xs font-bold uppercase tracking-wider">
              02 // EXTRATERRESTRIAL CARTOGRAPHY
            </div>
            <h4 className="font-display text-xl font-bold text-stellar-white">
              High-Precision Planetary Maps
            </h4>
            <p className="text-sm text-stellar-gray leading-relaxed">
              Surface coordinates, topographical contours, and orbital imagery from these missions established foundational reference frames for landing site candidates and regional geological mapping on the Moon, Mars, Ceres, and asteroid 433 Eros.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3">
            <div className="text-status-passive font-mono text-xs font-bold uppercase tracking-wider">
              03 // AEROSPACE ENGINEERING BLUEPRINTS
            </div>
            <h4 className="font-display text-xl font-bold text-stellar-white">
              Flight-Proven Architectural Standards
            </h4>
            <p className="text-sm text-stellar-gray leading-relaxed">
              The rocker-bogie kinematic suspension tested on Sojourner provided fundamental mobility architecture lessons for subsequent Mars rovers. Similarly, Ingenuity's 72 flights established the core aerodynamic, autonomous flight-control, and rotor-performance baselines for future extraterrestrial rotorcraft concepts.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3">
            <div className="text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              04 // ONGOING PASSIVE OBSERVATION
            </div>
            <h4 className="font-display text-xl font-bold text-stellar-white">
              Targeted Physical Milestones
            </h4>
            <p className="text-sm text-stellar-gray leading-relaxed">
              While the retired electronic stations are silent and no longer monitored, Apollo passive laser retroreflectors continue to be pinged weekly from terrestrial observatories, maintaining a continuous 50-year measurement baseline of the Earth-Moon gravitational system.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5: THE HUMAN CONNECTION
          Attributed reflection on the scientists, engineers, and flight teams.
         ========================================================================= */}
      <div className="space-y-8 border-t border-white/10 pt-12 sm:pt-16">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono text-stellar-cyan tracking-widest uppercase block">
            SECTION 5 // THE HUMAN ARCHITECTS
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            Built by humans. Sent beyond us. Remembered through discovery.
          </h3>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            Behind every silent machine were generations of human beings—engineers who machined aluminum wheels, mathematicians who calculated gravity assists, and flight controllers who lived on Martian solar time, synchronized to the dawn of another planet.
          </p>
        </div>

        {/* Attributed Quotes Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Jim Bridenstine Quote */}
          <div className="rounded-xl border border-white/10 bg-black/50 p-6 space-y-3">
            <div className="text-stellar-gold text-2xl font-serif">“</div>
            <p className="text-sm sm:text-base text-stellar-white italic leading-relaxed">
              It is because of trailblazing missions like Opportunity that there will come a day when our brave astronauts walk on the surface of Mars.
            </p>
            <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
              — Jim Bridenstine, NASA Administrator, Opportunity Mission Conclusion Announcement (February 13, 2019)
            </div>
          </div>

          {/* Gene Cernan Quote */}
          <div className="rounded-xl border border-white/10 bg-black/50 p-6 space-y-3">
            <div className="text-stellar-cyan text-2xl font-serif">“</div>
            <p className="text-sm sm:text-base text-stellar-white italic leading-relaxed">
              ...as we leave the Moon at Taurus-Littrow, we leave as we came and, God willing, as we shall return, with peace and hope for all mankind. Godspeed the crew of Apollo 17.
            </p>
            <div className="text-xs font-mono text-zinc-400 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <span>— Gene Cernan, Apollo 17 Commander (Dec 14, 1972)</span>
              <a 
                href="https://history.nasa.gov/alsj/a17/a17.eva3close.html" 
                target="_blank" 
                rel="noreferrer"
                className="text-stellar-cyan hover:underline inline-flex items-center space-x-1"
                aria-label="View Apollo 17 EVA-3 closeout transcript in Apollo Lunar Surface Journal"
              >
                <span>ALSJ Transcript</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6: TRANSITION TO CHAPTER VII
          Solemn close and forward link to Chapter VII: The Legacy.
         ========================================================================= */}
      <div className="space-y-8 border-t border-white/10 pt-12 sm:pt-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-stellar-gold tracking-widest uppercase block">
            SECTION 6 // CONTINUING HORIZON
          </span>

          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-stellar-white leading-tight">
            "The machines remain. The knowledge travels."
          </h3>

          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            The silent explorers have completed their operational chapters, but their footprints across the solar system now lead directly into our future. 
            In the upcoming Artemis and Mars eras, humanity will return to these worlds not as strangers, but as caretakers of our first extraterrestrial heritage sites.
          </p>
        </div>

        {/* Transition Button to Chapter VII */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToChapter(7)}
            className="inline-flex items-center space-x-3 px-6 py-4 rounded-xl bg-status-passive hover:bg-emerald-400 text-space-black font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] focus-visible:ring-2 focus-visible:ring-status-passive focus-visible:ring-offset-2 focus-visible:ring-offset-space-black"
            aria-label="Proceed to Chapter VII: The Legacy"
          >
            <span>PROCEED TO CHAPTER VII: THE LEGACY</span>
            <span className="text-lg font-bold" aria-hidden="true">→</span>
          </button>

          <span className="text-xs font-mono text-zinc-500">
            NEXT: SPACE ARCHAEOLOGY, PLANETARY PROTECTION & ARTEMIS
          </span>
        </div>
      </div>
    </section>
  );
};
