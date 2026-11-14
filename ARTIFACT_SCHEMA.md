# The Silent Explorers: Artifact Data Schema & Model Specification (Audited)

This document defines the audited TypeScript interface and seed dataset for the eight initial artifacts in **The Silent Explorers**, incorporating exact semantic coordinates, NSSDCA mission vs. equipment hierarchy, and explicit citations.

---

## 1. Audited TypeScript Interface Definition (`src/types/artifact.ts`)

```typescript
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
  latitude: number;          // Degrees (-90 to +90)
  longitude: number;         // Degrees (-180 to +180 or 0 to 360)
  semanticLabel: string;     // Exact object/site described: "VIP Camera Parking Site", "ALSEP Central Station Site"
  landingSiteName: string;   // Geographic region: "Taurus-Littrow Valley", "Hadley Rille"
  coordinateString: string;  // Formatted string: "20.1896° N, 30.7769° E"
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
```

---

## 2. Summary of Audited Corrections

1. **Apollo 17 LRV**:
   * Removed conflation with `1972-096C` (Ascent Stage) and `1972-096D` (Descent Stage). Documented parent mission `1972-096A` and set `equipmentNssdcaId: null` with explicit note that LRV-3 was surface cargo.
   * Updated coordinates from the LM landing site to the actual LRV VIP parking site: $20.1896^\circ\text{ N}, 30.7769^\circ\text{ E}$ (158 m east-northeast of Challenger).
2. **Apollo 15 ALSEP & Laser Retroreflector**:
   * Corrected ALSEP central-station coordinates to $26.13407^\circ\text{ N}, 3.62981^\circ\text{ E}$ based on ALSJ and LROC photogrammetry, clearly differentiated from LM *Falcon* ($26.13222^\circ\text{ N}, 3.63386^\circ\text{ E}$).
   * Segregated the **Apollo 15 Laser Ranging Retroreflector (LRRR)** into an `associatedEquipment` entity with its own coordinates ($26.13341^\circ\text{ N}, 3.62850^\circ\text{ E}$), highlighting that it was a separate experiment requiring zero electricity that remains passive operational equipment pinged by Earth lasers today, while ALSEP was powered down on September 30, 1977.
3. **Dawn at Ceres**:
   * Corrected planetary protection statement: NASA formal requirement mandated no impact for at least 20 years; simulations demonstrated with >99% confidence that the orbit will remain stable and avoid impact for at least 50 years.
4. **NEAR Shoemaker**:
   * Clearly distinguished the approximately two weeks of total post-landing surface operations from the specific seven days of surface gamma-ray measurements reported by NSSDCA.
5. **Ingenuity (Mars Helicopter)**:
   * Removed unverified claim of an ongoing ground environmental testbed. Retained verified historical facts: 72 flights, Flight 72 hard landing on sand ripple on January 18, 2024 resulting in rotor blade tip fractures, and mission conclusion announcement on January 25, 2024.
