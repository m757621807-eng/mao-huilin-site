"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type ToneId = "hero" | "about" | "lookai" | "photography" | "contact";

// Single channel: how present the blue light is in this chapter.
// Values are plain CSS opacity multipliers (see AmbientLight), so they must
// stay within 0–1 — anything above 1 just clamps to 1 and loses contrast.
// Kept under ~0.8 everywhere so the light stays soft and hushed rather than
// asserting itself, even in LOOK AI where it's most present.
export const TONE_PRESETS: Record<ToneId, number> = {
  hero: 0.38,
  about: 0.26,
  lookai: 0.78,
  photography: 0.48,
  contact: 0.3,
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
