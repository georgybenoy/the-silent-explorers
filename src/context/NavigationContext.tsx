import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Destination } from '../types/artifact';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NavigationContextType {
  activeChapterId: number;
  setActiveChapterId: (id: number) => void;
  activeDestination: Destination | 'All';
  setActiveDestination: (dest: Destination | 'All') => void;
  selectedArtifactId: string | null;
  setSelectedArtifactId: (id: string | null) => void;
  isCitationsOpen: boolean;
  setIsCitationsOpen: (open: boolean) => void;
  isAudioMuted: boolean;
  setIsAudioMuted: (muted: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isReducedMotion: boolean;
  scrollToChapter: (chapterId: number) => void;
  selectArtifact: (artifactId: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [activeDestination, setActiveDestination] = useState<Destination | 'All'>('All');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [isCitationsOpen, setIsCitationsOpen] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isReducedMotion = useReducedMotion();

  // Smooth or direct scroll to chapter container
  const scrollToChapter = useCallback((chapterId: number) => {
    setActiveChapterId(chapterId);
    setIsMobileMenuOpen(false);

    const targetElement = document.getElementById(`chapter-${chapterId}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: isReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, [isReducedMotion]);

  // Select an artifact and optionally scroll to museum chapter (Chapter 4)
  const selectArtifact = useCallback((artifactId: string | null) => {
    setSelectedArtifactId(artifactId);
    if (artifactId) {
      // Find element or open detail modal
      const artifactElement = document.getElementById(`artifact-${artifactId}`);
      if (artifactElement) {
        artifactElement.scrollIntoView({
          behavior: isReducedMotion ? 'auto' : 'smooth',
          block: 'center',
        });
      }
    }
  }, [isReducedMotion]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when citations drawer or mobile menu is open
  useEffect(() => {
    if (isCitationsOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCitationsOpen, isMobileMenuOpen]);

  const value: NavigationContextType = {
    activeChapterId,
    setActiveChapterId,
    activeDestination,
    setActiveDestination,
    selectedArtifactId,
    setSelectedArtifactId,
    isCitationsOpen,
    setIsCitationsOpen,
    isAudioMuted,
    setIsAudioMuted,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isReducedMotion,
    scrollToChapter,
    selectArtifact,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
