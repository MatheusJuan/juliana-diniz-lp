import type { MetadataRoute } from "next";
import { LAST_MODIFIED, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/politica-de-privacidade`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
