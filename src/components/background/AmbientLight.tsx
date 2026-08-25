"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useActiveTone, TONE_PRESETS } from "@/lib/tone-context";

type Blob = {
  className: string;
  gradient: string;
  duration: number;
  drift: { x: number[]; y: number[] };
  breathe: number[];
  scrollRange: [number, number];
  // Shadows read as a hush behind the light, never louder than it —
  // dimmed relative to the section's tone weight instead of matching it.
  weightScale: number;
};

// One hue family, two depths: a pale misty blue for light and a dusk-deep
// version of the same blue for shadow, so they read as one quiet light
// source with its own shade rather than two competing colors. Needs real
// distance from the page background (#fdfcfa / 253,252,250) to be visible
// once blurred and dimmed — a near-white blue reads as nothing at all.
const LIGHT = "205,218,233";
const SHADOW = "150,166,190";

const blobs: Blob[] = [
  {
    className: "left-[-12%] top-[-18%] h-[78vw] w-[78vw]",
    gradient: `radial-gradient(circle, rgba(${LIGHT},0.48) 0%, rgba(${LIGHT},0) 70%)`,
    duration: 150,
    drift: { x: [0, 35, 55, -20, -40, 0], y: [0, 40, 10, 60, 20, 0] },
    breathe: [1, 1.06, 0.97, 1.04, 1],
    scrollRange: [-60, 40],
    weightScale: 1,
  },
  {
    className: "right-[-22%] bottom-[-18%] h-[68vw] w-[68vw]",
    gradient: `radial-gradient(circle, rgba(${LIGHT},0.32) 0%, rgba(${LIGHT},0) 70%)`,
    duration: 185,
    drift: { x: [0, -30, -50, 25, 15, 0], y: [0, -35, 15, -20, -50, 0] },
    breathe: [1, 0.95, 1.05, 0.98, 1],
    scrollRange: [50, -70],
    weightScale: 1,
  },
  {
    // A slower, softer shadow drifting on its own path so the light and its
    // shade separate and re-merge as you scroll — the "flow" is in how they
    // move apart, not just that each one moves.
    className: "left-[15%] top-[30%] h-[55vw] w-[55vw]",
    gradient: `radial-gradient(circle, rgba(${SHADOW},0.28) 0%, rgba(${SHADOW},0) 72%)`,
    duration: 220,
    drift: { x: [0, -25, 30, -15, 20, 0], y: [0, 25, -20, 30, -10, 0] },
    breathe: [1, 1.08, 0.94, 1.03, 1],
    scrollRange: [-30, 55],
    weightScale: 0.55,
  },
];

export default function AmbientLight() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const activeTone = useActiveTone();
  const toneWeight = TONE_PRESETS[activeTone];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white"
    >
      {blobs.map((blob, i) => (
        <BlobLayer
          key={i}
          blob={blob}
          scrollYProgress={scrollYProgress}
          reduced={!!prefersReducedMotion}
          toneWeight={toneWeight}
        />
      ))}
    </div>
  );
}

function BlobLayer({
  blob,
  scrollYProgress,
  reduced,
  toneWeight,
}: {
  blob: Blob;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
  toneWeight: number;
}) {
  const scrollY = useTransform(scrollYProgress, [0, 1], blob.scrollRange);
  const target = toneWeight * blob.weightScale;
  const toneOpacity = useMotionValue(target);

  useEffect(() => {
    const controls = animate(toneOpacity, target, {
      duration: reduced ? 0.3 : 6,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [target, reduced, toneOpacity]);

  return (
    <motion.div
      className={`absolute ${blob.className}`}
      style={{ y: reduced ? 0 : scrollY }}
    >
      <motion.div style={{ opacity: toneOpacity }}>
        <motion.div
          className="h-full w-full rounded-full blur-3xl will-change-transform"
          style={{ background: blob.gradient }}
          animate={
            reduced
              ? undefined
              : { x: blob.drift.x, y: blob.drift.y, scale: blob.breathe }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />
      </motion.div>
    </motion.div>
  );
}
