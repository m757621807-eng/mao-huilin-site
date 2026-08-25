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
  scrollRange: [number, number];
};

// A single soft blue-grey light, nothing else. Needs real distance from the
// page background (#fdfcfa / 253,252,250) to be visible once blurred and
// dimmed — a near-white blue reads as nothing at all.
const blobs: Blob[] = [
  {
    className: "left-[-10%] top-[-15%] h-[75vw] w-[75vw]",
    gradient:
      "radial-gradient(circle, rgba(196,215,236,0.75) 0%, rgba(196,215,236,0) 70%)",
    duration: 62,
    drift: { x: [0, 45, -25, 0], y: [0, 35, 65, 0] },
    scrollRange: [-60, 40],
  },
  {
    className: "right-[-20%] bottom-[-15%] h-[65vw] w-[65vw]",
    gradient:
      "radial-gradient(circle, rgba(196,215,236,0.55) 0%, rgba(196,215,236,0) 70%)",
    duration: 78,
    drift: { x: [0, -35, 25, 0], y: [0, -30, 40, 0] },
    scrollRange: [50, -70],
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
  const toneOpacity = useMotionValue(toneWeight);

  useEffect(() => {
    const controls = animate(toneOpacity, toneWeight, {
      duration: reduced ? 0.3 : 3.5,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [toneWeight, reduced, toneOpacity]);

  return (
    <motion.div
      className={`absolute ${blob.className}`}
      style={{ y: reduced ? 0 : scrollY }}
    >
      <motion.div style={{ opacity: toneOpacity }}>
        <motion.div
          className="h-full w-full rounded-full blur-3xl will-change-transform"
          style={{ background: blob.gradient }}
          animate={reduced ? undefined : { x: blob.drift.x, y: blob.drift.y }}
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
