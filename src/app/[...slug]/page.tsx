import { notFound } from "next/navigation";
import { DynamicPage, pageMetadata } from "@/components/dynamic-page";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string[] }> };

/** Vaste pagina's hebben een eigen route; via deze route zijn ze niet bereikbaar. */
const FIXED = ["home", "about", "custom-yacht-building", "design-build-partner"];

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(slug.join("/"));
}

/** Landingspagina's die in Sanity zijn gemaakt, op navisol.nl/<adres>. */
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  if (FIXED.includes(path)) notFound();
  return <DynamicPage slug={path} />;
}
