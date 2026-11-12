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

  // Eigen canonical en deelgegevens per pagina (de layout geeft anders overal
  // het adres en de titel van de homepage mee).
  const path = slug === "home" ? "/" : `/${slug}`;
  meta.alternates = { canonical: path };
  meta.openGraph = {
    title: page?.seoTitle ?? page?.title,
    description: page?.seoDescription,
    url: path,
    siteName: "Navisol",
    locale: "nl_NL",
    type: "website",
  };
  return meta;
}

/** Pagina uit Sanity (of de vaste terugval); onbekend adres geeft een 404. */
export async function DynamicPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page?.sections?.length) notFound();
  return <PageSections sections={page.sections} />;
}
