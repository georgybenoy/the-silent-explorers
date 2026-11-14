import type { Destination } from '../types/artifact';

/**
 * Normalizes a destination string for safe, case-insensitive and whitespace-trimmed comparisons.
 */
export const normalizeDestination = (dest: string | null | undefined): string => {
  return (dest || '').trim().toLowerCase();
};

/**
 * Checks whether an artifact's destination matches the selected filter.
 * When filter is 'All', always returns true.
 */
export const matchesDestination = (
  artifactDestination: string | null | undefined,
  filter: Destination | 'All'
): boolean => {
  const normFilter = normalizeDestination(filter);
  if (normFilter === 'all' || !normFilter) return true;
  return normalizeDestination(artifactDestination) === normFilter;
};

export const DESTINATION_LIST: (Destination | 'All')[] = ['All', 'Moon', 'Mars', 'Beyond Mars'];

export const DESTINATION_LABELS: Record<Destination | 'All', string> = {
  All: 'ALL DESTINATIONS',
  Moon: 'THE MOON',
  Mars: 'MARS',
  'Beyond Mars': 'BEYOND MARS',
};
