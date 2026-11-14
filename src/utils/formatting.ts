/**
 * Format geographical/planetary coordinates into an astronomical string.
 * Strictly avoids combining negative signs with S or W hemisphere labels.
 */
export function formatCoordinates(
  lat: number | null | undefined,
  lon: number | null | undefined
): string {
  if (lat === null || lat === undefined || lon === null || lon === undefined) {
    return 'Orbital Trajectory (No Surface Coordinates)';
  }

  const latMagnitude = Math.abs(lat).toFixed(4);
  const latDir = lat >= 0 ? 'N' : 'S';

  const lonMagnitude = Math.abs(lon).toFixed(4);
  const lonDir = lon >= 0 ? 'E' : 'W';

  return `${latMagnitude}° ${latDir}, ${lonMagnitude}° ${lonDir}`;
}

/**
 * Format ISO dates into human-readable archival format.
 */
export function formatDate(isoDateString?: string | null): string {
  if (!isoDateString) return 'Active / Undetermined';
  try {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return isoDateString;
  }
}
