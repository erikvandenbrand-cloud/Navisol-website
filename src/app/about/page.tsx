"use client";

import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PageHero, CtaBand } from "@/components/sections";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = content[lang].about;

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lead={t.heroLead}
        image={t.heroImage}
      />

      {/* Story */}
      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="display-section text-balance">{t.storyTitle}</h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <div className="space-y-5">
              {t.story.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed image */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[70vh]">
          <PlaceholderImage
            src={t.fullImage}
            alt="Navisol"
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="section bg-[hsl(var(--bone-2))]">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">{t.valuesEyebrow}</p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {t.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="border-t border-[hsl(var(--ink))]/15 pt-6">
                  <h3 className="font-[family-name:var(--font-fraunces)] text-2xl text-[hsl(var(--ink))]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[hsl(var(--ink-soft))]">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={t.ctaTitle} body={t.ctaBody} button={t.ctaButton} href="/contact" />
    </>
  );
}
