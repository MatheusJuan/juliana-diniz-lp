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
      <div className="grid gap-y-8 lg:gap-y-12">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 text-navy/60">{pillars.eyebrow}</p>
          </Reveal>
          <SplitText as="h2" text={pillars.title} className="h2" />
        </div>

        {/* Texto de apoio e os dois cards na mesma linha (3 colunas); o texto tem o mesmo respiro dos cards para alinhar o topo. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0.2} className="border-navy/10 sm:col-span-2 lg:col-span-1 lg:border-r">
            <div className="pb-2 lg:py-10 lg:pr-8">
              <span className="block h-px w-14 bg-sage" />
              <p className="lead mt-8 max-w-[22rem] text-navy/75">{pillars.lead}</p>
            </div>
          </Reveal>

          {pillars.items.map((p, i) => (
            <Reveal
              key={p.title}
              delay={0.3 + i * 0.1}
              className={`border-navy/10 ${i === 0 ? "sm:border-r" : ""}`}
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
