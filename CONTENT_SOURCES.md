# The Silent Explorers: Content Sources & Verification Protocol (Audited)

**Primary Directive**: Scientific and historical accuracy takes absolute priority over dramatic storytelling. Every factual statement, date, coordinate, status, and transmission must be grounded in documented NASA sources.

---

## 1. Authoritative NASA Data Repositories

The project utilizes the following official NASA data sources as the bedrock of all content:

| Repository / Source | Managing Center | Purpose in The Silent Explorers |
| :--- | :--- | :--- |
| **NSSDCA Master Catalog** (NASA Space Science Data Coordinated Archive) | NASA Goddard Space Flight Center | Authoritative identifier (NSSDCA ID), launch/landing dates, orbital parameters, official mission summaries. |
| **NASA Planetary Data System (PDS)** | NASA Science Mission Directorate | Scientific instrument payloads, raw spectrometry/magnetometer data, engineering telemetry, and LROC landing site coordinates. |
| **Apollo Lunar Surface Journal (ALSJ)** | NASA History Division | Complete air-to-ground radio transcripts, surface coordinates, and photo logs for Apollo 15, 16, and 17 LRVs and ALSEP packages. |
| **NASA Mars Exploration Program & JPL Missions** | Jet Propulsion Laboratory (JPL) | Ground truth coordinates, sol counts, distance traveled ($km$), and end-of-mission notices for *Sojourner*, *Spirit*, *Opportunity*, and *Ingenuity*. |
| **NASA Photojournal & Planetary Photojournal** | JPL / NASA Headquarters | High-resolution public domain imagery, original captions, image credit metadata, and spacecraft engineering diagrams. |
| **NASA Solar System Exploration** | NASA Headquarters | Planetary physical parameters, orbital distances, and educational context for Moon, Mars, Ceres, and asteroid 433 Eros. |

---

## 2. Artifact Verification Baseline (The 8 Explorers - Audited)

Every artifact profile in the application documents and cites the following verified data points:

### 1. Apollo 17 Lunar Roving Vehicle (LRV-3)
* **Mission NSSDCA ID**: `1972-096A` (Parent mission CSM *America*). Note: `1972-096C` designates the LM *Challenger* ascent stage and `1972-096D` designates the descent stage. LRV-3 was stowed cargo on the descent stage and does NOT possess an independent NSSDCA/COSPAR identifier.
* **Exact Semantic Location**: VIP Camera Parking Site ($20.1896^\circ\text{ N}, 30.7769^\circ\text{ E}$, LROC NAC / Wagner et al. 2017). Located approx. 158 meters east-northeast of the Lunar Module *Challenger* descent stage ($20.1908^\circ\text{ N}, 30.7717^\circ\text{ E}$).
* **Status**: `decommissioned`. Parked to televise the LM ascent stage liftoff; primary batteries expired as planned.
* **Primary Citation**: ALSJ Apollo 17 EVA-3 Close-out & LROC NAC coordinates.

### 2. Apollo 15 ALSEP & Laser Retroreflector
* **Mission NSSDCA ID**: `1971-063A` (Apollo 15).
* **Exact Semantic Location**: ALSEP Central Station Site ($26.13407^\circ\text{ N}, 3.62981^\circ\text{ E}$, approx. 110 m west-northwest of LM *Falcon* descent stage at $26.13222^\circ\text{ N}, 3.63386^\circ\text{ E}$).
* **Status**: `decommissioned`. Powered by SNAP-27 RTG. Turned off by NASA command sequence on September 30, 1977 due to budget constraints.
* **Separate Equipment (Apollo 15 LRRR)**:
  * The Laser Ranging Retroreflector was a separate passive experiment, not an electrical part of ALSEP.
  * Location: $26.13341^\circ\text{ N}, 3.62850^\circ\text{ E}$ (~40 m west of ALSEP central station).
  * Status: `passive_operational`. Requires zero electrical power; actively targeted by Earth-based lasers today to measure lunar recession ($3.8\text{ cm/year}$).
