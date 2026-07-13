"use client";

import Link from "next/link";
import { Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { content, NAV_LINKS, CONTACT_DETAILS, IMG } from "@/lib/content";

const LOGO = IMG.logo;

export function Footer() {
  const { lang } = useLanguage();
  const t = content[lang].footer;
  const nav = content[lang].nav;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--ink))] text-[hsl(var(--bone))]">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img
              src={LOGO}
              alt="Navisol"
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {t.tagline}
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h4 className="eyebrow-muted mb-5 text-white/50">{t.explore}</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="eyebrow-muted mb-5 text-white/50">{t.contact}</h4>
            <div className="space-y-4 text-sm text-white/75">
              <a
                href={CONTACT_DETAILS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="block leading-relaxed transition-colors hover:text-white"
              >
                {CONTACT_DETAILS.address1}
                <br />
                {CONTACT_DETAILS.address2}
              </a>
              <a
                href={CONTACT_DETAILS.phoneHref}
                className="block transition-colors hover:text-white"
              >
                {CONTACT_DETAILS.phone}
              </a>
              <a
                href={CONTACT_DETAILS.emailHref}
                className="link-underline text-white transition-colors"
              >
                {CONTACT_DETAILS.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/company/navisol"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/navisol"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 md:flex-row">
          <p>© {year} Navisol. {t.rights}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              {t.privacy}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/80">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
