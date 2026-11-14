import { useEffect, useRef } from 'react';
import type { Artifact } from '../../types/artifact';
import { TranscriptCard } from './TranscriptCard';

interface ArtifactDetailModalProps {
  artifact: Artifact;
  allArtifacts: Artifact[];
  onClose: () => void;
  onNavigateArtifact: (artifactId: string) => void;
}

export function ArtifactDetailModal({
  artifact,
  allArtifacts,
  onClose,
  onNavigateArtifact,
}: ArtifactDetailModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentIndex = allArtifacts.findIndex((a) => a.artifactId === artifact.artifactId);
  const prevArtifact = currentIndex > 0 ? allArtifacts[currentIndex - 1] : allArtifacts[allArtifacts.length - 1];
  const nextArtifact = currentIndex < allArtifacts.length - 1 ? allArtifacts[currentIndex + 1] : allArtifacts[0];

  // Focus management and body scroll locking
  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElementRef.current?.focus();
    };
  }, []);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (prevArtifact) onNavigateArtifact(prevArtifact.artifactId);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (nextArtifact) onNavigateArtifact(nextArtifact.artifactId);
        return;
      }

      // Accessible Focus Trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateArtifact, prevArtifact, nextArtifact]);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'passive_operational':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'silent_orbit':
        return 'text-sky-400 bg-sky-950/60 border-sky-500/40';
      case 'mission_concluded':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'decommissioned':
      default:
        return 'text-zinc-300 bg-zinc-900/80 border-zinc-700/50';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center p-3 sm:p-6 md:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div className="relative w-full max-w-5xl bg-space-card border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto text-stellar-white flex flex-col max-h-[92vh]">
        {/* Modal Sticky Navigation Header */}
        <header className="sticky top-0 z-40 bg-space-card/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse" />
            <span className="text-stellar-gold font-bold uppercase tracking-wider">
              MUSEUM ARCHIVE // {artifact.destination.toUpperCase()}
            </span>
            <span className="text-zinc-600">//</span>
            <span className="text-stellar-muted hidden sm:inline">
              PIONEER {currentIndex + 1} OF {allArtifacts.length}
            </span>
          </div>

          {/* Quick Prev / Next Explorer & Close Buttons */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => onNavigateArtifact(prevArtifact.artifactId)}
              className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center space-x-1 focus-visible:ring-1 focus-visible:ring-stellar-gold"
              aria-label={`Previous explorer: ${prevArtifact.name}`}
            >
              <span>← PREV</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateArtifact(nextArtifact.artifactId)}
              className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center space-x-1 focus-visible:ring-1 focus-visible:ring-stellar-gold"
              aria-label={`Next explorer: ${nextArtifact.name}`}
            >
              <span>NEXT →</span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-stellar-white border border-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-stellar-gold font-bold ml-2"
              aria-label="Close artifact details modal"
            >
              ✕ <span className="hidden sm:inline text-[11px] font-normal">ESC</span>
            </button>
          </div>
        </header>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-12">
          {/* SECTION A: INTRODUCTION & CINEMATIC PLATE */}
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="relative aspect-[21/10] sm:aspect-[21/9] w-full rounded-xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl">
                <img
                  src={artifact.media.fallbackImagePath}
                  alt={artifact.name}
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-card via-transparent to-black/30 pointer-events-none" />

                {/* Photo Attribution Stencil */}
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10 text-[10px] font-mono text-zinc-300 bg-black/75 backdrop-blur-md p-2 rounded border border-white/10">
                  <span className="truncate max-w-[400px]">CREDIT: {artifact.media.photoCredits}</span>
                  <span className="text-stellar-gold uppercase">ARCHIVAL MISSION RECORD</span>
                </div>
              </div>

              {/* Image Provenance Clarification Note */}
              <div className="text-[11px] font-mono text-zinc-400 bg-black/40 border border-white/5 p-2 rounded flex items-center justify-between">
                <span>
                  <strong className="text-stellar-muted uppercase">IMAGE PROVENANCE:</strong> Genuine NASA mission photography / scientific product.
                </span>
                <span className="text-zinc-500 hidden sm:inline">CURRENT RESTING STATE DERIVED FROM TELEMETRY & SATELLITE IMAGING</span>
              </div>
            </div>

            {/* Title, Badges & Intro Lead */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-stellar-gold/20 text-stellar-gold border border-stellar-gold/40 font-bold uppercase tracking-wider">
                  {artifact.destination.toUpperCase()} // {artifact.targetBody.toUpperCase()}
                </span>
                <span
                  className={`px-3 py-1 rounded border uppercase font-medium ${getStatusBadgeStyle(
                    artifact.operationalStatus
                  )}`}
                >
                  {artifact.statusLabel}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-400">
                  MISSION NSSDCA: {artifact.missionNssdcaId}
                </span>
              </div>

              <h1 id="modal-title" className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-stellar-white leading-tight">
                {artifact.name}
              </h1>

              <p className="text-lg sm:text-xl text-stellar-gray font-normal leading-relaxed border-l-2 border-stellar-gold/60 pl-4 py-1">
                {artifact.documentaryNarrative}
              </p>
            </div>

            {/* Quick Specs Overview Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MISSION ERA</span>
                <span className="text-stellar-white font-semibold">
                  {artifact.launchDate} → {artifact.endOfMissionDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">TOTAL MASS</span>
                <span className="text-stellar-white font-semibold">
                  {artifact.specs.massKg.toLocaleString()} kg
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">POWER ARCHITECTURE</span>
                <span className="text-stellar-white font-semibold">
                  {artifact.specs.powerSource}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">OPERATIONAL LIFESPAN</span>
                <span className="text-stellar-gold font-semibold">
                  {artifact.specs.actualLifespanDays.toLocaleString()} Days{' '}
                  <span className="text-zinc-500 text-[10px]">
                    (Planned: {artifact.specs.designedLifespanDays}d)
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: MISSION PURPOSE */}
          <section className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
              <span>01 // MISSION MANDATE</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-stellar-white">
              Why the Explorer Was Sent
            </h2>
            <p className="text-base text-stellar-gray leading-relaxed max-w-4xl">
              {artifact.summary}
            </p>
          </section>

          {/* SECTION C: ENGINEERING & INSTRUMENTS */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-cyan">
              <span>02 // ENGINEERING SPECIFICATIONS & INSTRUMENTS</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-stellar-white">
              Hardware Architecture & Payload
            </h2>

            {/* Hardware Characteristics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase">CHASSIS DIMENSIONS</span>
                <span className="text-stellar-white font-medium">{artifact.specs.dimensionsMeters}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase">TOTAL DISTANCE TRAVERSED</span>
                <span className="text-stellar-cyan font-bold">
                  {artifact.specs.distanceTraveledKm !== undefined
                    ? `${artifact.specs.distanceTraveledKm.toLocaleString()} km`
                    : 'Stationary / Orbital Track'}
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 block uppercase">LIFESPAN MULTIPLIER</span>
                <span className="text-stellar-amber font-bold">
                  {(artifact.specs.actualLifespanDays / artifact.specs.designedLifespanDays).toFixed(1)}× Planned Warranty
                </span>
              </div>
            </div>

            {/* Scientific Instruments Suite */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                DOCUMENTED SCIENTIFIC PAYLOAD:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artifact.instruments.map((inst, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-space-card/80 border border-white/10 space-y-2 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
                      <span className="font-bold text-stellar-white">{inst.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-stellar-cyan/15 text-stellar-cyan text-[10px]">
                        {inst.acronym}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      <span className="text-stellar-muted font-semibold">PURPOSE:</span> {inst.purpose}
                    </p>
                    <p className="text-stellar-white text-[11px] leading-relaxed bg-white/5 p-2 rounded">
                      <span className="text-stellar-gold font-semibold">DISCOVERY / RESULT:</span> {inst.keyFinding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION D: SCIENTIFIC DISCOVERIES */}
          <section className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
              <span>03 // SCIENTIFIC IMPACT</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-stellar-white">
              Permanent Scientific Discoveries
            </h2>
            <div className="p-5 rounded-xl bg-stellar-gold/5 border border-stellar-gold/20 space-y-3">
              <p className="text-base text-stellar-white leading-relaxed">
                {artifact.scientificLegacy}
              </p>
            </div>
          </section>

          {/* SECTION E: THE FINAL CHAPTER & HISTORICAL TRANSMISSIONS */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-status-concluded">
              <span>04 // MISSION CONCLUSION</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-stellar-white">
              The Final Chapter & Last Recorded Transmissions
            </h2>

            {/* Ending Narrative */}
            <p className="text-base text-stellar-gray leading-relaxed max-w-4xl">
              {artifact.finalMomentsStory}
            </p>

            {/* Verified Mission Conclusion Box */}
            <div className="p-4 rounded-lg bg-black/60 border border-white/10 font-mono text-xs space-y-2">
              <div className="text-stellar-muted uppercase text-[10px] tracking-wider">
                VERIFIED CONCLUSION CAUSE:
              </div>
              <p className="text-stellar-white leading-relaxed font-sans text-sm">
                {artifact.missionEndReason}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-zinc-400 border-t border-white/5">
                <span>FORMAL END DATE: {artifact.endOfMissionDate}</span>
                {artifact.lastContactDate && (
                  <span>LAST CONTACT: {artifact.lastContactDate}</span>
                )}
              </div>
            </div>

            {/* Historical Transmissions Cards */}
            {artifact.historicalTransmissions && artifact.historicalTransmissions.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  AUTHENTIC MISSION RADIO & TELEMETRY LOGS:
                </h3>
                {artifact.historicalTransmissions.map((record, idx) => (
                  <TranscriptCard key={idx} record={record} />
                ))}
              </div>
            )}
          </section>

          {/* SECTION F: WHERE IT REMAINS & ASSOCIATED EQUIPMENT */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs font-mono text-status-passive">
              <span>05 // GEOGRAPHY & CURRENT CONDITION</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-stellar-white">
              Where It Remains
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Coordinates Card */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5">
                <span className="text-[10px] text-stellar-cyan uppercase tracking-wider block font-bold">
                  📍 EXACT GROUND TRUTH COORDINATES
                </span>
                <div className="text-lg font-bold text-stellar-white">
                  {artifact.coordinates.coordinateString}
                </div>
                <div className="text-zinc-300">
                  <span className="text-stellar-muted">SITE:</span> {artifact.coordinates.semanticLabel}
                </div>
                <div className="text-zinc-400">
                  <span className="text-stellar-muted">REGION:</span> {artifact.coordinates.landingSiteName}
                </div>
                {artifact.coordinates.derivationSource && (
                  <div className="text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                    SOURCE: {artifact.coordinates.derivationSource}
                  </div>
                )}
              </div>

              {/* Current Physical Condition */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5">
                <span className="text-[10px] text-stellar-amber uppercase tracking-wider block font-bold">
                  CURRENT PHYSICAL STATE
                </span>
                <p className="text-stellar-gray font-sans text-xs leading-relaxed">
                  {artifact.currentCondition}
                </p>
                <div className="text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                  <span className="text-stellar-muted">LOCATION TYPE:</span>{' '}
                  <span className="uppercase text-stellar-white">{artifact.locationType.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            {/* ASSOCIATED EQUIPMENT CALLOUT (Apollo 15 LRRR) */}
            {artifact.associatedEquipment && artifact.associatedEquipment.length > 0 && (
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-bold uppercase tracking-wider">
                      ASSOCIATED EQUIPMENT // SEPARATE PASSIVE EXPERIMENT
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 font-semibold">
                    PASSIVE OPERATIONAL TODAY
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-stellar-white">
                    {artifact.associatedEquipment[0].name}
                  </h3>
                  <p className="text-sm text-stellar-gray leading-relaxed">
                    {artifact.associatedEquipment[0].description}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/20 font-mono text-xs space-y-1.5">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">
                    OPERATIONAL SCIENTIFIC STATUS:
                  </span>
                  <p className="text-stellar-white text-[11px] leading-relaxed">
                    {artifact.associatedEquipment[0].operationalNotes}
                  </p>
                  <div className="pt-2 text-[10px] text-zinc-400 flex justify-between border-t border-white/5">
                    <span>COORDINATES: {artifact.associatedEquipment[0].coordinates.coordinateString}</span>
                    <span>SITE: {artifact.associatedEquipment[0].coordinates.semanticLabel}</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION G & H: FLIGHT RECORDS & CITATION REFERENCES */}
          <section className="space-y-6 pt-6 border-t border-white/10 pb-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
              <span>06 // FLIGHT RECORDS & DATA CITATIONS</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-stellar-white">
              Official NASA Catalog Hierarchy & Citations
            </h2>

            {/* NSSDCA Hierarchy Clarification */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-stellar-white font-semibold">
                  PARENT MISSION COSPAR ID: <span className="text-stellar-cyan">{artifact.missionNssdcaId}</span>
                </span>
                <span className="text-zinc-500 text-[10px]">
                  EQUIPMENT SPECIFIC ID: {artifact.equipmentNssdcaId || 'None (Cargo / Surface Deployed)'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                {artifact.nssdcaClarification}
              </p>
            </div>

            {/* Documented Source References */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                AUDITED NASA / NSSDCA / JPL SOURCES:
              </h3>
              <div className="space-y-2.5">
                {artifact.sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-space-card border border-white/10 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stellar-white font-medium hover:text-stellar-gold transition-colors flex items-center space-x-1"
                      >
                        <span>{src.title}</span>
                        <span className="text-stellar-cyan text-[11px]">↗</span>
                      </a>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        REPOSITORY: {src.sourceRepository}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {src.supportedClaims.map((claim, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-zinc-400"
                        >
                          {claim}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Modal Sticky Bottom Navigation Bar */}
        <footer className="sticky bottom-0 z-40 bg-space-card/95 backdrop-blur-md px-6 py-3.5 border-t border-white/10 flex items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onNavigateArtifact(prevArtifact.artifactId)}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-stellar-white flex items-center space-x-1 transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold"
            >
              <span>← {prevArtifact.name}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stellar-gold text-space-black font-bold uppercase tracking-wider hover:bg-stellar-amber transition-colors shadow-[0_0_15px_rgba(232,154,60,0.3)] focus-visible:ring-2 focus-visible:ring-white"
          >
            RETURN TO MUSEUM
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => onNavigateArtifact(nextArtifact.artifactId)}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-stellar-white flex items-center space-x-1 transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold"
            >
              <span>{nextArtifact.name} →</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
