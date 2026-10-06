import Image from "next/image";
import { pillars } from "@/lib/content";
import BgImage from "./BgImage";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

export default function Pillars() {
  return (
    <Section id="jeito" className="isolate bg-cream">
      <BgImage src="/images/pillars-bg.webp" sizes="100vw" className="hidden md:block" />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 text-navy/60">{pillars.eyebrow}</p>
          </Reveal>
          <SplitText
            as="h2"
            text={pillars.title}
            highlightClassName="text-sage"
            className="h2 max-w-[12ch] md:max-w-[18ch]"
          />
          <Reveal delay={0.2}>
            <span className="mt-8 block h-px w-14 bg-sage" />
            <p className="lead mt-8 max-w-[22rem] text-navy/75">{pillars.lead}</p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:col-span-7">
          {pillars.items.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.1}
              className="border-navy/10 sm:odd:border-r sm:[&:nth-child(n+3)]:border-t"
            >
              <article className="group h-full px-0 py-8 sm:px-8 md:py-10">
                <div className="flex items-start justify-between">
                  <Image
                    src={`/icons/navy/${p.icon}.png`}
                    alt=""
                    width={72}
                    height={72}
                    className="h-16 w-16 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-6 font-serif text-[1.9rem] leading-tight">{p.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-navy/70">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
