import React, { createContext, useContext, useState, useEffect } from 'react';

export type QualityTier = 'high' | 'medium' | 'low';

interface WebGLContextType {
  isWebGLSupported: boolean;
  qualityTier: QualityTier;
  setQualityTier: (tier: QualityTier) => void;
  is3DEnabled: boolean;
  setIs3DEnabled: (enabled: boolean) => void;
}

const WebGLContext = createContext<WebGLContextType | undefined>(undefined);

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl && gl instanceof WebGLRenderingContext);
  } catch {
    return false;
  }
}

function detectDefaultQuality(): QualityTier {
  if (typeof window === 'undefined') return 'medium';
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) return 'low';
  if ((memory && memory < 4) || cores < 4) return 'medium';
  return 'high';
}

export const WebGLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);
  const [qualityTier, setQualityTier] = useState<QualityTier>('high');
  const [is3DEnabled, setIs3DEnabled] = useState<boolean>(true);

  useEffect(() => {
    const supported = detectWebGL();
    setIsWebGLSupported(supported);
    if (!supported) {
      setIs3DEnabled(false);
    } else {
      setQualityTier(detectDefaultQuality());
    }
  }, []);

  return (
    <WebGLContext.Provider
      value={{
        isWebGLSupported,
        qualityTier,
        setQualityTier,
        is3DEnabled,
        setIs3DEnabled,
      }}
    >
      {children}
    </WebGLContext.Provider>
  );
};

export function useWebGL(): WebGLContextType {
  const context = useContext(WebGLContext);
  if (!context) {
    return {
      isWebGLSupported: true,
      qualityTier: 'high',
      setQualityTier: () => {},
      is3DEnabled: true,
      setIs3DEnabled: () => {},
    };
  }
  return context;
}
