"use client";

import { motion } from "framer-motion";
import { DUR_HERO, EASE_SLOW } from "@/lib/motion";
import { useToneZone } from "@/lib/tone-context";
import ScrollCue from "@/components/ui/ScrollCue";

export default function Hero() {
  const ref = useToneZone("hero");

  return (
    <section
      ref={ref}
      className="relative flex h-screen flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR_HERO, ease: EASE_SLOW }}
        className="flex flex-col items-center gap-5 text-center"
      >
        <h1 className="font-serif text-4xl font-light tracking-[0.15em] text-stone-600 md:text-5xl">
          毛荟琳
        </h1>
        <div className="h-px w-8 bg-stone-300" />
        <p className="font-wordmark text-xs tracking-[0.5em] text-stone-500 md:text-sm">
          MAO HUILIN
        </p>
      </motion.div>
      <ScrollCue />
    </section>
  );
}
