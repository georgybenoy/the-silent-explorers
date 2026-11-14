import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { Destination, Artifact } from '../types/artifact';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ambientAudio, type AudioState } from '../services/ambientAudio';
import { matchesDestination } from '../utils/destination';
import artifactsData from '../data/artifacts.json';

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
  audioState: AudioState;
  toggleAudio: () => Promise<void>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isReducedMotion: boolean;
  scrollToChapter: (chapterId: number) => void;
  selectArtifact: (artifactId: string | null) => void;
  isNavigatingChapterRef: React.MutableRefObject<boolean>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [activeDestination, setActiveDestinationState] = useState<Destination | 'All'>('All');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [isCitationsOpen, setIsCitationsOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [audioState, setAudioState] = useState<AudioState>(ambientAudio.getState());
  
  const isReducedMotion = useReducedMotion();
  const isNavigatingChapterRef = useRef<boolean>(false);
  const navLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Subscribe to ambient audio state changes
  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((state) => {
      setAudioState(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleAudio = useCallback(async () => {
    await ambientAudio.toggle();
  }, []);

  const setIsAudioMuted = useCallback((muted: boolean) => {
    if (muted) {
      ambientAudio.stop();
    } else {
      ambientAudio.play();
    }
  }, []);

  const isAudioMuted = audioState !== 'on';

  // Set active destination with type safety, normalization, and stale modal dismissal
  const setActiveDestination = useCallback((dest: Destination | 'All') => {
    setActiveDestinationState(dest);

    // If an artifact detail modal is open for an artifact not in the new destination, close it
    if (dest !== 'All' && selectedArtifactId) {
      const all = artifactsData as Artifact[];
      const activeArt = all.find((a) => a.artifactId === selectedArtifactId);
      if (activeArt && !matchesDestination(activeArt.destination, dest)) {
        setSelectedArtifactId(null);
      }
    }
  }, [selectedArtifactId]);

  // Smooth or direct scroll to chapter container with programmatic navigation lock
  const scrollToChapter = useCallback((chapterId: number) => {
    setActiveChapterId(chapterId);
    setIsMobileMenuOpen(false);

    // Lock programmatic navigation so scroll listeners don't overwrite the intended target
    isNavigatingChapterRef.current = true;
    if (navLockTimeoutRef.current) {
      clearTimeout(navLockTimeoutRef.current);
    }
    navLockTimeoutRef.current = setTimeout(() => {
      isNavigatingChapterRef.current = false;
    }, 1000);

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
    audioState,
    toggleAudio,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isReducedMotion,
    scrollToChapter,
    selectArtifact,
    isNavigatingChapterRef,
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
