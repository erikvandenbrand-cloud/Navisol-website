import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSections } from "@/components/page-sections";
import { getPage } from "@/sanity/pages";

/** Metadata uit Sanity; zonder SEO-velden gelden de standaardwaarden uit de layout. */
export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  const meta: Metadata = {};
  if (page?.seoTitle) meta.title = page.seoTitle;
  if (page?.seoDescription) meta.description = page.seoDescription;
  return meta;
}

/** Pagina uit Sanity (of de vaste terugval); onbekend adres geeft een 404. */
export async function DynamicPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page?.sections?.length) notFound();
  return <PageSections sections={page.sections} />;
}
