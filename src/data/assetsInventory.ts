/**
 * 3D Asset Inventory & Authenticity Registry
 * The Silent Explorers — 2026 NASA Space Apps Challenge
 */

export interface AssetRecord {
  id: string;
  name: string;
  targetBody: 'Earth' | 'Moon' | 'Mars' | 'Ceres' | 'Eros' | 'Deep Space';
  authenticityStatus: 'Authentic NASA Model' | 'Architectural 3D Reconstruction' | 'Procedural Scientific Visualization';
  source: string;
  sourceUrl: string;
  license: string;
  attribution: string;
  geometryType: 'Procedural Shader Mesh' | 'Procedural CAD Composite' | 'GLTF/GLB Model';
  fallbackImagePath: string;
  keyAnnotations: {
    id: string;
    label: string;
    description: string;
    position: [number, number, number];
  }[];
}

export const ASSET_INVENTORY: Record<string, AssetRecord> = {
  'earth-orbital': {
    id: 'earth-orbital',
    name: 'Earth Atmospheric Sphere & Cloud System',
    targetBody: 'Earth',
    authenticityStatus: 'Procedural Scientific Visualization',
    source: 'NASA Visible Earth / Blue Marble (AS17-148-22727)',
    sourceUrl: 'https://visibleearth.nasa.gov/',
    license: 'Public Domain (NASA)',
    attribution: 'NASA Visible Earth / Apollo 17 Crew',
    geometryType: 'Procedural Shader Mesh',
    fallbackImagePath: '/images/chapter1/blue_marble.jpg',
    keyAnnotations: [
      {
        id: 'atmosphere',
        label: 'Ozone & Nitrogen Rayleigh Rim',
        description: 'Atmospheric scale height ~8.5 km illuminated by low-angle solar incidence.',
        position: [0, 1.05, 0],
      },
    ],
  },

  'apollo-17-lrv': {
    id: 'apollo-17-lrv',
    name: 'Apollo 17 Lunar Roving Vehicle (LRV-3)',
    targetBody: 'Moon',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA 3D Resources / Marshall Space Flight Center & ALSJ',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/detail/lunar-roving-vehicle',
    license: 'Public Domain (NASA)',
    attribution: 'NASA MSFC / Apollo Lunar Surface Journal (ALSJ)',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/apollo-17-lrv.jpg',
    keyAnnotations: [
      {
        id: 'hga-antenna',
        label: 'High-Gain Dish Antenna',
        description: 'S-band dish steered manually to broadcast color television and telemetry directly to Earth.',
        position: [0.3, 0.7, 0.4],
      },
      {
        id: 'mesh-wheels',
        label: 'Zinc-Coated Steel Wire Mesh Wheels',
        description: 'Chevron-pattern titanium treads designed by Boeing/Delco to traverse lunar basalt regolith.',
        position: [-0.65, -0.3, 0.6],
      },
      {
        id: 'gcta-camera',
        label: 'Ground-Controlled Television Assembly (GCTA)',
        description: 'RCA camera commanded from Mission Control in Houston; televised Challenger lunar liftoff.',
        position: [0.6, 0.4, -0.2],
      },
      {
        id: 'crew-seats',
        label: 'Tubular Aluminum Crew Seats',
        description: 'Accommodated astronauts Cernan and Schmitt with spacesuit life support PLSS backpacks.',
        position: [0, 0.2, -0.1],
      },
    ],
  },

  'apollo-15-alsep': {
    id: 'apollo-15-alsep',
    name: 'Apollo 15 ALSEP Central Station & SNAP-27 RTG',
    targetBody: 'Moon',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA NSSDCA Master Catalog / Bendix Aerospace Systems',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    license: 'Public Domain (NASA)',
    attribution: 'NASA NSSDCA / Apollo 15 Flight Journal',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/apollo-15-alsep.jpg',
    keyAnnotations: [
      {
        id: 'snap-27',
        label: 'SNAP-27 Radioisotope Thermoelectric Generator',
        description: 'Plutonium-238 fuel capsule producing 73.5 W continuous electrical power for 6+ years.',
        position: [0.8, -0.1, 0],
      },
      {
        id: 'central-box',
        label: 'Central Station Electronics Compartment',
        description: 'Thermal curtain housing transmitters, command receivers, and experiment data processors.',
        position: [0, 0.2, 0],
      },
      {
        id: 'helical-antenna',
        label: 'S-Band Helical Transmitter Antenna',
        description: 'Aimed at Earth to broadcast continuous moonquake and heat flow data until 1977 shutdown.',
        position: [0, 0.9, 0],
      },
      {
        id: 'lrrr-associated',
        label: 'Associated LRRR (Distinct Retroreflector)',
        description: '300-prism silica retroreflector deployed ~26m west; passively pinged by lasers today.',
        position: [-1.2, -0.2, 0.8],
      },
    ],
  },

  'sojourner-pathfinder': {
    id: 'sojourner-pathfinder',
    name: 'Mars Pathfinder Sojourner Microrover',
    targetBody: 'Mars',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA/JPL 3D Resources / NSSDCA',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/detail/pathfinder-sojourner',
    license: 'Public Domain (NASA/JPL)',
    attribution: 'NASA / Jet Propulsion Laboratory (JPL-Caltech)',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/sojourner.jpg',
    keyAnnotations: [
      {
        id: 'solar-panel',
        label: 'GaAs Solar Array Panel',
        description: '0.22 m² gallium arsenide panel providing ~16 W peak power at Mars solar noon.',
        position: [0, 0.22, 0],
      },
      {
        id: 'rocker-bogie',
        label: 'Rocker-Bogie 6-Wheel Suspension',
        description: 'Articulated titanium chassis enabling 11.5 kg rover to climb rocks larger than wheel diameter.',
        position: [-0.35, -0.15, 0.25],
      },
      {
        id: 'apxs-sensor',
        label: 'Alpha Particle X-Ray Spectrometer (APXS)',
        description: 'Deployed against rocks "Barnacle Bill" and "Yogi" to reveal andesitic silica compositions.',
        position: [0, -0.05, -0.32],
      },
      {
        id: 'stereo-cameras',
        label: 'Stereo Forward Navigation Cameras',
        description: 'B&W pinhole cameras used by Earth operators to construct 3D digital terrain meshes.',
        position: [0, 0.18, 0.28],
      },
    ],
  },

  'spirit-mer-a': {
    id: 'spirit-mer-a',
    name: 'Mars Exploration Rover Spirit (MER-A)',
    targetBody: 'Mars',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA/JPL 3D Resources / Cornell University',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/detail/mer-spirit-opportunity',
    license: 'Public Domain (NASA/JPL-Caltech)',
    attribution: 'NASA / JPL-Caltech / Cornell',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/spirit.jpg',
    keyAnnotations: [
      {
        id: 'pancam-mast',
        label: 'Pancam Mast Assembly (PMA)',
        description: 'Stereo multi-spectral camera standing 1.5 m above terrain with 360° azimuth sweep.',
        position: [0, 0.85, 0.3],
      },
      {
        id: 'solar-wings',
        label: 'Multi-Junction Solar Wings',
        description: 'Triple-junction arrays generating up to 900 Wh/sol prior to winter dust accumulation.',
        position: [0, 0.1, -0.2],
      },
      {
        id: 'stuck-wheel',
        label: 'Failed Right-Front Wheel',
        description: 'Failed Sol 779; dragged through Gusev soil to accidentally unearth 90% pure silica.',
        position: [0.45, -0.35, 0.45],
      },
      {
        id: 'robotic-arm',
        label: 'Instrument Deployment Device (IDD)',
        description: '5-degree-of-freedom robotic arm bearing RAT grinder, Mossbauer, and Microscopic Imager.',
        position: [0, -0.15, 0.55],
      },
    ],
  },

  'opportunity-mer-b': {
    id: 'opportunity-mer-b',
    name: 'Mars Exploration Rover Opportunity (MER-B)',
    targetBody: 'Mars',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA/JPL 3D Resources / Cornell University',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/detail/mer-spirit-opportunity',
    license: 'Public Domain (NASA/JPL-Caltech)',
    attribution: 'NASA / JPL-Caltech / Cornell',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/opportunity.jpg',
    keyAnnotations: [
      {
        id: 'traverse-chassis',
        label: '45.16 km Marathon Chassis',
        description: 'Longest off-world driving record: from Eagle Crater to Endeavour Crater rim.',
        position: [0, -0.2, 0],
      },
      {
        id: 'hga-gimbal',
        label: 'High-Gain Gimbaled Antenna',
        description: 'Pointed directly at NASA Deep Space Network dishes on Earth for high-speed X-band downlink.',
        position: [-0.35, 0.4, -0.25],
      },
      {
        id: 'pancam-eyes',
        label: 'Panoramic Camera (Pancam)',
        description: 'Captured the iconic Greeley Haven panorama and discovered hematite "blueberries".',
        position: [0, 0.85, 0.3],
      },
      {
        id: 'dusty-array',
        label: 'Solar Array (Storm Loss Site)',
        description: 'Suffered catastrophic insolation loss during global dust storm (tau > 10.8) at Perseverance Valley.',
        position: [0, 0.1, -0.15],
      },
    ],
  },

  'ingenuity-mars2020': {
    id: 'ingenuity-mars2020',
    name: 'Mars Helicopter Ingenuity',
    targetBody: 'Mars',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA/JPL 3D Resources / Mars 2020',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/detail/ingenuity',
    license: 'Public Domain (NASA/JPL-Caltech)',
    attribution: 'NASA / JPL-Caltech / AeroVironment',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/ingenuity.jpg',
    keyAnnotations: [
      {
        id: 'coaxial-rotors',
        label: 'Counter-Rotating Carbon-Fiber Rotors',
        description: 'Dual 1.21 m blades spinning at 2,400–2,700 RPM to generate lift in 1% Earth air density.',
        position: [0, 0.45, 0],
      },
      {
        id: 'solar-topper',
        label: 'Mast Solar Panel & Antenna',
        description: 'Recharged 6 Sony lithium-ion cells for survival heating through -90°C Martian nights.',
        position: [0, 0.72, 0],
      },
      {
        id: 'fuselage-cube',
        label: 'Avionics Core Fuselage',
        description: 'Insulated cube housing Qualcomm Snapdragon 801 processor, IMUs, and downward laser altimeter.',
        position: [0, 0.1, 0],
      },
      {
        id: 'carbon-legs',
        label: 'Carbon Composite Landing Legs',
        description: 'Four spring-damped landing struts resting in the sand dunes of Valinor Hills after Flight 72.',
        position: [0.35, -0.3, 0.35],
      },
    ],
  },

  'dawn-spacecraft': {
    id: 'dawn-spacecraft',
    name: 'Dawn Spacecraft (Ceres Orbit)',
    targetBody: 'Ceres',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA/JPL 3D Resources / Orbital ATK',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/detail/dawn',
    license: 'Public Domain (NASA/JPL-Caltech)',
    attribution: 'NASA / JPL-Caltech / UCLA / Orbital ATK',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/dawn.jpg',
    keyAnnotations: [
      {
        id: 'solar-wingspan',
        label: '19.7-Meter Dual Solar Wings',
        description: 'Gigantic solar arrays necessary to collect weak sunlight at 2.8 AU in the Main Asteroid Belt.',
        position: [1.8, 0, 0],
      },
      {
        id: 'ion-engine',
        label: 'NSTAR Xenon Ion Propulsion System',
        description: 'Exhausted 425 kg of xenon propellant to orbit both giant asteroid Vesta and dwarf planet Ceres.',
        position: [0, -0.6, 0],
      },
      {
        id: 'high-gain-dish',
        label: '1.52-Meter High-Gain Antenna',
        description: 'Pointed toward Earth to transmit gravity science and mapping data of Occator Crater.',
        position: [0, 0.55, 0.3],
      },
      {
        id: 'ceres-orbit-context',
        label: 'Planetary Protection Parking Orbit',
        description: 'Uncontrolled stable orbit calculated with >99% confidence to remain clear of Ceres for 50+ years.',
        position: [0, 0, -0.8],
      },
    ],
  },

  'near-shoemaker': {
    id: 'near-shoemaker',
    name: 'NEAR Shoemaker (Asteroid 433 Eros)',
    targetBody: 'Eros',
    authenticityStatus: 'Architectural 3D Reconstruction',
    source: 'NASA / Johns Hopkins University Applied Physics Laboratory (JHU/APL)',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-008A',
    license: 'Public Domain (NASA/JHUAPL)',
    attribution: 'NASA / Johns Hopkins APL',
    geometryType: 'Procedural CAD Composite',
    fallbackImagePath: '/images/artifacts/near-shoemaker.jpg',
    keyAnnotations: [
      {
        id: 'fixed-solar-panels',
        label: 'Four Fixed GaAs Solar Arrays',
        description: 'Provided 1,800 W at 1 AU; continued generating electricity after 1.9 m/s soft touchdown on Eros.',
        position: [0.75, 0.2, 0.5],
      },
      {
        id: 'high-gain-dish',
        label: '1.83-Meter Fixed High-Gain Antenna',
        description: 'Transmitted X-band carrier down to DSN dishes for 16 days from the asteroid surface.',
        position: [0, 0.65, 0],
      },
      {
        id: 'nlr-laser',
        label: 'NEAR Laser Rangefinder (NLR)',
        description: 'Mapped millions of surface range points to build the first accurate 3D gravitational model of an asteroid.',
        position: [0, -0.4, 0.3],
      },
      {
        id: 'eros-surface-context',
        label: 'Body-Fixed Coordinates (433 Eros)',
        description: 'Rests in the saddle region near Himeros at 35° S, 279° W in Eros body-fixed frame.',
        position: [0, -0.7, 0],
      },
    ],
  },
};
