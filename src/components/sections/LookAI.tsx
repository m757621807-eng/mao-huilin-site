import RevealParagraph from "@/components/ui/RevealParagraph";
import SectionKicker from "@/components/ui/SectionKicker";
import FurtherReading from "@/components/ui/FurtherReading";
import { DUR_REVEAL_LONG } from "@/lib/motion";
import { lookaiParagraphs } from "@/content/lookai";

const DECISION_READING_INDEX = lookaiParagraphs.indexOf("于是我开始读决策。");

export default function LookAI() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-48 md:gap-24">
      <div className="flex justify-center">
        <SectionKicker>Look AI</SectionKicker>
      </div>
      {lookaiParagraphs.map((paragraph, i) => (
        <span key={i} className="contents">
          <RevealParagraph
            duration={DUR_REVEAL_LONG}
            className="font-serif text-lg leading-loose text-stone-700 md:text-xl"
          >
            {paragraph}
          </RevealParagraph>
          {i === DECISION_READING_INDEX && (
            <FurtherReading
              href="/papers/designing-for-decisions.pdf"
              title="Designing for Decisions: Overcoming Choice Paralysis in Human-Centered AI"
            />
          )}
        </span>
      ))}
    </section>
  );
}
