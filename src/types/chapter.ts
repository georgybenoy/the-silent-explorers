export interface Chapter {
  id: number;                      // 1 through 7
  slug: string;                    // e.g. "the-silence"
  romanNumeral: string;            // "I", "II", ..., "VII"
  title: string;                   // "The Silence"
  subtitle: string;                // "Across alien regolith and frozen dust, humanity's monuments remain."
  focusTheme: string;
  targetDestination?: 'Moon' | 'Mars' | 'Asteroid Belt' | 'Ceres' | 'Solar System';
  narrativeLead: string;           // Atmospheric opening paragraph
  narrativeBody: string[];         // Detailed documentary sections
  keyMetrics?: { label: string; value: string; unit?: string }[];
  accentColor?: string;
}
