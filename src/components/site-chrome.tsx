"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

/** Menu en footer van de site; niet rond de Sanity Studio op /studio. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return <>{children}</>;
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
