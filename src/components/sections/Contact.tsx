"use client";

import { motion } from "framer-motion";
import { DUR_CONTACT, EASE_SLOW, VIEWPORT_ONCE } from "@/lib/motion";
import { contact } from "@/content/contact";

export default function Contact() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DUR_CONTACT, ease: EASE_SLOW }}
        className="flex flex-col items-center gap-7"
      >
        <p className="font-serif text-lg text-stone-700">{contact.thanks}</p>
        <div className="h-px w-8 bg-stone-300" />
        <a
          href={contact.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-wordmark text-xs tracking-[0.35em] text-stone-500 uppercase transition-colors duration-500 hover:text-stone-900 md:text-sm"
        >
          {contact.wordmark}
        </a>
        <div className="mt-2 flex flex-col items-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="font-wordmark text-sm tracking-wide text-stone-500 transition-colors duration-500 hover:text-stone-900"
          >
            {contact.email}
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-wordmark text-sm tracking-wide text-stone-500 transition-colors duration-500 hover:text-stone-900"
          >
            @{contact.instagramHandle}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
