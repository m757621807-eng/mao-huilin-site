"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DUR_REVEAL_LONG, EASE_SLOW, VIEWPORT_ONCE } from "@/lib/motion";

type Props = {
  className?: string;
  aspect?: string;
  label?: string;
  imgSrc?: string;
};

export default function PlaceholderBlock({
  className,
  aspect = "aspect-[3/4]",
  label,
  imgSrc,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DUR_REVEAL_LONG, ease: EASE_SLOW }}
      className={`flex flex-col gap-3 ${className ?? ""}`}
    >
      <div
        className={`relative overflow-hidden bg-stone-100 shadow-[0_1px_3px_rgba(60,55,50,0.06)] ${aspect}`}
      >
        {imgSrc ? (
          <Image src={imgSrc} alt={label ?? ""} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-stone-200/50" />
        )}
      </div>
      {label && (
        <span className="font-wordmark text-[11px] tracking-[0.3em] text-stone-400">
          No. {label}
        </span>
      )}
    </motion.div>
  );
}
