"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type ToneId = "hero" | "about" | "lookai" | "photography" | "contact";

// Single channel: how present the blue light is in this chapter.
// Values are plain CSS opacity multipliers (see AmbientLight), so they must
// stay within 0–1 — anything above 1 just clamps to 1 and loses contrast.
export const TONE_PRESETS: Record<ToneId, number> = {
  hero: 0.5,
  about: 0.35,
  lookai: 1.0,
  photography: 0.6,
  contact: 0.4,
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
