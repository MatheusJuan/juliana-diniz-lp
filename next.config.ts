import type { NextConfig } from "next";
import { INDEXABLE, SITE_HOST } from "./lib/site";

const isProd = process.env.NODE_ENV === "production";
// Microsoft Clarity (análise, só roda após o aceite do visitante): libera os domínios dele na CSP quando houver ID.
const clarity = process.env.NEXT_PUBLIC_CLARITY_ID ? " https://www.clarity.ms https://scripts.clarity.ms" : "";
const clarityData = process.env.NEXT_PUBLIC_CLARITY_ID ? " https://*.clarity.ms https://c.bing.com" : "";

// CSP só em produção (em dev o React precisa de eval e do websocket do HMR).
// 'unsafe-inline' em script-src e style-src é necessário: o Next injeta scripts inline de hidratação e o
// React/Motion renderizam atributos style no HTML. (SRI experimental foi testado e bloqueia a hidratação.)
// Para endurecer: nonce via proxy.ts, o que exige renderização dinâmica (perde a página estática).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${clarity}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${clarityData}`,
  "font-src 'self'",
  `connect-src 'self'${clarityData}`,
  "media-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), browsing-topics=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
  // Staging: impede indexação mesmo se alguém linkar o ambiente.
  ...(INDEXABLE ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // HTTP → HTTPS atrás de proxy/CDN que envia x-forwarded-proto (a hospedagem também deve forçar).
      {
        source: "/:path*",
        has: [
          { type: "header", key: "x-forwarded-proto", value: "http" },
          { type: "host", value: "(?<host>.*)" },
        ],
        destination: "https://:host/:path*",
        permanent: true,
      },
      // www → domínio sem www (evita conteúdo duplicado).
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${SITE_HOST}` }],
        destination: `https://${SITE_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
