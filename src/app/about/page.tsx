import { DynamicPage, pageMetadata } from "@/components/dynamic-page";

export const revalidate = 60;

export const generateMetadata = () => pageMetadata("about");

export default function Page() {
  return <DynamicPage slug="about" />;
}
