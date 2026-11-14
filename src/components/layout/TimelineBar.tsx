import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import type { Destination } from '../../types/artifact';

interface TimelineMilestone {
  year: number;
  label: string;
  artifactId: string;
  missionName: string;
  destination: Destination;
  eventDescription: string;
  chapterTarget: number;
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: 1971,
    label: 'Apollo 15 ALSEP & LRRR',
    artifactId: 'apollo-15-alsep',
    missionName: 'Apollo 15',
    destination: 'Moon',
    eventDescription: 'Deployed nuclear science station and 300-prism laser retroreflector at Hadley Rille.',
    chapterTarget: 4,
  },
  {
    year: 1972,
    label: 'Apollo 17 LRV VIP Site',
    artifactId: 'apollo-17-lrv',
    missionName: 'Apollo 17',
    destination: 'Moon',
    eventDescription: 'Parked 158m from Challenger; camera broadcasted ascent stage liftoff to Earth.',
    chapterTarget: 4,
  },
  {
    year: 1977,
    label: 'ALSEP Network Command Off',
    artifactId: 'apollo-15-alsep',
    missionName: 'Apollo ALSEP',
    destination: 'Moon',
    eventDescription: 'NASA formally commanded off all lunar ALSEP stations after 6+ years of telemetry.',
    chapterTarget: 5,
  },
  {
    year: 1997,
    label: 'Sojourner Mars Touchdown',
    artifactId: 'sojourner-pathfinder',
    missionName: 'Mars Pathfinder',
    destination: 'Mars',
    eventDescription: 'Humanity’s first wheeled rover explored the floodplains of Ares Vallis.',
    chapterTarget: 4,
  },
  {
    year: 2001,
    label: 'NEAR Shoemaker Landed on Eros',
    artifactId: 'near-shoemaker',
    missionName: 'NEAR Discovery',
    destination: 'Beyond Mars',
    eventDescription: 'First soft landing on an asteroid; surface gamma-ray measurements for two weeks.',
    chapterTarget: 4,
  },
  {
    year: 2004,
    label: 'Spirit & Opportunity Landings',
    artifactId: 'opportunity-mer-b',
    missionName: 'Mars Exploration Rovers',
    destination: 'Mars',
    eventDescription: 'Twin rovers touched down on opposite sides of Mars, beginning 15 years of exploration.',
    chapterTarget: 4,
  },
  {
    year: 2010,
    label: 'Spirit Final Sol 2210',
    artifactId: 'spirit-mer-a',
    missionName: 'MER-A Spirit',
    destination: 'Mars',
    eventDescription: 'Trapped in the sands of Troy, Spirit transmitted final engineering telemetry on March 22.',
    chapterTarget: 5,
  },
  {
    year: 2018,
    label: 'Opportunity & Dawn End of Mission',
    artifactId: 'opportunity-mer-b',
    missionName: 'Opportunity / Dawn',
    destination: 'Mars',
    eventDescription: 'Global dust storm choked Opportunity; Dawn depleted hydrazine and entered Ceres parking orbit.',
    chapterTarget: 5,
  },
  {
    year: 2021,
    label: 'Ingenuity Historic First Flight',
    artifactId: 'ingenuity-mars2020',
    missionName: 'Mars 2020',
    destination: 'Mars',
    eventDescription: 'First powered, controlled aerodynamic flight on another world on April 19, 2021.',
    chapterTarget: 4,
  },
  {
    year: 2024,
    label: 'Ingenuity Concludes Flight 72',
    artifactId: 'ingenuity-mars2020',
    missionName: 'Ingenuity',
    destination: 'Mars',
    eventDescription: 'Completed 72 flights; sustained rotor blade damage upon hard landing at Valinor Hills.',
    chapterTarget: 5,
  },
];

