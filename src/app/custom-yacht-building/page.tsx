import { DynamicPage, pageMetadata } from "@/components/dynamic-page";

export const revalidate = 60;

export const generateMetadata = () => pageMetadata("custom-yacht-building");

export default function Page() {
  return <DynamicPage slug="custom-yacht-building" />;
}
