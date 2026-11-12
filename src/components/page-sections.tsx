"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { ClientLogos } from "@/components/client-logos";
import { EditorialRow, CtaBand, PageHero } from "@/components/sections";
import { pick, photoSrc, type Bi, type Photo } from "@/sanity/image";
import type { Section } from "@/sanity/pages";

type Lang = "nl" | "en";
type Obj = Record<string, unknown>;
type Item = Obj & { _key?: string };

/** Rendert de secties van een pagina (uit Sanity, of de vaste terugval). */
export function PageSections({ sections }: { sections: Section[] }) {
  const { lang } = useLanguage();
  return (
    <>
      {sections.map((s) => (
        <SectionView key={s._key} s={s} lang={lang} />
      ))}
    </>
  );
}

const t = (v: unknown, lang: Lang) => pick(v as Bi, lang);
const src = (v: unknown, width?: number) => photoSrc(v as Photo, width);
const list = (v: unknown): Item[] => (Array.isArray(v) ? (v as Item[]) : []);

function SectionView({ s, lang }: { s: Section; lang: Lang }) {
  switch (s._type) {
    case "homeHero":
      return <HomeHero s={s} lang={lang} />;
    case "pageHero":
      return (
        <PageHero
          eyebrow={t(s.eyebrow, lang)}
          title={t(s.title, lang)}
          lead={t(s.lead, lang) || undefined}
          image={src(s.image)}
          video={(s.video as string) || undefined}
        />
      );
    case "clientLogos":
      return <ClientLogos eyebrow={t(s.eyebrow, lang)} />;
    case "pillars":
      return <Pillars s={s} lang={lang} />;
    case "videoFeature":
      return <VideoFeature s={s} lang={lang} />;
    case "editorial":
      return <Editorial s={s} lang={lang} />;
    case "techGrid":
      return <TechGrid s={s} lang={lang} />;
    case "quote":
      return <Quote s={s} lang={lang} />;
    case "statement":
      return (
        <section className="bg-[hsl(var(--ink))]">
          <div className="container-narrow section text-center">
            <Reveal>
              <p className="display-section text-balance text-white">{t(s.text, lang)}</p>
            </Reveal>
          </div>
        </section>
      );
    case "intro":
      return (
        <section className="section">
          <div className="container-wide grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="display-section text-balance">{t(s.title, lang)}</h2>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <p className="lead">{t(s.body, lang)}</p>
            </Reveal>
          </div>
        </section>
      );
    case "steps":
      return <Steps s={s} lang={lang} />;
    case "brandGallery":
      return <BrandGallery s={s} lang={lang} />;
    case "story":
      return <Story s={s} lang={lang} />;
    case "fullImage":
      return (
        <section className="relative">
          <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden md:h-[70vh]">
            <PlaceholderImage
              src={src(s.image)}
              alt="Navisol"
              className="absolute inset-0 h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </section>
      );
    case "values":
      return <Values s={s} lang={lang} />;
    case "cta":
      return (
        <CtaBand
          eyebrow={t(s.eyebrow, lang) || undefined}
          title={t(s.title, lang)}
          body={t(s.body, lang)}
          button={t(s.button, lang)}
          href={(s.href as string) || "/contact"}
        />
      );
    default:
      return null;
  }
}

