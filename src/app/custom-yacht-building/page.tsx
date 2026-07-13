"use client";

import { useLanguage } from "@/contexts/language-context";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PageHero, CtaBand } from "@/components/sections";
import type { Step } from "@/lib/content";

export default function CustomYachtBuildingPage() {
  const { lang } = useLanguage();
  const t = content[lang].custom;

  return (
    <>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lead={t.heroLead}
        image={t.heroImage}
      />

      {/* Intro */}
      <section className="section">
        <div className="container-wide grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display-section text-balance">{t.introTitle}</h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="lead">{t.introBody}</p>
          </Reveal>
        </div>
      </section>

      {/* Steps eyebrow */}
      <div className="container-wide">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="eyebrow">{t.stepsEyebrow}</span>
            <span className="h-px flex-1 bg-[hsl(var(--line))]" />
          </div>
        </Reveal>
      </div>

      {/* Steps */}
      <div className="pb-8">
        {t.steps.map((step, i) => (
          <StepRow key={step.index} step={step} flip={i % 2 === 1} />
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

function StepRow({ step, flip }: { step: Step; flip: boolean }) {
  return (
    <section className="section-sm">
      <div className="container-wide grid items-center gap-8 md:gap-14 lg:grid-cols-2">
        <Reveal className={cn(flip ? "lg:order-2" : "lg:order-1")}>
          <div className="group relative aspect-[4/3] overflow-hidden">
            <PlaceholderImage
              src={step.image}
              alt={step.title}
              zoom
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className={cn(flip ? "lg:order-1" : "lg:order-2")} delay={120}>
          <div className="max-w-lg lg:px-4">
            <span className="font-[family-name:var(--font-fraunces)] text-6xl text-[hsl(var(--accent))]/25 md:text-7xl">
              {step.index}
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-[hsl(var(--ink))] md:text-4xl">
              {step.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[hsl(var(--ink-soft))] md:text-lg">
              {step.body}
            </p>

            {step.gallery && step.gallery.length > 0 && (
              <div className="mt-7 grid grid-cols-3 gap-2">
                {step.gallery.map((src) => (
                  <div
                    key={src}
                    className="group relative aspect-square overflow-hidden"
                  >
                    <PlaceholderImage
                      src={src}
                      alt={step.title}
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
}
