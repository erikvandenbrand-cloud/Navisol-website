import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