function HomeHero({ s, lang }: { s: Section; lang: Lang }) {
  const primary = (s.primaryButton ?? {}) as Obj;
  const secondary = (s.secondaryButton ?? {}) as Obj;
  const images = list(s.images).map((p) => src(p, 1800)).filter(Boolean);
  return (
    <section className="bg-[hsl(var(--bone))] pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{t(s.eyebrow, lang)}</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display-hero mt-6 text-balance text-[hsl(var(--ink))]">{t(s.title, lang)}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="lead mt-7 max-w-xl">{t(s.lead, lang)}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {Boolean(primary.href) && (
                <Link href={primary.href as string} className="btn-round btn-solid">
                  {t(primary.label, lang)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {Boolean(secondary.href) && (
                <Link href={secondary.href as string} className="btn-round btn-outline-ink">
                  {t(secondary.label, lang)}
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={200}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[5/4]">
            <HeroSlideshow images={images} alt="Navisol jachten" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pillars({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="section-sm">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow-muted text-center">{t(s.eyebrow, lang)}</p>
        </Reveal>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-1 md:mt-14 lg:grid-cols-2">
        {list(s.items).map((p) => (
          <Reveal key={p._key}>
            <Link
              href={(p.href as string) || "/"}
              className="group relative flex min-h-[520px] items-end overflow-hidden md:min-h-[640px]"
            >
              <PlaceholderImage
                src={src(p.image)}
                alt={t(p.title, lang)}
                zoom
                className="absolute inset-0 h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-[hsl(var(--ink))]/30 to-transparent transition-opacity duration-500 group-hover:from-[hsl(var(--ink))]/95" />
              <div className="relative z-10 w-full p-8 md:p-12">
                <p className="eyebrow text-[hsl(var(--accent-light))]">{t(p.label, lang)}</p>
                <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl leading-none text-white md:text-5xl">
                  {t(p.title, lang)}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">{t(p.body, lang)}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                  {t(p.cta, lang)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function VideoFeature({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="section-sm">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{t(s.eyebrow, lang)}</p>
          <h2 className="display-section mt-4 text-balance">{t(s.title, lang)}</h2>
          <p className="lead mt-6">{t(s.body, lang)}</p>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-[hsl(var(--line))] shadow-[0_24px_60px_-24px_rgba(20,40,55,0.35)]">
            <video
              className="absolute inset-0 h-full w-full origin-[50%_42%] scale-[1.32] object-cover"
              poster={src(s.poster)}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t(s.title, lang)}
            >
              <source src={s.video as string} type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Editorial({ s, lang }: { s: Section; lang: Lang }) {
  const heading = t(s.eyebrow, lang);
  return (
    <>
      {heading && (
        <div className="container-wide pt-8">
          <Reveal>
            <p className="eyebrow-muted">{heading}</p>
          </Reveal>
        </div>
      )}
      {list(s.blocks).map((b) => (
        <EditorialRow
          key={b._key}
          block={{
            layout: (b.layout as "left" | "right" | "full") || "left",
            image: src(b.image),
            eyebrow: t(b.eyebrow, lang) || undefined,
            title: t(b.title, lang),
            body: t(b.body, lang) || undefined,
          }}
        />
      ))}
    </>
  );
}

function TechGrid({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="section bg-[hsl(var(--bone-2))]">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{t(s.eyebrow, lang)}</p>
            <h2 className="display-section mt-4 text-balance">{t(s.title, lang)}</h2>
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {list(s.items).map((item, i) => (
                <Reveal key={item._key} delay={i * 80}>
                  <div className="border-t border-[hsl(var(--ink))]/15 pt-5">
                    <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-[hsl(var(--ink))]">
                      {t(item.title, lang)}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[hsl(var(--ink-soft))]">{t(item.body, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        {t(s.statement, lang) && (
          <Reveal>
            <div className="mt-12 rounded-xl bg-[hsl(var(--ink))] px-8 py-6 text-center md:mt-16">
              <p className="font-[family-name:var(--font-fraunces)] text-xl text-white md:text-2xl">{t(s.statement, lang)}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Quote({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="bg-[hsl(var(--bone-2))]">
      <div className="container-narrow section text-center">
        <Reveal>
          <p className="font-[family-name:var(--font-fraunces)] text-3xl leading-snug text-[hsl(var(--ink))] text-balance md:text-4xl">
            &ldquo;{t(s.quote, lang)}&rdquo;
          </p>
          <p className="eyebrow-muted mt-6">{t(s.author, lang)}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Steps({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <>
      <div className="container-wide">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="eyebrow">{t(s.eyebrow, lang)}</span>
            <span className="h-px flex-1 bg-[hsl(var(--line))]" />
          </div>
        </Reveal>
      </div>
      <div className="pb-8">
        {list(s.items).map((step, i) => {
          const flip = i % 2 === 1;
          const gallery = list(step.gallery);
          return (
            <section key={step._key} className="section-sm">
              <div className="container-wide grid items-center gap-8 md:gap-14 lg:grid-cols-2">
                <Reveal className={cn(flip ? "lg:order-2" : "lg:order-1")}>
                  <div className="group relative aspect-[4/3] overflow-hidden">
                    <PlaceholderImage
                      src={src(step.image)}
                      alt={t(step.title, lang)}
                      zoom
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                </Reveal>
                <Reveal className={cn(flip ? "lg:order-1" : "lg:order-2")} delay={120}>
                  <div className="max-w-lg lg:px-4">
                    <span className="font-[family-name:var(--font-fraunces)] text-6xl text-[hsl(var(--accent))]/25 md:text-7xl">
                      {step.index as string}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-[hsl(var(--ink))] md:text-4xl">
                      {t(step.title, lang)}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">{t(step.body, lang)}</p>
                    {gallery.length > 0 && (
                      <div className="mt-7 grid grid-cols-3 gap-2">
                        {gallery.map((g) => (
                          <div key={g._key} className="group relative aspect-square overflow-hidden">
                            <PlaceholderImage
                              src={src(g)}
                              alt={t(step.title, lang)}
                              zoom
                              className="h-full w-full"
                              imgClassName="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function BrandGallery({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{t(s.eyebrow, lang)}</p>
            <h2 className="display-section mt-4 text-balance">{t(s.title, lang)}</h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="lead">{t(s.body, lang)}</p>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-2 md:mt-14 md:grid-cols-3">
          {list(s.images).map((p, i) => (
            <Reveal key={p._key} delay={i * 100}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <PlaceholderImage
                  src={src(p)}
                  alt={t(s.title, lang)}
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
  );
}

function Story({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="section">
      <div className="container-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="display-section text-balance">{t(s.title, lang)}</h2>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <div className="space-y-5">
            {list(s.paragraphs).map((p) => (
              <p key={p._key} className="text-base leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
                {t(p.text, lang)}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Values({ s, lang }: { s: Section; lang: Lang }) {
  return (
    <section className="section bg-[hsl(var(--bone-2))]">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">{t(s.eyebrow, lang)}</p>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {list(s.items).map((v, i) => (
            <Reveal key={v._key} delay={i * 100}>
              <div className="border-t border-[hsl(var(--ink))]/15 pt-6">
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl text-[hsl(var(--ink))]">{t(v.title, lang)}</h3>
                <p className="mt-3 text-[hsl(var(--ink-soft))]">{t(v.body, lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
