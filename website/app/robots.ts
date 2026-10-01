import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

export const dynamic = "force-static";

// Search engines AND AI crawlers allowed. Only utility routes and template demos are blocked.
export default function robots(): MetadataRoute.Robots {
  const block = ["/api/", "/thank-you", "/search", "/bold", "/calm"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: block },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/", disallow: block },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
