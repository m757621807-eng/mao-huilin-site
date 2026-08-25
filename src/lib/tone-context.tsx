"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type ToneId = "hero" | "about" | "lookai" | "photography" | "contact";

export type ToneWeights = { warm: number; cool: number; violet: number };

// Weights are plain CSS opacity multipliers applied to an already-dim base
// (see AmbientLight), so they must stay within the valid 0–1 opacity range —
// values above 1 would just get clamped to 1 by the browser and lose all
// contrast between "boosted" tones.
//
// The swing between a blob's dimmed and boosted state needs to be wide
// (roughly 3x) to read as a deliberate chapter change rather than getting
// lost in each blob's own continuous ambient drift, which already varies
// its own opacity by ~1.5-2x on its own independent loop.
export const TONE_PRESETS: Record<ToneId, ToneWeights> = {
  hero: { warm: 0.6, cool: 0.5, violet: 0.4 },
  about: { warm: 1.0, cool: 0.35, violet: 0.4 },
  lookai: { warm: 0.35, cool: 1.0, violet: 0.9 },
  photography: { warm: 0.65, cool: 0.65, violet: 0.65 },
  contact: { warm: 1.0, cool: 0.4, violet: 0.45 },
};

type ToneContextValue = {
  activeTone: ToneId;
  setActiveTone: (id: ToneId) => void;
};

const ToneContext = createContext<ToneContextValue | null>(null);

export function ToneProvider({ children }: { children: React.ReactNode }) {
  const [activeTone, setActiveTone] = useState<ToneId>("hero");
  const value = useMemo(() => ({ activeTone, setActiveTone }), [activeTone]);
  return <ToneContext.Provider value={value}>{children}</ToneContext.Provider>;
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
