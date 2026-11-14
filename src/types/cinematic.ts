export interface NasaAttribution {
  credit: string;
  photoId: string;
  mission?: string;
  managingCenter?: string;
  date?: string;
  license: string;
  rightsNote?: string;
  catalogUrl?: string;
}

export interface TelemetryItem {
  label: string;
  value: string;
  unit?: string;
}

export interface CinematicSceneData {
  id: string;
  sceneIndex: number; // 1 to 7
  sceneTag: string; // e.g. "SCENE 01 // PROLOGUE"
  emotionalNote: string; // "Vastness", "Curiosity", etc.
  sceneTitle: string;
  sceneSubtitle?: string;
  primaryHeading: string;
  narrativeLines: string[];
  imageSrc?: string;
  secondaryImageSrc?: string;
  imageAlt?: string;
  secondaryImageAlt?: string;
  nasaAttribution?: NasaAttribution;
  secondaryAttribution?: NasaAttribution;
  telemetry?: TelemetryItem[];
}
