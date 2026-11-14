import { useEffect, useRef } from 'react';
import type { Artifact } from '../../types/artifact';
import { TranscriptCard } from './TranscriptCard';
import { Artifact3DStage } from '../3d/Artifact3DStage';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      {/* Clickable Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Centered Modal Window */}
      <div 
        className="relative z-10 w-full max-w-5xl h-[calc(100dvh-1.5rem)] sm:h-[calc(100dvh-2.5rem)] md:h-[calc(100dvh-4rem)] max-h-[920px] bg-[#0c0d12] border border-white/20 rounded-2xl shadow-2xl flex flex-col min-w-0 overflow-hidden box-border text-stellar-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Navigation Header */}
        <header className="shrink-0 z-20 bg-[#0e1017] border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono min-w-0">
            <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse shrink-0" />
            <span className="text-stellar-gold font-bold uppercase tracking-wider truncate">
              MUSEUM ARCHIVE // {artifact.destination.toUpperCase()}
            </span>
            <span className="text-zinc-600 hidden xs:inline">//</span>
            <span className="text-stellar-muted hidden sm:inline shrink-0">
              PIONEER {currentIndex + 1} OF {allArtifacts.length}
            </span>
          </div>

          {/* Quick Prev / Next Explorer & Close Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs font-mono shrink-0">
            <button
              type="button"
              onClick={() => onNavigateArtifact(prevArtifact.artifactId)}
              className="px-2 sm:px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center space-x-1 focus-visible:ring-1 focus-visible:ring-stellar-gold"
              aria-label={`Previous explorer: ${prevArtifact.name}`}
            >
              <span>← PREV</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateArtifact(nextArtifact.artifactId)}
              className="px-2 sm:px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center space-x-1 focus-visible:ring-1 focus-visible:ring-stellar-gold"
              aria-label={`Next explorer: ${nextArtifact.name}`}
            >
              <span>NEXT →</span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 px-2.5 sm:px-3 rounded-lg bg-white/10 hover:bg-white/20 text-stellar-white border border-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-stellar-gold font-bold ml-1 sm:ml-2"
              aria-label="Close artifact details modal"
            >
              ✕ <span className="hidden sm:inline text-[11px] font-normal">ESC</span>
            </button>
          </div>
        </header>

        {/* Scrollable Modal Content Body */}
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden px-4 sm:px-8 md:px-10 py-6 sm:py-8 space-y-10 box-border">
          {/* SECTION A: INTRODUCTION & CINEMATIC 3D STAGE */}
          <section className="space-y-6 min-w-0">
            <Artifact3DStage artifact={artifact} />

            {/* Title, Badges & Intro Lead */}
            <div className="space-y-4 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
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

              <h1 id="modal-title" className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stellar-white leading-tight break-words">
                {artifact.name}
              </h1>

              <p className="text-base sm:text-lg text-stellar-gray font-normal leading-relaxed border-l-2 border-stellar-gold/60 pl-4 py-1 break-words">
                {artifact.documentaryNarrative}
              </p>
            </div>

            {/* Quick Specs Overview Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MISSION ERA</span>
                <span className="text-stellar-white font-semibold block truncate">
                  {artifact.launchDate} → {artifact.endOfMissionDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">TOTAL MASS</span>
                <span className="text-stellar-white font-semibold block">
                  {artifact.specs.massKg.toLocaleString()} kg
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">POWER ARCHITECTURE</span>
                <span className="text-stellar-white font-semibold block truncate">
                  {artifact.specs.powerSource}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">OPERATIONAL LIFESPAN</span>
                <span className="text-stellar-gold font-semibold block">
                  {artifact.specs.actualLifespanDays.toLocaleString()} Days{' '}
                  <span className="text-zinc-500 text-[10px]">
                    (Planned: {artifact.specs.designedLifespanDays}d)
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* SECTION B: MISSION PURPOSE */}
          <section className="space-y-4 pt-6 border-t border-white/10 min-w-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
              <span>01 // MISSION MANDATE</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
              Why the Explorer Was Sent
            </h2>
            <p className="text-sm sm:text-base text-stellar-gray leading-relaxed max-w-4xl break-words">
              {artifact.summary}
            </p>
          </section>

          {/* SECTION C: ENGINEERING & INSTRUMENTS */}
          <section className="space-y-6 pt-6 border-t border-white/10 min-w-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-cyan">
              <span>02 // ENGINEERING SPECIFICATIONS & INSTRUMENTS</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
              Hardware Architecture & Payload
            </h2>

            {/* Hardware Characteristics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1 min-w-0">
                <span className="text-[10px] text-zinc-500 block uppercase">CHASSIS DIMENSIONS</span>
                <span className="text-stellar-white font-medium block truncate">{artifact.specs.dimensionsMeters}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1 min-w-0">
                <span className="text-[10px] text-zinc-500 block uppercase">TOTAL DISTANCE TRAVERSED</span>
                <span className="text-stellar-cyan font-bold block truncate">
                  {artifact.specs.distanceTraveledKm !== undefined
                    ? `${artifact.specs.distanceTraveledKm.toLocaleString()} km`
                    : 'Stationary / Orbital Track'}
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1 min-w-0">
                <span className="text-[10px] text-zinc-500 block uppercase">LIFESPAN MULTIPLIER</span>
                <span className="text-stellar-amber font-bold block truncate">
                  {(artifact.specs.actualLifespanDays / artifact.specs.designedLifespanDays).toFixed(1)}× Planned Warranty
                </span>
              </div>
            </div>

            {/* Scientific Instruments Suite */}
            <div className="space-y-3 min-w-0">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                DOCUMENTED SCIENTIFIC PAYLOAD:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artifact.instruments.map((inst, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-space-card/80 border border-white/10 space-y-2 font-mono text-xs min-w-0"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 min-w-0">
                      <span className="font-bold text-stellar-white truncate">{inst.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-stellar-cyan/15 text-stellar-cyan text-[10px] shrink-0">
                        {inst.acronym}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed break-words">
                      <span className="text-stellar-muted font-semibold">PURPOSE:</span> {inst.purpose}
                    </p>
                    <p className="text-stellar-white text-[11px] leading-relaxed bg-white/5 p-2 rounded break-words">
                      <span className="text-stellar-gold font-semibold">DISCOVERY / RESULT:</span> {inst.keyFinding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION D: SCIENTIFIC DISCOVERIES */}
          <section className="space-y-4 pt-6 border-t border-white/10 min-w-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
              <span>03 // SCIENTIFIC IMPACT</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
              Permanent Scientific Discoveries
            </h2>
            <div className="p-4 sm:p-5 rounded-xl bg-stellar-gold/5 border border-stellar-gold/20 space-y-3 min-w-0">
              <p className="text-sm sm:text-base text-stellar-white leading-relaxed break-words">
                {artifact.scientificLegacy}
              </p>
            </div>
          </section>

          {/* SECTION E: THE FINAL CHAPTER & HISTORICAL TRANSMISSIONS */}
          <section className="space-y-6 pt-6 border-t border-white/10 min-w-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-status-concluded">
              <span>04 // MISSION CONCLUSION</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
              The Final Chapter & Last Recorded Transmissions
            </h2>

            {/* Ending Narrative */}
            <p className="text-sm sm:text-base text-stellar-gray leading-relaxed max-w-4xl break-words">
              {artifact.finalMomentsStory}
            </p>

            {/* Verified Mission Conclusion Box */}
            <div className="p-4 rounded-lg bg-black/60 border border-white/10 font-mono text-xs space-y-2 min-w-0">
              <div className="text-stellar-muted uppercase text-[10px] tracking-wider font-semibold">
                VERIFIED CONCLUSION CAUSE:
              </div>
              <p className="text-stellar-white leading-relaxed font-sans text-sm break-words">
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
              <div className="space-y-3 min-w-0">
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
          <section className="space-y-6 pt-6 border-t border-white/10 min-w-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-status-passive">
              <span>05 // GEOGRAPHY & CURRENT CONDITION</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
              Where It Remains
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* Coordinates Card */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5 min-w-0">
                <span className="text-[10px] text-stellar-cyan uppercase tracking-wider block font-bold">
                  📍 EXACT GROUND TRUTH COORDINATES
                </span>
                <div className="text-base sm:text-lg font-bold text-stellar-white break-words">
                  {artifact.coordinates.coordinateString}
                </div>
                <div className="text-zinc-300 break-words">
                  <span className="text-stellar-muted">SITE:</span> {artifact.coordinates.semanticLabel}
                </div>
                <div className="text-zinc-400 break-words">
                  <span className="text-stellar-muted">REGION:</span> {artifact.coordinates.landingSiteName}
                </div>
                {artifact.coordinates.derivationSource && (
                  <div className="text-[10px] text-zinc-500 pt-1 border-t border-white/5 break-words">
                    SOURCE: {artifact.coordinates.derivationSource}
                  </div>
                )}
              </div>

              {/* Current Physical Condition */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5 min-w-0">
                <span className="text-[10px] text-stellar-amber uppercase tracking-wider block font-bold">
                  CURRENT PHYSICAL STATE
                </span>
                <p className="text-stellar-gray font-sans text-xs leading-relaxed break-words">
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
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 min-w-0">
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

                <div className="space-y-2 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-stellar-white break-words">
                    {artifact.associatedEquipment[0].name}
                  </h3>
                  <p className="text-sm text-stellar-gray leading-relaxed break-words">
                    {artifact.associatedEquipment[0].description}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/20 font-mono text-xs space-y-1.5 min-w-0">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">
                    OPERATIONAL SCIENTIFIC STATUS:
                  </span>
                  <p className="text-stellar-white text-[11px] leading-relaxed break-words">
                    {artifact.associatedEquipment[0].operationalNotes}
                  </p>
                  <div className="pt-2 text-[10px] text-zinc-400 flex flex-wrap justify-between gap-2 border-t border-white/5">
                    <span>COORDINATES: {artifact.associatedEquipment[0].coordinates.coordinateString}</span>
                    <span>SITE: {artifact.associatedEquipment[0].coordinates.semanticLabel}</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SECTION G & H: FLIGHT RECORDS & CITATION REFERENCES */}
          <section className="space-y-6 pt-6 border-t border-white/10 pb-6 min-w-0">
            <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold">
              <span>06 // FLIGHT RECORDS & DATA CITATIONS</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
              Official NASA Catalog Hierarchy & Citations
            </h2>

            {/* NSSDCA Hierarchy Clarification */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-stellar-white font-semibold">
                  PARENT MISSION COSPAR ID: <span className="text-stellar-cyan">{artifact.missionNssdcaId}</span>
                </span>
                <span className="text-zinc-500 text-[10px]">
                  EQUIPMENT SPECIFIC ID: {artifact.equipmentNssdcaId || 'None (Cargo / Surface Deployed)'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans break-words">
                {artifact.nssdcaClarification}
              </p>
            </div>

            {/* Documented Source References */}
            <div className="space-y-3 min-w-0">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                AUDITED NASA / NSSDCA / JPL SOURCES:
              </h3>
              <div className="space-y-2.5">
                {artifact.sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-space-card border border-white/10 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0"
                  >
                    <div className="min-w-0 flex-1">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stellar-white font-medium hover:text-stellar-gold transition-colors inline-flex items-center space-x-1.5 break-words group"
                      >
                        <span className="group-hover:underline break-words line-clamp-2">{src.title}</span>
                        <span className="text-stellar-cyan text-[11px] shrink-0" aria-hidden="true">↗</span>
                      </a>
                      <div className="text-[10px] text-zinc-500 mt-0.5 truncate">
                        REPOSITORY: {src.sourceRepository}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0 max-w-full">
                      {src.supportedClaims.map((claim, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-zinc-400 truncate max-w-[200px]"
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
        <footer className="shrink-0 z-20 bg-[#0e1017] border-t border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4 font-mono text-xs min-w-0">
          <button
            type="button"
            onClick={() => onNavigateArtifact(prevArtifact.artifactId)}
            className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-stellar-white flex items-center space-x-1 transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold min-h-[38px] max-w-[120px] sm:max-w-[200px] md:max-w-[260px] truncate shrink"
            aria-label={`Previous explorer: ${prevArtifact.name}`}
          >
            <span className="truncate">← {prevArtifact.name}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 sm:px-5 py-2 rounded-lg bg-stellar-gold text-space-black font-bold uppercase tracking-wider hover:bg-stellar-amber transition-colors shadow-[0_0_15px_rgba(232,154,60,0.3)] focus-visible:ring-2 focus-visible:ring-white shrink-0 min-h-[38px]"
          >
            RETURN TO MUSEUM
          </button>

          <button
            type="button"
            onClick={() => onNavigateArtifact(nextArtifact.artifactId)}
            className="px-2.5 sm:px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-stellar-white flex items-center space-x-1 transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold min-h-[38px] max-w-[120px] sm:max-w-[200px] md:max-w-[260px] truncate shrink text-right"
            aria-label={`Next explorer: ${nextArtifact.name}`}
          >
            <span className="truncate">{nextArtifact.name} →</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
