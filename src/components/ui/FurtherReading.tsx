"use client";

import { motion } from "framer-motion";
import { DUR_REVEAL, EASE_SLOW, VIEWPORT_ONCE } from "@/lib/motion";

type Props = {
  href: string;
  title: string;
};

export default function FurtherReading({ href, title }: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DUR_REVEAL, ease: EASE_SLOW }}
      className="group flex flex-col items-center gap-2 self-center border-t border-stone-200 pt-8 text-center"
    >
      <span className="font-wordmark text-[10px] tracking-[0.4em] text-stone-400 uppercase">
        延伸阅读
      </span>
      <span className="font-serif text-base text-stone-500 italic transition-colors duration-500 group-hover:text-stone-700">
        {title}
      </span>
    </motion.a>
  );
}
