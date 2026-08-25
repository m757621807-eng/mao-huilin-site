"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageEntrance() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.4 : 2.4, delay: reduced ? 0 : 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}
