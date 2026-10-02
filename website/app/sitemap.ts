import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { categories } from "@/lib/categories";
import { listings, isIndexable } from "@/lib/directory";

export const dynamic = "force-static";

// Mirrors the page tree. Left out on purpose: /thank-you, legal pages, /search,
// and category pages too thin to index (fewer than site.minListingsToIndex listings).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "/categories", "/add-business", "/get-matched", "/advertise", "/community", "/about", "/contact"];
  return [
    ...core.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...categories.filter((c) => isIndexable(c.slug)).map((c) => ({ url: `${site.url}/category/${c.slug}`, lastModified: now, priority: 0.8 })),
    ...listings.map((l) => ({ url: `${site.url}/business/${l.slug}`, lastModified: now, priority: l.tier === "premium" ? 0.7 : 0.6 })),
  ];
}
