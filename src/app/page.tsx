"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { EditorialRow, CtaBand, HeroMedia } from "@/components/sections";

export default function HomePage() {
  const { lang } = useLanguage();
  const t = content[lang].home;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <HeroMedia
          image={t.heroImage}
          video={t.heroVideo}
          alt="Navisol"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--ink))]/70 via-[hsl(var(--ink))]/45 to-[hsl(var(--ink))]/75" />

        <div className="container-wide relative z-10 pt-24">
          <Reveal>
            <p className="eyebrow text-[hsl(var(--accent-light))]">{t.heroEyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display-hero mt-6 max-w-5xl text-balance text-white">
              {t.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              {t.heroLead}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/our-work" className="btn-round btn-solid">
                {lang === "nl" ? "Bekijk ons werk" : "See our work"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-round btn-outline-light">
                {content[lang].nav.cta}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">{t.scroll}</span>
            <ArrowDown className="h-4 w-4 animate-scroll-hint" />
          </div>
        </div>
      </section>

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

      {/* ============ EDITORIAL STORY ============ */}
      <div className="container-wide pt-8">
        <Reveal>
          <p className="eyebrow-muted">{t.editorialEyebrow}</p>
        </Reveal>
      </div>

      {t.editorial.map((block, i) => (
        <EditorialRow key={i} block={block} />
      ))}

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
