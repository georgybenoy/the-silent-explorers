export type Destination = 'Moon' | 'Mars' | 'Beyond Mars';

export type OperationalStatus = 
  | 'decommissioned'        // Hardware left on surface, powered down
  | 'passive_operational'   // No electrical power, but passively functional (e.g. laser retroreflectors)
  | 'silent_orbit'          // In stable, permanent gravitational parking orbit
  | 'mission_concluded'     // Formally concluded by NASA, resting on surface
  | 'lost_contact';         // Communications severed, location established

export type LocationType = 
  | 'final_resting_location' // Rover or spacecraft final ground position
  | 'experiment_station'     // Deployed science package (e.g. ALSEP)
  | 'surface_landing_site'   // Touchdown location (e.g. NEAR Shoemaker on Eros)
  | 'orbital_track';         // Gravitational orbital trajectory (e.g. Dawn at Ceres)

export interface PlanetaryCoordinates {
  latitude: number | null;   // Degrees (-90 to +90) or null for orbital craft
  longitude: number | null;  // Degrees (-180 to +180 or 0 to 360) or null for orbital craft
  semanticLabel: string;     // Exact object/site described: "VIP Camera Parking Site", "ALSEP Central Station Site"
  landingSiteName: string;   // Geographic region: "Taurus-Littrow Valley", "Hadley Rille"
  coordinateString: string;  // Formatted string: "20.1896° N, 30.7769° E" (never negative with S/W)
  bodyRadiusKm: number;      // Radius of parent celestial body for 3D sphere mapping
  derivationSource?: string; // Reference for coordinate measurement (e.g. "LROC NAC / Wagner et al. 2017")
}

export interface PhysicalSpecs {
  massKg: number;
  dimensionsMeters: string;
  powerSource: 'Solar Arrays' | 'RTG (Nuclear)' | 'Primary Batteries' | 'Ion Propulsion Hybrid';
  designedLifespanDays: number;
  actualLifespanDays: number;
  distanceTraveledKm?: number;
}

export interface ScientificInstrument {
  name: string;
  acronym: string;
  purpose: string;
  keyFinding: string;
}

export interface HistoricalRecord {
  timestampUtc: string;
  sol?: number;
  sourceType: 'telemetry_log' | 'air_to_ground' | 'ground_command' | 'mission_report';
  content: string;
  speakerOrTransmitter: string;
  citationUrl: string;
  historicalContext: string;
}

export interface SourceReference {
  title: string;
  url: string;
  sourceRepository: 'NSSDCA Master Catalog' | 'JPL Mission Documentation' | 'Apollo Lunar Surface Journal' | 'NASA Planetary Data System' | 'NASA History Division' | 'Science Journal';
  supportedClaims: string[];
}

export interface AssociatedEquipment {
  equipmentId: string;
  name: string;
  equipmentType: 'passive_experiment' | 'rover' | 'subsystem' | 'lander_stage';
  operationalStatus: OperationalStatus;
  locationType: LocationType;
  coordinates: PlanetaryCoordinates;
  description: string;
  operationalNotes: string;
  sources: SourceReference[];
}

export interface ArtifactMedia {
  model3dPath?: string;            // Path to compressed .glb file
  fallbackImagePath: string;       // High-res NASA archival photo (WebP)
  thumbnailPath: string;
  diagramPath?: string;
  photoCredits: string;
}

export interface Artifact {
  artifactId: string;              // Unique equipment identifier, e.g. "apollo-17-lrv"
  name: string;                    // Common display name: "Apollo 17 Lunar Roving Vehicle"
  missionId: string;               // Mission key, e.g. "apollo-17"
  missionName: string;             // Formal mission name: "Apollo 17"
  
  // NSSDCA Catalog Differentiation (Mission vs Equipment)
  missionNssdcaId: string;         // Parent mission COSPAR ID (e.g. "1972-096A")
  equipmentNssdcaId: string | null;// Specific equipment ID if one exists, or null
  nssdcaClarification: string;     // Explicit explanation of NSSDCA record hierarchy
  
  destination: Destination;
  targetBody: 'Moon' | 'Mars' | 'Ceres' | '433 Eros' | 'Vesta';
  
  // Status and Ending
  operationalStatus: OperationalStatus;
  statusLabel: string;             // User-facing label: "Decommissioned on Lunar Surface"
  missionEndReason: string;        // Specific verified cause of mission conclusion
  
  // Chronology
  launchDate: string;              // ISO format: "1972-12-07"
  landingDate?: string;            // ISO format: "1972-12-11"
  endOfMissionDate: string;        // ISO format: "1972-12-14"
  lastContactDate: string | null;  // ISO format or null: "1972-12-14"

  // Geography & Specs
  locationType: LocationType;
  coordinates: PlanetaryCoordinates;
  specs: PhysicalSpecs;
  instruments: ScientificInstrument[];
  
  // Associated / Linked equipment (e.g. Apollo 15 LRRR separate from ALSEP)
  associatedEquipment?: AssociatedEquipment[];
  
  // Narrative & Storytelling
  summary: string;                 // Concise verified summary
  documentaryNarrative: string;    // Rich historical narrative (creative prose, distinct from logs)
  scientificLegacy: string;        // Permanent scientific contributions
  finalMomentsStory: string;       // Account of how the mission concluded
  currentCondition: string;        // Verified physical state today
  
  // Archival Records & Citations
  historicalTransmissions: HistoricalRecord[];
  sources: SourceReference[];
  media: ArtifactMedia;
}
