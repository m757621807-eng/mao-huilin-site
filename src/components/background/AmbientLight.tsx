"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Blob = {
  className: string;
  gradient: string;
  duration: number;
  drift: { x: number[]; y: number[]; opacity: number[] };
  scrollRange: [number, number];
};

const blobs: Blob[] = [
  {
    className: "left-[-10%] top-[-10%] h-[70vw] w-[70vw]",
    gradient:
      "radial-gradient(circle, rgba(255,250,240,0.65) 0%, rgba(255,250,240,0) 70%)",
    duration: 58,
    drift: { x: [0, 40, -20, 0], y: [0, 30, 60, 0], opacity: [0.25, 0.4, 0.2, 0.25] },
    scrollRange: [-60, 40],
  },
  {
    className: "right-[-15%] top-[20%] h-[60vw] w-[60vw]",
    gradient:
      "radial-gradient(circle, rgba(235,240,245,0.6) 0%, rgba(235,240,245,0) 70%)",
    duration: 73,
    drift: { x: [0, -30, 20, 0], y: [0, 50, -30, 0], opacity: [0.2, 0.35, 0.18, 0.2] },
    scrollRange: [50, -70],
  },
  {
    className: "left-[10%] bottom-[-10%] h-[65vw] w-[65vw]",
    gradient:
      "radial-gradient(circle, rgba(250,245,255,0.55) 0%, rgba(250,245,255,0) 70%)",
    duration: 85,
    drift: { x: [0, 25, -35, 0], y: [0, -40, 20, 0], opacity: [0.18, 0.3, 0.22, 0.18] },
    scrollRange: [-40, 60],
  },
];

export default function AmbientLight() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

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
        />
      ))}
    </div>
  );
}

function BlobLayer({
  blob,
  scrollYProgress,
  reduced,
}: {
  blob: Blob;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const scrollY = useTransform(scrollYProgress, [0, 1], blob.scrollRange);

  return (
    <motion.div
      className={`absolute ${blob.className}`}
      style={{ y: reduced ? 0 : scrollY }}
    >
      <motion.div
        className="h-full w-full rounded-full blur-3xl will-change-transform"
        style={{ background: blob.gradient }}
        animate={
          reduced
            ? { opacity: blob.drift.opacity[0] }
            : { x: blob.drift.x, y: blob.drift.y, opacity: blob.drift.opacity }
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
  );
}