export const TimelineBar: React.FC = () => {
  const { 
    selectedArtifactId, 
    selectArtifact, 
    setActiveDestination, 
    scrollToChapter 
  } = useNavigation();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeHoverMilestone, setActiveHoverMilestone] = useState<TimelineMilestone | null>(null);

  const handleMilestoneClick = (milestone: TimelineMilestone) => {
    setActiveDestination(milestone.destination);
    selectArtifact(milestone.artifactId);
    scrollToChapter(milestone.chapterTarget);
  };

  return (
    <aside 
      aria-label="Chronological Mission Timeline"
      className="fixed bottom-0 left-0 right-0 z-40 bg-space-black/95 backdrop-blur-md border-t border-white/10 text-xs font-mono select-none"
    >
      {/* Header Bar with Toggle */}
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3 text-stellar-muted">
          <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse" />
          <span className="font-bold text-stellar-white tracking-widest uppercase">
            CHRONOLOGY OF SILENCE // 1971 — 2024+
          </span>
          <span className="hidden sm:inline-block text-[11px] text-zinc-500">
            Click milestone to jump to era & artifact
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zinc-400 hover:text-stellar-white px-2 py-0.5 rounded border border-white/5 hover:border-white/20 transition-colors"
          aria-expanded={isExpanded}
          aria-controls="timeline-milestones-track"
        >
          {isExpanded ? 'COLLAPSE [−]' : 'EXPAND TIMELINE [+]'}
        </button>
      </div>

      {/* Expanded Timeline Track */}
      {isExpanded && (
        <div 
          id="timeline-milestones-track"
          className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto"
        >
          {/* Active Hover / Focus Detail Banner */}
          {activeHoverMilestone && (
            <div className="mb-3 px-3 py-1.5 rounded bg-space-card/80 border border-stellar-gold/30 flex items-center justify-between text-xs text-stellar-white animate-fadeIn">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-stellar-gold font-mono">{activeHoverMilestone.year}</span>
                <span className="text-zinc-500">//</span>
                <span className="font-semibold text-stellar-white">{activeHoverMilestone.label}</span>
                <span className="text-zinc-500">//</span>
                <span className="text-zinc-400 text-[11px]">{activeHoverMilestone.eventDescription}</span>
              </div>
              <span className="text-[10px] text-stellar-gold uppercase tracking-wider shrink-0 font-bold ml-2">
                Click to inspect
              </span>
            </div>
          )}

          {/* Timeline Bar Track */}
          <div className="relative flex items-center justify-between min-w-[700px] py-3">
            {/* Horizontal baseline rule */}
            <div className="absolute left-0 right-0 h-0.5 bg-white/10 -z-0" />

            {MILESTONES.map((m, index) => {
              const isSelected = selectedArtifactId === m.artifactId;

              return (
                <button
                  key={`${m.year}-${index}`}
                  onClick={() => handleMilestoneClick(m)}
                  onMouseEnter={() => setActiveHoverMilestone(m)}
                  onMouseLeave={() => setActiveHoverMilestone(null)}
                  onFocus={() => setActiveHoverMilestone(m)}
                  onBlur={() => setActiveHoverMilestone(null)}
                  className={`group relative z-10 flex flex-col items-center focus-visible:ring-1 focus-visible:ring-stellar-gold rounded px-1.5 py-1 transition-transform ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                  aria-label={`${m.year}: ${m.label}`}
                >
                  {/* Year Label */}
                  <span className={`text-[11px] font-mono mb-1.5 transition-colors ${
                    isSelected ? 'text-stellar-gold font-bold' : 'text-zinc-400 group-hover:text-stellar-white'
                  }`}>
                    {m.year}
                  </span>

                  {/* Node Pip */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      isSelected
                        ? 'bg-stellar-gold border-stellar-white shadow-[0_0_10px_rgba(232,154,60,0.8)]'
                        : 'bg-space-black border-white/30 group-hover:border-stellar-gold group-hover:bg-stellar-gold/20'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-space-black" />}
                  </div>

                  {/* Mission Short Tag */}
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 mt-1 max-w-[70px] truncate text-center">
                    {m.missionName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
