"use client";

import RevealParagraph from "@/components/ui/RevealParagraph";
import SectionKicker from "@/components/ui/SectionKicker";
import { useToneZone } from "@/lib/tone-context";
import { aboutParagraphs } from "@/content/about";

export default function About() {
  const ref = useToneZone("about");

  return (
    <section
      ref={ref}
      className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-16 px-6 py-32 md:gap-20"
    >
      <SectionKicker>About</SectionKicker>
      {aboutParagraphs.map((paragraph, i) => (
        <RevealParagraph
          key={i}
          className="text-center font-serif text-lg leading-loose text-stone-500 md:text-xl"
        >
          {paragraph}
        </RevealParagraph>
      ))}
    </section>
  );
}
