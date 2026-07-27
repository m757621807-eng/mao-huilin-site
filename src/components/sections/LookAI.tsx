import RevealParagraph from "@/components/ui/RevealParagraph";
import SectionKicker from "@/components/ui/SectionKicker";
import { DUR_REVEAL_LONG } from "@/lib/motion";
import { lookaiParagraphs } from "@/content/lookai";

export default function LookAI() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-48 md:gap-24">
      <div className="flex justify-center">
        <SectionKicker>Look AI</SectionKicker>
      </div>
      {lookaiParagraphs.map((paragraph, i) => (
        <RevealParagraph
          key={i}
          duration={DUR_REVEAL_LONG}
          className="font-serif text-lg leading-loose text-stone-700 md:text-xl"
        >
          {paragraph}
        </RevealParagraph>
      ))}
    </section>
  );
}
