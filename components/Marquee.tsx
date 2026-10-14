import { marquee } from "@/lib/content";
import En from "./En";

// Faixa contínua com os temas de atuação, em cápsula creme com letras marinho (a lista é duplicada para o loop não ter emenda).
export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div aria-hidden className="mt-14 rounded-full bg-cream py-4 md:mt-20 md:py-5">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-3">
          {items.map((w, i) => (
            <li
              key={`${w}-${i}`}
              className="whitespace-nowrap rounded-full border border-navy/25 px-6 py-3 text-[0.8rem] tracking-wide text-navy"
            >
              <En>{w}</En>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
