import { getWorkItems } from "@/sanity/work";
import OurWorkClient from "./work-client";

export const revalidate = 60;

export default async function OurWorkPage() {
  const sanityItems = await getWorkItems();
  return <OurWorkClient sanityItems={sanityItems} />;
}
