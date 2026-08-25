"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type ToneId = "hero" | "about" | "lookai" | "photography" | "contact";

export type ToneWeights = { warm: number; cool: number; violet: number };

// Weights are plain CSS opacity multipliers applied to an already-dim base
// (see AmbientLight), so they must stay within the valid 0–1 opacity range —
// values above 1 would just get clamped to 1 by the browser and lose all
// contrast between "boosted" tones.
export const TONE_PRESETS: Record<ToneId, ToneWeights> = {
  hero: { warm: 0.85, cool: 0.75, violet: 0.65 },
  about: { warm: 1.0, cool: 0.55, violet: 0.7 },
  lookai: { warm: 0.55, cool: 1.0, violet: 0.95 },
  photography: { warm: 0.8, cool: 0.8, violet: 0.8 },
  contact: { warm: 1.0, cool: 0.6, violet: 0.7 },
};

type ToneContextValue = {
  activeTone: ToneId;
  setActiveTone: (id: ToneId) => void;
};

const ToneContext = createContext<ToneContextValue | null>(null);

export function ToneProvider({ children }: { children: React.ReactNode }) {
  const [activeTone, setActiveTone] = useState<ToneId>("hero");
  return (
    <ToneContext.Provider value={{ activeTone, setActiveTone }}>
      {children}
    </ToneContext.Provider>
  );
}

export function useActiveTone(): ToneId {
  const ctx = useContext(ToneContext);
  return ctx?.activeTone ?? "hero";
}

// Attach the returned ref to a section's outer element. When that section
// crosses the vertical center of the viewport, it becomes the "active"
// chapter and the ambient light slowly shifts toward its tone preset.
export function useToneZone(id: ToneId) {
  const ref = useRef<HTMLElement | null>(null);
  const ctx = useContext(ToneContext);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) ctx?.setActiveTone(id);
  }, [inView, id, ctx]);

  return ref;
}
