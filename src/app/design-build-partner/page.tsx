"use client";

import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PageHero, EditorialRow, CtaBand } from "@/components/sections";

export default function DesignBuildPartnerPage() {
  const { lang } = useLanguage();
  const t = content[lang].partner;

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lead={t.heroLead}
        image={t.heroImage}
      />

      {t.blocks.map((block, i) => (
        <EditorialRow key={i} block={block} />
      ))}

      {/* Statement band */}
      <section className="bg-[hsl(var(--ink))]">
        <div className="container-narrow section text-center">
          <Reveal>
            <p className="display-section text-balance text-white">
              {t.statement}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Brand work — Eagle */}
      <section className="section">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{t.brandEyebrow}</p>
              <h2 className="display-section mt-4 text-balance">{t.brandTitle}</h2>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <p className="lead">{t.brandBody}</p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-2 md:mt-14 md:grid-cols-3">
            {t.brandImages.map((src, i) => (
              <Reveal key={src} delay={i * 100}>
                <div className="group relative aspect-[4/5] overflow-hidden">
                  <PlaceholderImage
                    src={src}
                    alt={t.brandTitle}
                    zoom
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t.ctaTitle}
        body={t.ctaBody}
        button={t.ctaButton}
        href="/contact"
      />
    </>
  );
}
