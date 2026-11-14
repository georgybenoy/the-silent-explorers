import type { Artifact } from '../../types/artifact';

interface ArtifactCardProps {
  artifact: Artifact;
  isSelected?: boolean;
  onSelect: (artifactId: string) => void;
}

export function ArtifactCard({ artifact, isSelected = false, onSelect }: ArtifactCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passive_operational':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      case 'silent_orbit':
        return 'text-sky-400 bg-sky-950/40 border-sky-500/30';
      case 'mission_concluded':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      case 'decommissioned':
      default:
        return 'text-zinc-300 bg-zinc-900/60 border-zinc-700/40';
    }
  };

  const launchYear = artifact.launchDate.split('-')[0];
  const endYear = artifact.endOfMissionDate.split('-')[0];

  return (
    <article
      id={`artifact-${artifact.artifactId}`}
      onClick={() => onSelect(artifact.artifactId)}
      className={`group cursor-pointer rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 border ${
        isSelected
          ? 'bg-space-card border-stellar-gold shadow-[0_0_30px_rgba(232,154,60,0.3)] ring-1 ring-stellar-gold'
          : 'bg-space-card/70 border-white/10 hover:border-stellar-gold/40 hover:bg-space-card hover:shadow-xl'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(artifact.artifactId);
        }
      }}
      aria-label={`Inspect ${artifact.name} (${artifact.missionName})`}
    >
      <div>
        {/* Archival Photography Plate */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/80">
          <img
            src={artifact.media.fallbackImagePath}
            alt={artifact.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-card via-transparent to-black/40 pointer-events-none" />

          {/* Top Plate Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            {/* Destination Pill */}
            <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-widest text-stellar-gold uppercase">
              {artifact.destination.toUpperCase()}
            </span>

            {/* Scientific Status Badge */}
            <span
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium tracking-wide border backdrop-blur-md uppercase ${getStatusColor(
                artifact.operationalStatus
              )}`}
            >
              {artifact.statusLabel}
            </span>
          </div>

          {/* Bottom Plate Telemetry */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 z-10 drop-shadow-md">
            <span>{artifact.missionName}</span>
            <span className="text-zinc-400">
              {launchYear} — {endYear}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-4">
          <div>
            <span className="text-[10px] font-mono text-stellar-muted tracking-wider uppercase block mb-1">
              EXPEDITION ARTIFACT // {artifact.targetBody.toUpperCase()}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-stellar-white group-hover:text-stellar-gold transition-colors leading-tight">
              {artifact.name}
            </h3>
          </div>

          {/* Semantic Location Box */}
          <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-stellar-cyan font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-stellar-cyan" />
              <span className="truncate">{artifact.coordinates.semanticLabel}</span>
            </div>
            <div className="text-stellar-muted text-[11px] flex justify-between">
              <span>{artifact.coordinates.coordinateString}</span>
              <span className="text-zinc-500 truncate max-w-[120px]">{artifact.coordinates.landingSiteName}</span>
            </div>
          </div>

          {/* Concise Summary Paragraph */}
          <p className="text-sm text-stellar-gray leading-relaxed line-clamp-3">
            {artifact.summary}
          </p>

          {/* Associated Equipment Highlight (e.g. Apollo 15 LRRR) */}
          {artifact.associatedEquipment && artifact.associatedEquipment.length > 0 && (
            <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono space-y-1">
              <div className="flex items-center justify-between text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <span>ASSOCIATED PASSIVE HARDWARE:</span>
                <span className="text-emerald-300">STILL ACTIVE</span>
              </div>
              <p className="text-stellar-white font-medium text-[11px]">
                {artifact.associatedEquipment[0].name}
              </p>
              <p className="text-[10px] text-zinc-400 leading-normal line-clamp-2">
                {artifact.associatedEquipment[0].operationalNotes}
              </p>
            </div>
          )}

          {/* Key Specs Micro Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-xs">
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">MASS</span>
              <span className="text-stellar-white font-semibold">
                {artifact.specs.massKg.toLocaleString()} kg
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">POWER</span>
              <span className="text-stellar-white font-medium truncate block">
                {artifact.specs.powerSource.split(' ')[0]}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">LIFESPAN</span>
              <span className="text-stellar-gold font-semibold">
                {artifact.specs.actualLifespanDays.toLocaleString()} d
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-2">
        <div className="w-full py-2.5 px-3 rounded-lg bg-white/5 group-hover:bg-stellar-gold group-hover:text-space-black text-stellar-white border border-white/10 group-hover:border-stellar-gold transition-all duration-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between">
          <span>INSPECT EXPEDITION RECORD</span>
          <span className="text-sm font-sans">→</span>
        </div>
      </div>
    </article>
  );
}
