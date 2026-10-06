import { moments, whatsappHref } from "@/lib/content";
import BgImage from "./BgImage";
import Button from "./Button";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

export default function Moments() {
  return (
    <Section id="formatos" className="bg-paper">
      <Reveal>
        <p className="eyebrow mb-6 text-sage">{moments.eyebrow}</p>
      </Reveal>
      <SplitText
        as="h2"
        text={moments.title}
        highlightClassName="text-sage"
        className="h2 max-w-[18ch] md:max-w-[24ch]"
      />

      <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
        {moments.cards.map((c, i) => {
          const dark = i === 0;
          return (
            <Reveal key={c.tag} delay={i * 0.14}>
              <article
                className={`group relative isolate flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-12 ${
                  dark ? "bg-navy text-paper" : "border border-sage/50 bg-cream text-navy"
                }`}
              >
                <BgImage src={dark ? "/images/moments-1-navy.webp" : "/images/moments-2-cream.webp"} sizes="(min-width: 768px) 650px, 100vw" />
                <p className={`eyebrow max-w-[70%] leading-relaxed md:max-w-[55%] ${dark ? "text-sage-300" : "text-sage"}`}>{c.who}</p>
                <div className="mt-24">
                  <h3 className="font-serif text-[2.2rem] leading-[1.05] tracking-[-0.01em] md:text-[2.8rem]">{c.tag}</h3>
                  <p className={`mt-5 max-w-[28rem] leading-[1.7] ${dark ? "text-paper/80" : "text-navy/75"}`}>{c.body}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-14 flex flex-col items-center gap-8 text-center">
        <p className="max-w-[40rem] text-[1.02rem] leading-[1.7] text-navy/70">{moments.common}</p>
        <Button href={whatsappHref} variant="outline-dark">
          {moments.cta}
        </Button>
      </Reveal>
    </Section>
  );
}
