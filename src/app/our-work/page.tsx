"use client";

import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PageHero, CtaBand } from "@/components/sections";
import type { WorkItem } from "@/lib/content";

export default function OurWorkPage() {
  const { lang } = useLanguage();
  const t = content[lang].work;

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lead={t.heroLead}
        image={t.heroImage}
      />

      <div className="pt-4">
        {t.items.map((item) => (
          <WorkRow key={item.title} item={item} />
        ))}
      </div>

      <CtaBand
        title={t.ctaTitle}
        body={t.ctaBody}
        button={t.ctaButton}
        href="/contact"
      />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[hsl(var(--accent))]">
      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
      {status}
    </span>
  );
}

function ThumbStrip({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) return null;
  return (
    <div
      className={cn(
        "mt-3 grid gap-2",
        images.length >= 3 ? "grid-cols-3" : "grid-cols-2"
      )}
    >
      {images.map((src) => (
        <div key={src} className="group relative aspect-[4/3] overflow-hidden">
          <PlaceholderImage
            src={src}
            alt={alt}
            zoom
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function WorkRow({ item }: { item: WorkItem }) {
  if (item.layout === "full") {
    return (
      <section className="relative">
        <div className="group relative h-[65vh] min-h-[440px] w-full overflow-hidden md:h-[85vh]">
          <PlaceholderImage
            src={item.images[0]}
            alt={item.title}
            zoom
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/85 via-[hsl(var(--ink))]/20 to-transparent" />
          <div className="container-wide relative z-10 flex h-full items-end pb-12 md:pb-16">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 text-white/70">
                <span className="eyebrow text-[hsl(var(--accent-light))]">
                  {item.category}
                </span>
                {item.year && (
                  <>
                    <span className="text-white/40">·</span>
                    <span className="text-xs tracking-widest">{item.year}</span>
                  </>
                )}
                {item.status && <StatusBadge status={item.status} />}
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-white md:text-6xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-xl text-white/80">{item.body}</p>
            </Reveal>
          </div>
        </div>

        {item.images.length > 1 && (
          <div className="container-wide py-3">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
              {item.images.slice(1).map((src) => (
                <Reveal key={src}>
                  <div className="group relative aspect-square overflow-hidden">
                    <PlaceholderImage
                      src={src}
                      alt={item.title}
                      zoom
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  const imageFirst = item.layout === "left";

  return (
    <section className="section-sm">
      <div className="container-wide grid items-center gap-8 md:gap-14 lg:grid-cols-2">
        <Reveal className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}>
          <div className="group relative aspect-[4/3] overflow-hidden">
            {item.video ? (
              <video
                className="h-full w-full object-cover"
                poster={item.images[0]}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={item.title}
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <PlaceholderImage
                src={item.images[0]}
                alt={item.title}
                zoom
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            )}
          </div>

          {/* extra stills — when a video leads, show all stills; otherwise the rest */}
          <ThumbStrip
            images={item.video ? item.images : item.images.slice(1)}
            alt={item.title}
          />
        </Reveal>

        <Reveal className={cn(imageFirst ? "lg:order-2" : "lg:order-1")} delay={120}>
          <div className="max-w-lg lg:px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{item.category}</span>
              {item.year && (
                <>
                  <span className="text-[hsl(var(--line))]">·</span>
                  <span className="text-xs tracking-widest text-[hsl(var(--ink-mute))]">
                    {item.year}
                  </span>
                </>
              )}
              {item.status && <StatusBadge status={item.status} />}
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl text-[hsl(var(--ink))] md:text-4xl">
              {item.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
              {item.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
