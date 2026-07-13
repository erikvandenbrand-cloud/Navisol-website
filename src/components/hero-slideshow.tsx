"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Calm, auto-rotating crossfade slideshow used in the homepage hero.
 * Cycles gently through the provided boat images with a slow fade.
 */
export function HeroSlideshow({
  images,
  alt,
  interval = 4500,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="relative h-full w-full bg-[hsl(var(--ink))]/5">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
            i === active ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* progress dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Toon boot ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full shadow-sm transition-all duration-500",
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
