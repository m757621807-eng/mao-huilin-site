"use client";

import PlaceholderBlock from "@/components/ui/PlaceholderBlock";
import SectionKicker from "@/components/ui/SectionKicker";
import { useToneZone } from "@/lib/tone-context";

export default function Photography() {
  const ref = useToneZone("photography");

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-20 md:py-40">
      <div className="mb-16 flex justify-center md:mb-24">
        <SectionKicker>Works</SectionKicker>
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-32">
        <PlaceholderBlock
          label="01"
          aspect="aspect-[3/4]"
          imgSrc="/photography/01.jpg"
          className="col-span-12 md:col-span-5 md:col-start-2"
        />
        <PlaceholderBlock
          label="02"
          aspect="aspect-[2/3]"
          imgSrc="/photography/02.jpg"
          className="col-span-12 md:col-span-4 md:col-start-8 md:mt-24"
        />
        <PlaceholderBlock
          label="03"
          aspect="aspect-[4/5]"
          imgSrc="/photography/03.jpg"
          className="col-span-12 md:col-span-6 md:col-start-3"
        />
        <PlaceholderBlock
          label="04"
          aspect="aspect-[3/4]"
          imgSrc="/photography/04.jpg"
          className="col-span-12 md:col-span-3 md:col-start-9 md:-mt-16"
        />
        <PlaceholderBlock
          label="05"
          aspect="aspect-[3/2]"
          imgSrc="/photography/06.jpg"
          className="col-span-12 md:col-span-8 md:col-start-2"
        />
        <PlaceholderBlock
          label="06"
          aspect="aspect-[2/3]"
          imgSrc="/photography/05.jpg"
          className="col-span-12 md:col-span-4 md:col-start-7 md:mt-32"
        />
      </div>
    </section>
  );
}
