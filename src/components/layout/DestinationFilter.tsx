import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import type { Destination } from '../../types/artifact';
import artifactsData from '../../data/artifacts.json';
import type { Artifact } from '../../types/artifact';
import { DESTINATION_LIST, matchesDestination, normalizeDestination } from '../../utils/destination';

interface DestinationFilterProps {
  className?: string;
  showCounts?: boolean;
}

export const DestinationFilter: React.FC<DestinationFilterProps> = ({ 
  className = '', 
  showCounts = true 
}) => {
  const { activeDestination, setActiveDestination } = useNavigation();
  const artifacts: Artifact[] = artifactsData as Artifact[];

  const destinations = DESTINATION_LIST;

  const getCount = (dest: Destination | 'All') => {
    if (dest === 'All') return artifacts.length;
    return artifacts.filter(a => matchesDestination(a.destination, dest)).length;
  };

  return (
    <div 
      role="tablist" 
      aria-label="Destination theaters filter"
      className={`inline-flex items-center p-1 rounded-md bg-space-card/80 border border-white/10 text-xs font-mono backdrop-blur-sm ${className}`}
    >
      {destinations.map((dest) => {
        const isSelected = normalizeDestination(activeDestination) === normalizeDestination(dest);
        const count = getCount(dest);

        return (
          <button
            key={dest}
            role="tab"
            aria-selected={isSelected}
            onClick={() => setActiveDestination(dest)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded transition-all duration-200 focus-visible:ring-1 focus-visible:ring-stellar-gold ${
              isSelected
                ? 'bg-stellar-gold text-space-black font-bold shadow-[0_0_10px_rgba(232,154,60,0.3)]'
                : 'text-stellar-gray hover:text-stellar-white hover:bg-white/5'
            }`}
          >
            <span>{dest === 'All' ? 'ALL' : dest.toUpperCase()}</span>
            {showCounts && (
              <span 
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-space-black/30 text-space-black' : 'bg-white/5 text-stellar-muted'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
