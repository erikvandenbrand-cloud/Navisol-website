import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  placeholder?: boolean;
  zoom?: boolean;
}

export function PlaceholderImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  placeholder = false,
  zoom = false,
}: PlaceholderImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[hsl(var(--ink))]/5", className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "h-full w-full object-cover",
          zoom && "transition-transform duration-700 ease-out group-hover:scale-105",
          imgClassName
        )}
      />
      {placeholder && (
        <span className="pointer-events-none absolute bottom-4 right-4 z-10 select-none rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm">
          Placeholder
        </span>
      )}
    </div>
  );
}
