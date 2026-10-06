import type { ReactNode } from "react";

// Seções empilham como cartões: cada uma sobe sobre a anterior com o topo arredondado.
export default function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative -mt-10 rounded-t-[2.5rem] pb-32 pt-24 md:-mt-14 md:rounded-t-[3.5rem] md:pb-44 md:pt-36 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-12">{children}</div>
    </section>
  );
}

export function Placeholder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed border-current px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] opacity-60 ${className}`}
    >
      {children}
    </span>
  );
}
