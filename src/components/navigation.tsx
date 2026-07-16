"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { content, NAV_LINKS, IMG } from "@/lib/content";

const LOGO = IMG.logo;

export function Navigation() {
  const { lang, setLang } = useLanguage();
  const t = content[lang].nav;
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // The homepage now has a light hero, so the nav needs its dark/solid
  // styling from the top there. Other pages still open with a dark hero image.
  const lightHero = pathname === "/";
  const solid = scrolled || menuOpen || lightHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid
            ? "border-b border-[hsl(var(--line))] bg-[hsl(var(--bone))]/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="container-wide">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 flex items-center"
              aria-label="Navisol home"
            >
              <img
                src={LOGO}
                alt="Navisol"
                className={cn(
                  "h-8 w-auto transition-all duration-500 md:h-9",
                  solid ? "opacity-100" : "brightness-0 invert",
                )}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "link-underline text-[13px] font-medium tracking-wide transition-colors",
                      solid
                        ? active
                          ? "text-[hsl(var(--accent))]"
                          : "text-[hsl(var(--ink-soft))] hover:text-[hsl(var(--ink))]"
                        : "text-white/85 hover:text-white",
                    )}
                  >
                    {t[link.key]}
                  </Link>
                );
              })}
            </div>

            {/* Right cluster */}
            <div className="hidden items-center gap-5 lg:flex">
              <LangSwitch lang={lang} setLang={setLang} solid={solid} />
              <Link
                href="/contact"
                className={cn(
                  "btn-round",
                  solid ? "btn-solid" : "btn-outline-light",
                )}
              >
                {t.cta}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className={cn(
                "relative z-50 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "text-[hsl(var(--ink))]" : "text-white",
              )}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — portaled to <body> so the header's backdrop-blur
          doesn't trap this overlay's fixed positioning. */}
      {mounted &&
        createPortal(
          <div
            style={{ backgroundColor: "hsl(var(--bone))" }}
            className={cn(
              "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
              menuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "border-b border-[hsl(var(--line))] py-4 font-[family-name:var(--font-fraunces)] text-3xl transition-colors",
                        active
                          ? "text-[hsl(var(--accent))]"
                          : "text-[hsl(var(--ink))]",
                      )}
                    >
                      {t[link.key]}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <LangSwitch lang={lang} setLang={setLang} solid />
                <Link href="/contact" className="btn-round btn-solid">
                  {t.cta}
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function LangSwitch({
  lang,
  setLang,
  solid,
}: {
  lang: "nl" | "en";
  setLang: (l: "nl" | "en") => void;
  solid: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-[12px] font-semibold tracking-wide",
        solid ? "text-[hsl(var(--ink-mute))]" : "text-white/70",
      )}
    >
      <button
        type="button"
        onClick={() => setLang("nl")}
        className={cn(
          "rounded-full px-2 py-1 transition-colors",
          lang === "nl"
            ? solid
              ? "text-[hsl(var(--accent))]"
              : "text-white"
            : "hover:opacity-100 opacity-70",
        )}
        aria-pressed={lang === "nl"}
      >
        NL
      </button>
      <span className={solid ? "text-[hsl(var(--line))]" : "text-white/40"}>
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "rounded-full px-2 py-1 transition-colors",
          lang === "en"
            ? solid
              ? "text-[hsl(var(--accent))]"
              : "text-white"
            : "hover:opacity-100 opacity-70",
        )}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
