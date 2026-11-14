import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import chaptersData from '../../data/chapters.json';
import type { Chapter } from '../../types/chapter';

export const ChapterProgress: React.FC = () => {
  const { activeChapterId, scrollToChapter } = useNavigation();
  const chapters: Chapter[] = chaptersData as Chapter[];
  const currentChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

  return (
    <div className="flex items-center space-x-3 text-xs font-mono">
      {/* Current Chapter Tag */}
      <div className="hidden xl:flex items-center space-x-2 text-stellar-muted">
        <span className="text-stellar-gold font-bold">{currentChapter.romanNumeral}</span>
        <span>/</span>
        <span className="truncate max-w-[150px] text-stellar-white font-medium uppercase tracking-wider">
          {currentChapter.title}
        </span>
      </div>

      {/* Stepped Segments Indicator */}
      <nav aria-label="Chapter progress navigation" className="flex items-center space-x-1.5">
        {chapters.map((ch) => {
          const isActive = ch.id === activeChapterId;
          const isPassed = ch.id < activeChapterId;

          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className={`group relative flex items-center justify-center p-1 rounded focus-visible:ring-1 focus-visible:ring-stellar-gold transition-all ${
                isActive ? 'scale-110' : 'hover:scale-105'
              }`}
              aria-label={`Navigate to Chapter ${ch.romanNumeral}: ${ch.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Visual Segment Bar/Dot */}
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-stellar-gold shadow-[0_0_8px_rgba(232,154,60,0.6)]'
                    : isPassed
                    ? 'w-2 bg-white/40 hover:bg-white/70'
                    : 'w-2 bg-white/10 hover:bg-white/30'
                }`}
              />

              {/* Tooltip on Hover */}
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-space-card/95 px-2 py-0.5 text-[10px] font-mono text-stellar-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl">
                {ch.romanNumeral}. {ch.title}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
