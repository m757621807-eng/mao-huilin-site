"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR_CUE } from "@/lib/motion";

export default function ScrollCue() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.45 }}
      transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
    >
      <span className="font-wordmark text-[10px] tracking-[0.4em] text-stone-400">
        SCROLL
      </span>
      <motion.span
        className="h-10 w-px bg-stone-300"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: DUR_CUE, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </motion.div>
  );
}
