import { MetadataRoute } from "next";
import { getExtraPageSlugs } from "@/sanity/pages";

// Dynamisch, zodat nieuwe landingspagina's direct in de sitemap komen. De
// Sanity-aanvraag zelf wordt 60 seconden gecachet (zie getExtraPageSlugs).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.navisol.nl";
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, freq: "monthly" as const },
    { path: "/custom-yacht-building", priority: 0.9, freq: "monthly" as const },
    { path: "/design-build-partner", priority: 0.9, freq: "monthly" as const },
    { path: "/our-work", priority: 0.85, freq: "monthly" as const },
    { path: "/about", priority: 0.7, freq: "yearly" as const },
    { path: "/contact", priority: 0.7, freq: "yearly" as const },
  ];

  // Landingspagina's uit Sanity
  const extra = (await getExtraPageSlugs()).map((slug) => ({
    path: `/${slug}`,
    priority: 0.6,
    freq: "monthly" as const,
  }));

  return [...routes, ...extra].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
