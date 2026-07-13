"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import type { EditorialBlock } from "@/lib/content";

/**
 * Full-bleed hero media. Renders a muted/looping background video when a
 * `video` source is supplied (with the photo as poster + fallback), otherwise
 * shows the photo. Used as the backdrop for page heroes.
 */
export function HeroMedia({
  image,
  video,
  alt,
  priority = false,
  className,
}: {
  image: string;
  video?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  if (video) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Scale + top-biased origin crops the 3D-software chrome baked into
            the top/bottom edges of the source screen-capture. */}
        <video
          className={cn(
            "h-full w-full origin-[50%_42%] scale-[1.32] object-cover",
            className
          )}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }
  return (
    <PlaceholderImage
      src={image}
      alt={alt}
      priority={priority}
      className={cn("absolute inset-0 h-full w-full", className)}
      imgClassName="h-full w-full object-cover"
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  video,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  video?: string;
}) {
  return (
    <section className="relative flex min-h-[66vh] items-end overflow-hidden md:min-h-[74vh]">
      <HeroMedia image={image} video={video} alt={title} priority />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/90 via-[hsl(var(--ink))]/40 to-[hsl(var(--ink))]/30" />
      <div className="container-wide relative z-10 pb-16 pt-36 md:pb-24">
        <Reveal>
          <p className="eyebrow text-[hsl(var(--accent-light))]">{eyebrow}</p>
          <h1 className="display-hero mt-5 max-w-4xl text-balance text-white">{title}</h1>
          {lead && <p className="lead mt-6 max-w-2xl text-white/85">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function EditorialRow({ block }: { block: EditorialBlock }) {
  if (block.layout === "full") {
    return (
      <section className="relative">
        <div className="relative h-[58vh] min-h-[400px] w-full overflow-hidden md:h-[78vh]">
          <PlaceholderImage
            src={block.image}
            alt={block.title}
            className="absolute inset-0 h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[hsl(var(--ink))]/45" />
          <div className="container-wide relative z-10 flex h-full items-center">
            <Reveal>
              <h2 className="display-section max-w-4xl text-balance text-white">
                {block.title}
              </h2>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  const imageFirst = block.layout === "left";

  return (
    <section className="section">
      <div className="container-wide grid items-center gap-10 md:gap-16 lg:grid-cols-2">
        <Reveal className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}>
          <div className="group relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
            <PlaceholderImage
              src={block.image}
              alt={block.title}
              zoom
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal
          className={cn(imageFirst ? "lg:order-2" : "lg:order-1")}
          delay={120}
        >
          <div className="max-w-xl lg:px-4">
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
            <h2 className="display-section mt-4 text-balance">{block.title}</h2>
            {block.body && <p className="lead mt-6">{block.body}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow,
  title,
  body,
  button,
  href = "/contact",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  button: string;
  href?: string;
}) {
  return (
    <section className="bg-[hsl(var(--ink))] text-white">
      <div className="container-wide section text-center">
        <Reveal>
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h2 className="display-section mx-auto max-w-3xl text-balance text-white">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            {body}
          </p>
          <div className="mt-9">
            <Link href={href} className="btn-round btn-solid">
              {button}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
