"use client";

import { motion } from "framer-motion";
import { DUR_REVEAL, EASE_SLOW, VIEWPORT_ONCE } from "@/lib/motion";

export default function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DUR_REVEAL, ease: EASE_SLOW }}
      className="font-wordmark text-[11px] tracking-[0.5em] text-stone-400 uppercase"
    >
      {children}
    </motion.span>
  );
}
