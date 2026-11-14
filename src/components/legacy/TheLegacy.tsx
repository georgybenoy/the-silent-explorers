import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';

export const TheLegacy: React.FC = () => {
  const { scrollToChapter, setIsCitationsOpen, isReducedMotion } = useNavigation();
  const [activeTab, setActiveTab] = useState<'All' | 'Moon' | 'Mars' | 'Beyond Mars'>('All');
  const [activeStatusCategory, setActiveStatusCategory] = useState<'all' | 'active' | 'development' | 'planned' | 'proposed'>('all');

  return (
    <section
      id="chapter-7"
      className="scroll-mt-24 rounded-2xl bg-space-card/70 border border-white/10 p-6 sm:p-10 md:p-14 space-y-16 sm:space-y-24 relative overflow-hidden"
      aria-label="Chapter VII: The Legacy — The Future of Space Exploration"
    >
      {/* Background Cosmic Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-stellar-gold/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-stellar-cyan/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-6 right-6 text-[10px] font-mono text-zinc-600 hidden sm:block tracking-widest">
        ARCHIVE REF: NASA-NSSDCA-LEGACY-07
      </div>

      {/* =========================================================================
          SECTION 1: THE JOURNEY CONTINUES
          Cinematic opening transitioning from Chapter VI into the broader Solar System.
         ========================================================================= */}
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-stellar-gold animate-pulse" />
          <span className="uppercase tracking-widest font-bold">
            CHAPTER VII // THE CONCLUDING CHAPTER
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stellar-white leading-tight">
            The Legacy
          </h2>
          <p className="text-xl sm:text-2xl font-display italic text-stellar-gold font-medium">
            "The explorers may be silent. Exploration is not."
          </p>
        </div>

        {/* Transition Hero Plate: The Expanding Horizon */}
        <div 
          className="rounded-xl border border-white/10 bg-black/60 p-5 sm:p-6 backdrop-blur-sm space-y-4"
          aria-label="Cosmic Progression Horizon"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-zinc-400 border-b border-white/10 pb-3">
            <span className="text-stellar-white uppercase font-semibold">
              HORIZON // INNER PLANETS → OUTER WORLDS & DEEP SPACE
            </span>
            <span className="text-stellar-gold">VECTOR: ACTIVE INTERPLANETARY TRANSIT</span>
          </div>

          {/* SVG Deep Space Horizon Line */}
          <div className="relative h-20 w-full flex items-center justify-center overflow-hidden">
            <svg 
              className="w-full h-full text-stellar-gold" 
              viewBox="0 0 1000 80" 
              fill="none" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Planetary Orbital Arcs */}
              <path
                d="M 0,70 Q 250,10 500,45 T 1000,20"
                stroke="rgba(232, 154, 60, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 0,55 C 300,55 450,25 700,35 C 850,42 950,15 1000,10"
                stroke="#E89A3C"
                strokeWidth="2"
              />
              {/* Planetary Waypoint Nodes */}
              <circle cx="200" cy="55" r="4" fill="#38BDF8" className={isReducedMotion ? '' : 'animate-pulse'} />
              <circle cx="450" cy="30" r="4" fill="#F59E0B" className={isReducedMotion ? '' : 'animate-pulse'} />
              <circle cx="700" cy="35" r="4" fill="#A855F7" className={isReducedMotion ? '' : 'animate-pulse'} />
              <circle cx="920" cy="18" r="4" fill="#10B981" className={isReducedMotion ? '' : 'animate-pulse'} />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
            <span>WAYPOINTS: MOON (1971) → MARS (1997) → ASTEROIDS (2001) → CERES (2015) → TITAN (2030s)</span>
            <span>HERITAGE: PERPETUAL KNOWLEDGE BASE</span>
          </div>
        </div>

        {/* Lead Narrative */}
        <div className="space-y-4 text-base sm:text-lg text-stellar-gray leading-relaxed">
          <p className="font-display text-xl sm:text-2xl text-stellar-white font-semibold">
            They were never the end of the story.
          </p>
          <p>
            The eight explorers chronicled in this archive conquered gravity, endured cosmic radiation, and transmitted billions of measurements across empty space before falling silent. 
            Yet their stillness is not a full stop. It is the architectural foundation upon which the next century of deep space exploration is built.
          </p>
          <p>
            When robotic or human voyagers depart Earth tomorrow, they navigate using coordinates mapped by these silent sentinels, land with systems refined from their trials, and carry scientific questions that could only be asked because these pioneers ventured first.
          </p>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: FROM THEIR FOOTPRINTS TO THE FUTURE
          Documentary timeline connecting past explorers to future exploration.
         ========================================================================= */}
      <div className="space-y-10 border-t border-white/10 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-stellar-cyan tracking-widest uppercase block mb-1">
              SECTION 2 // CONTINUOUS DISCOVERY
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-stellar-white">
              From Their Footprints to the Future
            </h3>
            <p className="text-sm text-stellar-gray mt-1">
              Tracing how early milestones created pathways for modern planetary science.
            </p>
          </div>

          {/* Destination Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 font-mono text-xs">
            {(['All', 'Moon', 'Mars', 'Beyond Mars'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === tab
                    ? 'bg-white/15 text-stellar-white font-bold'
                    : 'text-zinc-400 hover:text-stellar-white hover:bg-white/5'
                }`}
                aria-label={`Filter lineage by ${tab}`}
              >
                {tab === 'All' ? 'ALL TRACKS' : tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Lineage Tracks */}
        <div className="space-y-8">
          {/* Track 1: The Moon */}
          {(activeTab === 'All' || activeTab === 'Moon') && (
            <div className="rounded-xl border border-stellar-cyan/20 bg-space-card/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-stellar-cyan/10 border border-stellar-cyan/30 text-stellar-cyan text-xs font-mono font-bold uppercase tracking-wider">
                  THE MOON
                </span>
                <span className="text-xs font-mono text-zinc-400">// APOLLO → ARTEMIS ERA</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase block">1971–1972 // PAST MILESTONES</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Apollo Surface Science</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Apollo 15 ALSEP deployed the first long-lived lunar geophysical station; LRV-3 enabled approximately 35.89 km of total traverse across Taurus-Littrow.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-stellar-cyan uppercase block">ONGOING // CONTINUOUS BASES</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Lunar Laser Ranging & LROC</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Passive retroreflectors pinged continuously from Earth; Lunar Reconnaissance Orbiter photogrammetry maps Apollo landing sites with sub-meter precision.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-stellar-gold uppercase block">FUTURE // VERIFIABLE HORIZONS</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Artemis & Heritage Protection</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Commercial Lunar Payload Services (including the planned late 2027 delivery of VIPER on Blue Origin's Blue Moon MK1) and the Artemis program (with Artemis II crewed flyby, Artemis III 2027 LEO demonstration, and Artemis IV 2028 lunar landing), with historic site protection under the Artemis Accords.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Track 2: Mars */}
          {(activeTab === 'All' || activeTab === 'Mars') && (
            <div className="rounded-xl border border-stellar-amber/20 bg-space-card/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-stellar-amber/10 border border-stellar-amber/30 text-stellar-amber text-xs font-mono font-bold uppercase tracking-wider">
                  MARS
                </span>
                <span className="text-xs font-mono text-zinc-400">// PATHFINDER → SAMPLE CACHING</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase block">1997–2018 // FIRST WHEELS</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Sojourner, Spirit & Opportunity</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Validated rocker-bogie mobility and uncovered diagnostic minerals (hematite blueberries, jarosite, Home Plate silica) proving past water and volcanic interactions.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-stellar-amber uppercase block">ACTIVE SURFACE MISSIONS</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Curiosity & Perseverance</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Curiosity actively exploring Mount Sharp; Perseverance caching core samples in Jezero Crater; with Ingenuity having established the foundational aerodynamic baseline over 72 completed flights.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-stellar-gold uppercase block">PLANNED & CONCEPTUAL</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Sample Retrieval & Subsurface Drill</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    ESA Rosalind Franklin rover with 2-meter subsurface drill; NASA actively evaluating revised conceptual architectures to retrieve cached Jezero samples (with no return date promised).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Track 3: Beyond Mars */}
          {(activeTab === 'All' || activeTab === 'Beyond Mars') && (
            <div className="rounded-xl border border-purple-500/20 bg-space-card/80 p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-purple-400/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                  BEYOND MARS
                </span>
                <span className="text-xs font-mono text-zinc-400">// SMALL BODIES → ICY WORLDS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase block">1996–2018 // FIRST CONTACTS</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">NEAR Shoemaker & Dawn</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    NEAR proved small-body touchdowns on Eros; Dawn surveyed Vesta and revealed Ceres as an ocean-relic world before entering a stable planetary protection orbit.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-purple-400 uppercase block">ACTIVE CRUISES</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Europa Clipper, Lucy & Psyche</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    Europa Clipper en route to Jupiter (launched October 2024); Lucy en route to Jupiter Trojans; Psyche traversing to metal-rich asteroid 16 Psyche.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] text-stellar-gold uppercase block">UNDER DEVELOPMENT</span>
                  <h4 className="font-display text-sm font-bold text-stellar-white">Dragonfly Rotorcraft Lander</h4>
                  <p className="text-zinc-400 font-sans leading-relaxed">
                    NASA New Frontiers mission in integration and testing targeting NET July 2028 launch to explore prebiotic chemistry across Titan's organic sands upon arrival in the 2030s.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: WHAT THEY TAUGHT US
          Editorial presentation of 5 core lessons tied to the eight explorers.
         ========================================================================= */}
      <div className="space-y-10 border-t border-white/10 pt-12 sm:pt-16">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono text-status-passive tracking-widest uppercase block">
            SECTION 3 // HARD-WON PRINCIPLES
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            What They Taught Us
          </h3>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            Every mission pushed aerospace engineering into regimes that ground tests could never fully replicate. 
            These five foundational lessons now guide every spacecraft leaving Earth.
          </p>
        </div>

        {/* 5 Core Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Lesson 1 */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stellar-cyan uppercase tracking-wider font-bold block">
                LESSON 01 // VACUUM & THERMAL SURVIVAL
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Designing for Inaccessible Extreme Environments
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                Hardware must endure thermal swings of over 250°C and relentless space weathering without maintenance. 
                Apollo LRV's woven wire tires enabled approximately 35.89 km of total traverse over abrasive lunar dust, while ALSEP's SNAP-27 radioisotope thermoelectric generator provided continuous power through two-week lunar nights.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              EXPLORERS: Apollo 17 LRV & Apollo 15 ALSEP
            </div>
          </div>

          {/* Lesson 2 */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stellar-amber uppercase tracking-wider font-bold block">
                LESSON 02 // TIMED AUTONOMY
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Autonomous Decisions Across Signal Delays
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                When radio waves take 4 to 20 minutes to cross interplanetary space, joysticks are impossible. 
                Sojourner pioneered onboard optical hazard detection and dead-reckoning, demonstrating that planetary rovers must sense and navigate autonomously between Earth command uplink cycles.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              EXPLORERS: Sojourner (Mars Pathfinder)
            </div>
          </div>

          {/* Lesson 3 */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-status-passive uppercase tracking-wider font-bold block">
                LESSON 03 // MARGIN & LONGEVITY
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Extending Lifetimes Through Engineering Margins
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                While short-duration platforms fulfilled targeted mission timelines (such as the Apollo 17 LRV's three scheduled EVA traverses), long-duration robotic scouts demonstrated the power of conservative margins. 
                Opportunity operated for over 14 years past its 90-sol warranty; Dawn orbited two protoplanets before concluding operations when its hydrazine attitude-control propellant was exhausted (not from Ceres cold), remaining in a stable planetary protection orbit.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              EXPLORERS: Opportunity (MER-B) & Dawn
            </div>
          </div>

          {/* Lesson 4 */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stellar-gold uppercase tracking-wider font-bold block">
                LESSON 04 // OPPORTUNISTIC DISCOVERY
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Turning Anomalies into Scientific Breakthroughs
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                When Spirit’s right front wheel seized, driving backward dragged the dead wheel through the soil—churning up ~90% pure opaline silica that revealed ancient Martian hydrothermal activity. 
                When Ingenuity suffered rotor tip damage on Flight 72, post-flight engineering telemetry established crucial aerodynamic boundaries for future extraterrestrial rotorcraft.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              EXPLORERS: Spirit (MER-A) & Ingenuity
            </div>
          </div>

          {/* Lesson 5 */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3 flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold block">
                LESSON 05 // CURATED PRESERVATION
              </span>
              <h4 className="font-display text-lg font-bold text-stellar-white">
                Preserving Open Data for Future Decades
              </h4>
              <p className="text-sm text-stellar-gray leading-relaxed">
                NEAR's 433 Eros touchdown spectra and Apollo's seismic network telemetry were preserved in NASA's Planetary Data System. 
                Decades later, modern computational models continue to yield fresh peer-reviewed insights from archival records, proving that open planetary science multiplies the enduring value of every mission.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
              EXPLORERS: NEAR Shoemaker & Apollo 15 ALSEP
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: THE NEXT EXPLORERS
          Authoritatively sourced status matrix distinguishing active, developing,
          planned, and proposed conceptual missions. Current as of 14 November 2026.
         ========================================================================= */}
      <div className="space-y-10 border-t border-white/10 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="max-w-3xl space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-stellar-gold tracking-widest uppercase block">
                SECTION 4 // VERIFIABLE HORIZONS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stellar-gold/15 text-stellar-gold border border-stellar-gold/30">
                STATUS LAST REVIEWED: 14 NOVEMBER 2026
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-stellar-white">
              The Next Explorers
            </h3>
            <p className="text-sm text-stellar-gray">
              An authoritative overview of active spacecraft, missions in development, planned flights, and proposed concepts.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 font-mono text-xs">
            {(['all', 'active', 'development', 'planned', 'proposed'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveStatusCategory(cat)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeStatusCategory === cat
                    ? 'bg-white/15 text-stellar-white font-bold'
                    : 'text-zinc-400 hover:text-stellar-white hover:bg-white/5'
                }`}
                aria-label={`Filter missions by ${cat}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Agency Review & Source Transparency Notice */}
        <div className="rounded-xl border border-white/10 bg-black/60 p-4 sm:p-5 text-xs font-mono text-zinc-400 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stellar-gold font-bold">
            <span>OFFICIAL MISSION MANIFEST & BASELINE DISCLOSURE</span>
            <span>REVIEW DATE: NOVEMBER 14, 2026</span>
          </div>
          <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
            All forward-looking launch windows, flight manifests, and mission schedules represent NASA and ESA agency planning baselines as of November 2026. 
            Flight schedules are not guaranteed and remain subject to annual congressional budget authorizations, hardware integration milestones, and launch vehicle readiness.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] text-stellar-cyan">
            <a 
              href="https://www.nasa.gov/artemis" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-white inline-flex items-center space-x-1"
            >
              <span>NASA Artemis Program</span>
              <span aria-hidden="true">↗</span>
            </a>
            <span>•</span>
            <a 
              href="https://www.nasa.gov/dragonfly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-white inline-flex items-center space-x-1"
            >
              <span>NASA Dragonfly (Titan)</span>
              <span aria-hidden="true">↗</span>
            </a>
            <span>•</span>
            <a 
              href="https://science.nasa.gov/mission/viper/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-white inline-flex items-center space-x-1"
            >
              <span>NASA VIPER (CLPS)</span>
              <span aria-hidden="true">↗</span>
            </a>
            <span>•</span>
            <a 
              href="https://mars.nasa.gov/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-white inline-flex items-center space-x-1"
            >
              <span>NASA Mars Exploration</span>
              <span aria-hidden="true">↗</span>
            </a>
            <span>•</span>
            <a 
              href="https://science.nasa.gov/planetary-science/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-white inline-flex items-center space-x-1"
            >
              <span>NASA Planetary Science Division</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Mission Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Missions */}
          {(activeStatusCategory === 'all' || activeStatusCategory === 'active') && (
            <div className="rounded-xl border border-status-passive/30 bg-black/40 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-status-passive/10 text-status-passive border border-status-passive/30">
                    ACTIVE MISSIONS
                  </span>
                  <span className="w-2 h-2 rounded-full bg-status-passive animate-pulse" />
                </div>
                <h4 className="font-display text-base font-bold text-stellar-white">Operational Beyond Earth</h4>
                <ul className="space-y-2 text-xs font-mono text-zinc-300">
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Perseverance & Curiosity</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Active Mars surface rovers. Perseverance is coring and caching samples in Jezero Crater; Curiosity is ascending Mount Sharp in Gale Crater.
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Europa Clipper</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Launched October 14, 2024. In active interplanetary cruise en route to Jupiter to assess the habitability of Europa's subsurface ocean (arriving 2030).
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Lucy & Psyche</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Active deep-space cruises. Lucy (launched Oct 2021) en route to Jupiter Trojans; Psyche (launched Oct 2023) en route to metal-rich asteroid 16 Psyche (arriving 2029).
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-status-passive">
                STATUS: TELEMETRY ACTIVE & MONITORED
              </div>
            </div>
          )}

          {/* Missions in Development */}
          {(activeStatusCategory === 'all' || activeStatusCategory === 'development') && (
            <div className="rounded-xl border border-stellar-cyan/30 bg-black/40 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-stellar-cyan/10 text-stellar-cyan border border-stellar-cyan/30">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-cyan" />
                </div>
                <h4 className="font-display text-base font-bold text-stellar-white">Build & System Testing</h4>
                <ul className="space-y-2 text-xs font-mono text-zinc-300">
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Artemis II, III & IV</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Artemis II is a planned crewed lunar flyby; Artemis III is a planned 2027 low-Earth-orbit demonstration mission; Artemis IV is the planned 2028 crewed lunar landing mission. (Artemis III is an orbital demonstration, not the lunar landing).
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Dragonfly (NET July 2028)</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Future NASA New Frontiers mission. Nuclear-powered rotorcraft lander in hardware integration and testing at JHU-APL, targeting Titan's prebiotic chemistry upon arrival in the mid-2030s.
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">VIPER Lunar Rover</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Rover flight unit built and in final testing. Following discontinuation of the original 2024 delivery arrangement, NASA planned lunar delivery in late 2027 via Blue Origin's Blue Moon MK1 under CLPS.
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Nancy Grace Roman Telescope</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      NASA wide-field infrared astrophysics observatory undergoing integration, targeting launch by May 2027.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-stellar-cyan">
                STATUS: GROUND INTEGRATION & TESTING
              </div>
            </div>
          )}

          {/* Planned Missions */}
          {(activeStatusCategory === 'all' || activeStatusCategory === 'planned') && (
            <div className="rounded-xl border border-stellar-amber/30 bg-black/40 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-stellar-amber/10 text-stellar-amber border border-stellar-amber/30">
                    PLANNED MISSIONS
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stellar-amber" />
                </div>
                <h4 className="font-display text-base font-bold text-stellar-white">Manifested Flights</h4>
                <ul className="space-y-2 text-xs font-mono text-zinc-300">
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">NASA CLPS Deliveries</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Commercial lunar payload service landers delivering scientific experiments to diverse lunar regions, including polar volatile sites.
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">ESA Rosalind Franklin</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      ExoMars rover equipped with a 2-meter subsurface drill to collect pristine subsurface Martian samples shielded from surface radiation.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-stellar-amber">
                STATUS: FLIGHT MANIFESTS APPROVED
              </div>
            </div>
          )}

          {/* Proposed Concepts */}
          {(activeStatusCategory === 'all' || activeStatusCategory === 'proposed') && (
            <div className="rounded-xl border border-zinc-700 bg-black/40 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
                    PROPOSED CONCEPTS
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                </div>
                <h4 className="font-display text-base font-bold text-stellar-white">Architecture Studies</h4>
                <ul className="space-y-2 text-xs font-mono text-zinc-300">
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Mars Sample Return (MSR)</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Proposed architecture under conceptual re-evaluation. Distinguishable from Perseverance's active sample collection, NASA is evaluating revised concepts to return the cached samples. No return date is promised.
                    </span>
                  </li>
                  <li className="p-2.5 rounded bg-white/5 space-y-1">
                    <strong className="text-stellar-white block font-display text-xs">Decadal Interstellar Concepts</strong>
                    <span className="text-zinc-400 font-sans text-[11px] block leading-relaxed">
                      Conceptual architecture studies evaluating future probes beyond the heliopause and prioritized outer planet missions (Uranus Orbiter & Probe).
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                STATUS: CONCEPTUAL ARCHITECTURE EVALUATION
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECTION 5: A MESSAGE TO THE VISITOR
          Philosophical and human reflection on space heritage and future memory.
         ========================================================================= */}
      <div className="space-y-8 border-t border-white/10 pt-12 sm:pt-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-stellar-cyan tracking-widest uppercase block">
            SECTION 5 // PHILOSOPHICAL REFLECTION
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            "One day, someone may find what we leave behind."
          </h3>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            When future explorers arrive at Taurus-Littrow, Perseverance Valley, or Valinor Hills, they will step into the quiet presence of our pioneering scouts. 
            They will see wheel tracks preserved in the regolith, camera lenses turned toward distant hills, and solar arrays dusted with the soil of another world.
          </p>
          <p className="text-base sm:text-lg text-stellar-gray leading-relaxed">
            These machines are not debris. They are the initial markers of human presence in the cosmos—tangible proof that on a small blue planet, a curious species built machines to cross the void, touch alien dust, and learn their place among the stars.
          </p>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6: FINAL EPILOGUE
          Memorable cinematic conclusion with core project tagline, navigation
          reset, citations drawer trigger, and documentary close.
         ========================================================================= */}
      <div className="space-y-12 border-t border-white/10 pt-16 sm:pt-20 text-center max-w-4xl mx-auto">
        {/* Core Tagline Progression */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stellar-gold/10 border border-stellar-gold/30 text-stellar-gold font-mono text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse" />
            <span>EPILOGUE // THE SILENT EXPLORERS</span>
          </div>

          <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-stellar-white leading-relaxed tracking-tight space-y-2">
            <p className="text-stellar-gray">They went beyond.</p>
            <p className="text-stellar-white">They discovered.</p>
            <p className="text-stellar-gold">They remain.</p>
          </div>

          <p className="text-base sm:text-xl font-display italic text-stellar-gray max-w-2xl mx-auto">
            "And somewhere, another explorer is preparing to leave Earth."
          </p>
        </div>

        {/* Closing Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {/* Return to Beginning */}
          <button
            onClick={() => scrollToChapter(1)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-space-card hover:bg-space-card/80 border border-white/20 text-stellar-white font-mono text-xs font-semibold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-stellar-gold"
            aria-label="Return to Chapter 1: The Silence"
          >
            <span aria-hidden="true">↺</span>
            <span>RETURN TO THE BEGINNING</span>
          </button>

          {/* Jump to Museum */}
          <button
            onClick={() => scrollToChapter(4)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-space-card hover:bg-space-card/80 border border-white/20 text-stellar-cyan font-mono text-xs font-semibold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-stellar-cyan"
            aria-label="Jump to Chapter 4: Meet the Explorers Museum"
          >
            <span>EXPLORE ARTIFACT MUSEUM</span>
            <span aria-hidden="true">🏛</span>
          </button>

          {/* Open Citations Drawer */}
          <button
            onClick={() => setIsCitationsOpen(true)}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-stellar-gold/15 hover:bg-stellar-gold/25 border border-stellar-gold/40 text-stellar-gold font-mono text-xs font-semibold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-stellar-gold"
            aria-label="Open NASA scientific citations and primary sources drawer"
          >
            <span>VIEW CITATIONS & SOURCES</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        {/* Official Project Attribution Footer Stamp */}
        <div className="pt-8 border-t border-white/5 font-mono text-xs text-zinc-500 space-y-1">
          <div>DOCUMENTARY CONCLUDED // 2026 NASA SPACE APPS CHALLENGE</div>
          <div className="text-[11px] text-zinc-600">
            CHALLENGE: "ABANDONED BUT NOT FORGOTTEN: STORYTELLING ABOUT NASA'S DISCARDED EQUIPMENT"
          </div>
        </div>
      </div>
    </section>
  );
};