* **Primary Citation**: NASA SP-287 ALSEP Systems Summary & NASA Lunar Laser Ranging Program.

### 3. Sojourner (Mars Pathfinder)
* **Mission / Lander NSSDCA ID**: `1996-068A` (Designates Mars Pathfinder spacecraft / *Carl Sagan Memorial Station*).
* **Exact Semantic Location**: Ares Vallis ($19.327^\circ\text{ N}, 33.550^\circ\text{ W}$, rover traversed within ~100m radius).
* **Status**: `decommissioned`. Lander base station battery failure on Sol 83 (September 27, 1997) severed the communications relay to Earth.
* **Primary Citation**: NSSDCA 1996-068A & JPL Pathfinder Science Results.

### 4. Spirit (MER-A)
* **NSSDCA ID**: `2003-027A` (MER-A spacecraft and rover).
* **Exact Semantic Location**: Final Resting Location in Troy, Gusev Crater ($-14.5684^\circ\text{ S}, 175.4726^\circ\text{ E}$).
* **Status**: `mission_concluded`. Trapped in soft sulfate sands in May 2009 with a failed right-front wheel; battery exhausted during Martian winter of 2010 (last contact March 22, 2010).
* **Primary Citation**: NSSDCA 2003-027A & JPL MER Archive.

### 5. Opportunity (MER-B)
* **NSSDCA ID**: `2003-032A` (MER-B spacecraft and rover).
* **Exact Semantic Location**: Final Resting Location in Perseverance Valley ($-1.9462^\circ\text{ S}, 354.4734^\circ\text{ E}$).
* **Status**: `mission_concluded`. Concluded on February 13, 2019 following a global planet-encircling dust storm in June 2018 (Sol 5111) that raised atmospheric tau above 10.8.
* **Primary Citation**: NSSDCA 2003-032A & JPL Press Release 2019-022.

### 6. Ingenuity (Mars Helicopter)
* **Mission NSSDCA ID**: `2020-052A` (Mars 2020 mission).
* **Exact Semantic Location**: Final Touchdown Site at Valinor Hills / Airfield Chi ($18.4447^\circ\text{ N}, 77.4508^\circ\text{ E}$).
* **Status**: `mission_concluded`. Hard landing during Flight 72 on January 18, 2024 over featureless sand dunes resulted in rotor blade tip fractures. Flight mission formally concluded on January 25, 2024.
* **Audit Correction**: Unverified claims regarding an ongoing ground environmental testbed have been completely removed.
* **Primary Citation**: NASA JPL Press Release: "After 72 Flights, US Mars Helicopter Mission Concludes" (Jan 25, 2024).

### 7. Dawn
* **NSSDCA ID**: `2007-043A` (Dawn spacecraft).
* **Exact Semantic Location**: Stable Uncontrolled Polar Parking Orbit around Dwarf Planet Ceres.
* **Status**: `silent_orbit`. Hydrazine attitude-control propellant exhausted on October 31, 2018.
* **Audit Correction**: NASA planetary protection required at least 20 years without impact; Monte Carlo orbital simulations demonstrated with >99% confidence that the orbit will remain stable and avoid impact for at least 50 years.
* **Primary Citation**: NSSDCA 2007-043A & JPL Dawn Planetary Protection Analysis.

### 8. NEAR Shoemaker
* **NSSDCA ID**: `1996-008A` (NEAR Shoemaker spacecraft).
* **Exact Semantic Location**: Touchdown Site in Himeros Depression, Asteroid 433 Eros ($-35.0^\circ\text{ S}, -279.0^\circ\text{ W}$).
* **Status**: `decommissioned`. Landed softly on February 12, 2001; operated for approximately two weeks on the surface until planned transmitter shutdown on February 28, 2001.
* **Audit Correction**: Specifically distinguished the two weeks of total post-landing surface operations from the seven days of dedicated surface gamma-ray measurements reported by NSSDCA.
* **Primary Citation**: NSSDCA 1996-008A & JHU-APL Mission Archive.
