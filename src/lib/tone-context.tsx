"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type ToneId = "hero" | "about" | "lookai" | "photography" | "contact";

// Two neutral channels only — a warm "light" patch and a true dark "shadow"
// patch — rather than named hues (amber/violet), which read as garish
// "yellow"/"purple" blobs instead of light moving through a room.
export type ToneWeights = { light: number; shadow: number };

// Weights are plain CSS opacity multipliers applied to an already-dim base
// (see AmbientLight), so they must stay within the valid 0–1 opacity range —
// values above 1 would just get clamped to 1 by the browser and lose all
// contrast between "boosted" tones. The swing between a blob's dimmed and
// boosted state stays wide (~3x) so the chapter change reads clearly.
export const TONE_PRESETS: Record<ToneId, ToneWeights> = {
  hero: { light: 0.55, shadow: 0.4 },
  about: { light: 1.0, shadow: 0.3 },
  lookai: { light: 0.35, shadow: 1.0 },
  photography: { light: 0.7, shadow: 0.55 },
  contact: { light: 1.0, shadow: 0.35 },
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
