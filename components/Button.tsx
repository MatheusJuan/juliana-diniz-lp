"use client";

import type { ReactNode } from "react";
import { whatsappHref } from "@/lib/content";
import { openWhatsApp } from "./WhatsAppModal";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`h-5 w-5 ${className}`} aria-hidden>
      <path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-dark";
  className?: string;
};

const variants = {
  primary: "bg-sage-600 text-paper hover:bg-sage",
  outline: "border border-paper/70 text-paper hover:bg-paper hover:text-navy",
  "outline-dark": "border border-navy/60 text-navy hover:bg-navy hover:text-paper",
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={href === whatsappHref ? openWhatsApp : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-7 py-4 text-[0.74rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
