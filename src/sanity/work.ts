import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { WorkItem } from "@/lib/content";
import { apiVersion, dataset, projectId } from "./env";

export const REVALIDATE_SECONDS = 60;

type Bi = { nl?: string; en?: string } | null;
type Doc = {
  slug?: string;
  title: string;
  category?: Bi;
  year?: string;
  status?: Bi;
  body?: Bi;
  images?: { asset?: { _ref?: string } }[];
  video?: string;
  href?: string;
  layout?: WorkItem["layout"];
};

/**
 * Projecten uit Sanity, per taal. Geeft null als Sanity niet is ingesteld of
 * nog leeg is; de pagina valt dan terug op src/lib/content.ts.
 */
export async function getWorkItems(): Promise<{ nl: WorkItem[]; en: WorkItem[] } | null> {
  if (!projectId) return null;
  try {
    const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
    const builder = createImageUrlBuilder(client);
    const docs = await client.fetch<Doc[]>(
      `*[_type == "workItem"] | order(order asc){
        title, "slug": slug.current, category, year, status, body,
        images[]{asset}, video, href, layout
      }`,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!docs?.length) return null;
    const build = (lang: "nl" | "en"): WorkItem[] =>
      docs.map((d) => ({
        slug: d.slug ?? d.title,
        title: d.title,
        category: d.category?.[lang] || d.category?.nl || "",
        year: d.year || undefined,
        status: d.status?.[lang] || d.status?.nl || undefined,
        body: d.body?.[lang] || d.body?.nl || "",
        images: (d.images ?? [])
          .filter((i) => i.asset?._ref)
          .map((i) => builder.image(i).width(1600).auto("format").url()),
        video: d.video || undefined,
        href: d.href || undefined,
        layout: d.layout ?? "left",
      }));
    return { nl: build("nl"), en: build("en") };
  } catch (error) {
    console.error("Sanity ophalen mislukt, terugval op vaste inhoud", error);
    return null;
  }
}
