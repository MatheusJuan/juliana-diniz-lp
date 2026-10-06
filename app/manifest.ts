import type { MetadataRoute } from "next";
import { SEO, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Juliana Diniz",
    description: SEO.description,
    start_url: "/",
    display: "browser",
    lang: "pt-BR",
    background_color: "#0f293f",
    theme_color: "#0f293f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
