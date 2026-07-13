"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ClientLogos } from "@/components/client-logos";
import { EditorialRow, CtaBand } from "@/components/sections";

export default function HomePage() {
  const { lang } = useLanguage();
  const t = content[lang].home;

  return (
    <>
      {/* ============ HERO — calm & light ============ */}
      <section className="bg-[hsl(var(--bone))] pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">{t.heroEyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="display-hero mt-6 text-balance text-[hsl(var(--ink))]">
                {t.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="lead mt-7 max-w-xl">{t.heroLead}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/our-work" className="btn-round btn-solid">
                  {lang === "nl" ? "Bekijk ons werk" : "See our work"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn-round btn-outline-ink">
                  {content[lang].nav.cta}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={200}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[5/4]">
              <HeroSlideshow images={t.heroImages} alt="Navisol jachten" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CLIENT LOGOS ============ */}
      <ClientLogos eyebrow={t.clientsEyebrow} />

      {/* ============ TWO PILLARS ============ */}
      <section className="section-sm">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow-muted text-center">{t.pillarsEyebrow}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-1 md:mt-14 lg:grid-cols-2">
          <PillarPanel
            href="/custom-yacht-building"
            label={t.customLabel}
            title={t.customTitle}
            body={t.customBody}
            cta={t.customCta}
            image={t.customImage}
          />
          <PillarPanel
            href="/design-build-partner"
            label={t.partnerLabel}
            title={t.partnerTitle}
            body={t.partnerBody}
            cta={t.partnerCta}
            image={t.partnerImage}
          />
        </div>
      </section>

      {/* ============ DESIGN IN 3D — contained video ============ */}
      <section className="section-sm">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{t.designEyebrow}</p>
            <h2 className="display-section mt-4 text-balance">{t.designTitle}</h2>
            <p className="lead mt-6">{t.designBody}</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-[hsl(var(--line))] shadow-[0_24px_60px_-24px_rgba(20,40,55,0.35)]">
              <video
                className="absolute inset-0 h-full w-full origin-[50%_42%] scale-[1.32] object-cover"
                poster={t.heroImage}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={t.designTitle}
              >
                <source src={t.heroVideo} type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ EDITORIAL STORY ============ */}
      <div className="container-wide pt-8">
        <Reveal>
          <p className="eyebrow-muted">{t.editorialEyebrow}</p>
        </Reveal>
      </div>

      {t.editorial.map((block, i) => (
        <EditorialRow key={i} block={block} />
      ))}

      {/* ============ ONDER DE HUID — techniek ============ */}
      <section className="section bg-[hsl(var(--bone-2))]">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{t.techEyebrow}</p>
              <h2 className="display-section mt-4 text-balance">{t.techTitle}</h2>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {t.techItems.map((item, i) => (
                  <Reveal key={item.title} delay={i * 80}>
                    <div className="border-t border-[hsl(var(--ink))]/15 pt-5">
                      <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-[hsl(var(--ink))]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[hsl(var(--ink-soft))]">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal>
            <div className="mt-12 rounded-xl bg-[hsl(var(--ink))] px-8 py-6 text-center md:mt-16">
              <p className="font-[family-name:var(--font-fraunces)] text-xl text-white md:text-2xl">
                {t.techStatement}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUOTE BAND ============ */}
      <section className="bg-[hsl(var(--bone-2))]">
        <div className="container-narrow section text-center">
          <Reveal>
            <p className="font-[family-name:var(--font-fraunces)] text-3xl leading-snug text-[hsl(var(--ink))] text-balance md:text-4xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="eyebrow-muted mt-6">{t.quoteAuthor}</p>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CtaBand title={t.ctaTitle} body={t.ctaBody} button={t.ctaButton} />
    </>
  );
}

function PillarPanel({
  href,
  label,
  title,
  body,
  cta,
  image,
}: {
  href: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  image: string;
}) {
  return (
    <Reveal>
      <Link
        href={href}
        className="group relative flex min-h-[520px] items-end overflow-hidden md:min-h-[640px]"
      >
        <PlaceholderImage
          src={image}
          alt={title}
          zoom
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-[hsl(var(--ink))]/30 to-transparent transition-opacity duration-500 group-hover:from-[hsl(var(--ink))]/95" />
        <div className="relative z-10 w-full p-8 md:p-12">
          <p className="eyebrow text-[hsl(var(--accent-light))]">{label}</p>
          <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl leading-none text-white md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
            {body}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
