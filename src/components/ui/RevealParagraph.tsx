"use client";

import { motion } from "framer-motion";
import { DUR_REVEAL, EASE_SLOW, VIEWPORT_ONCE } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
};

export default function RevealParagraph({
  children,
  className,
  duration = DUR_REVEAL,
  delay = 0.1,
}: Props) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, ease: EASE_SLOW, delay }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
