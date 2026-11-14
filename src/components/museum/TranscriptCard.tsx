import type { HistoricalRecord } from '../../types/artifact';

interface TranscriptCardProps {
  record: HistoricalRecord;
  className?: string;
}

export function TranscriptCard({ record, className = '' }: TranscriptCardProps) {
  const isAirToGround = record.sourceType === 'air_to_ground';
  const isGroundCommand = record.sourceType === 'ground_command';
  const isTelemetryLog = record.sourceType === 'telemetry_log';
  const isHumanSpoken = isAirToGround || record.sourceType === 'mission_report';

  const getTypeLabel = () => {
    switch (record.sourceType) {
      case 'air_to_ground':
        return 'HUMAN RADIO TRANSMISSION';
      case 'ground_command':
        return 'GROUND COMMAND SEQUENCE';
      case 'telemetry_log':
        return 'ENGINEERING TELEMETRY LOG';
      case 'mission_report':
      default:
        return 'OFFICIAL MISSION BRIEFING';
    }
  };

  return (
    <div
      className={`rounded-lg p-4 sm:p-5 border bg-black/60 backdrop-blur-sm space-y-3 font-mono text-xs ${
        isAirToGround
          ? 'border-stellar-gold/30 shadow-[0_0_15px_rgba(232,154,60,0.08)]'
          : isGroundCommand
          ? 'border-stellar-cyan/30 shadow-[0_0_15px_rgba(56,189,248,0.08)]'
          : isTelemetryLog
          ? 'border-white/15'
          : 'border-white/10'
      } ${className}`}
    >
      {/* Header telemetry strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 text-[11px]">
        <div className="flex items-center space-x-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isAirToGround
                ? 'bg-stellar-gold animate-pulse'
                : isGroundCommand
                ? 'bg-stellar-cyan animate-pulse'
                : 'bg-zinc-400'
            }`}
          />
          <span className="font-bold uppercase tracking-wider text-stellar-white">
            {getTypeLabel()}
          </span>
          {record.sol !== undefined && (
            <span className="text-stellar-amber font-semibold">
              // SOL {record.sol}
            </span>
          )}
        </div>

        <div className="text-zinc-500 text-[10px]">
          UTC: {record.timestampUtc}
        </div>
      </div>

      {/* Content: Distinguish verbatim spoken dialogue from technical telemetry log entries */}
      {isHumanSpoken ? (
        <blockquote className="text-stellar-white text-sm sm:text-base italic leading-relaxed pl-3 border-l-2 border-stellar-gold/60 font-sans">
          "{record.content}"
        </blockquote>
      ) : (
        <div className="text-stellar-white text-xs sm:text-sm font-mono leading-relaxed pl-3 border-l-2 border-stellar-cyan/60 bg-white/[0.03] p-3 rounded">
          <span className="text-stellar-muted text-[10px] uppercase block mb-1 font-bold tracking-wider">
            DOCUMENTED RECORD / TELEMETRY STATUS:
          </span>
          {record.content}
        </div>
      )}

      {/* Speaker and Context Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-stellar-muted border-t border-white/5">
        <div>
          <span className="text-zinc-400 font-semibold">
            {isHumanSpoken ? 'RECORDED SPEAKER:' : 'REPORTING FACILITY:'}
          </span>{' '}
          <span className="text-stellar-white">{record.speakerOrTransmitter}</span>
        </div>

        {record.citationUrl && (
          <a
            href={record.citationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stellar-cyan hover:underline flex items-center space-x-1 font-medium"
          >
            <span>VERIFY ARCHIVAL RECORD ↗</span>
          </a>
        )}
      </div>

      {/* Historical Context Note */}
      {record.historicalContext && (
        <p className="text-[11px] text-zinc-400 leading-normal bg-white/5 p-2 rounded">
          <span className="text-stellar-muted font-bold">MISSION CONTEXT:</span>{' '}
          {record.historicalContext}
        </p>
      )}
    </div>
  );
}
