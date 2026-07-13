import { CLIENTS } from "@/lib/content";

/**
 * "Trusted by" strip. Renders each client in a uniform card — a real logo
 * where available, otherwise a clean wordmark — so the row stays cohesive.
 */
export function ClientLogos({ eyebrow }: { eyebrow: string }) {
  return (
    <section className="border-y border-[hsl(var(--line))] bg-[hsl(var(--bone-2))]/40 py-12 md:py-16">
      <div className="container-wide">
        <p className="eyebrow-muted text-center">{eyebrow}</p>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 md:grid-cols-5">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="group flex h-[76px] items-center justify-center rounded-xl border border-[hsl(var(--line))] bg-[hsl(var(--paper))] px-4 transition-shadow duration-300 hover:shadow-[0_10px_30px_-16px_rgba(20,40,55,0.35)]"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-9 w-auto max-w-[130px] object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <span className="text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-[hsl(var(--ink-mute))] transition-colors duration-300 group-hover:text-[hsl(var(--ink))]">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
