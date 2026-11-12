import { createClient } from "next-sanity";
import { buildLegacyPages } from "@/lib/legacy-pages";
import { content } from "@/lib/content";
import { apiVersion, dataset, projectId } from "./env";

export const REVALIDATE_SECONDS = 60;

export type Section = { _type: string; _key: string; [field: string]: unknown };

export type PageDoc = {
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: Section[];
};

/** Vaste pagina's die ook zonder Sanity bestaan (terugval uit content.ts). */
const legacyPages = buildLegacyPages(content) as unknown as Record<string, PageDoc>;

function sanityClient() {
  return createClient({ projectId, dataset, apiVersion, useCdn: true });
}

/**
 * Pagina uit Sanity; bestaat die niet (of Sanity is onbereikbaar), dan de
 * vaste versie uit content.ts. Voor een nieuwe landingspagina is er geen
 * terugval: onbekend adres geeft null.
 */
export async function getPage(slug: string): Promise<PageDoc | null> {
  try {
    const doc = await sanityClient().fetch<PageDoc | null>(
      `*[_type == "page" && slug.current == $slug][0]{ title, "slug": slug.current, seoTitle, seoDescription, sections }`,
      { slug },
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["page"] } },
    );
    if (doc?.sections?.length) return doc;
  } catch (error) {
    console.error("Sanity ophalen mislukt, terugval op vaste inhoud", error);
  }
  return legacyPages[slug] ?? null;
}

/** Extra pagina's uit Sanity (landingspagina's), voor de sitemap. */
export async function getExtraPageSlugs(): Promise<string[]> {
  try {
    return await sanityClient().fetch<string[]>(
      `*[_type == "page" && defined(slug.current) && !(slug.current in $fixed)].slug.current`,
      { fixed: Object.keys(legacyPages) },
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["page"] } },
    );
  } catch {
    return [];
  }
}
