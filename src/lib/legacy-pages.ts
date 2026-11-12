// De vaste pagina's van de site als Sanity-pagina's, opgebouwd uit content.ts.
//
// Twee doelen, één bron:
//  1. terugval als Sanity leeg of onbereikbaar is (src/sanity/pages.ts)
//  2. startinhoud voor Sanity (scripts/seed-pages.mjs)
//
// Dit bestand mag alleen type-imports bevatten, zodat het script het direct kan
// draaien.
import type { content as Content } from "./content";

type C = typeof Content;
type Page = {
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: Record<string, unknown>[];
};

export function buildLegacyPages(c: C): Record<string, Page> {
  const { nl, en } = c;
  /** Tekst in beide talen uit dezelfde plek in content.ts. */
  const bi = <T,>(get: (d: C["nl"]) => T | undefined) => ({ nl: get(nl), en: get(en) });
  const photo = (url: string) => ({ _type: "photo", url });
  const photos = (urls: string[]) => urls.map(photo);

  const hero = (get: (d: C["nl"]) => { heroEyebrow: string; heroTitle: string; heroLead: string; heroImage: string }) => ({
    _type: "pageHero",
    eyebrow: bi((d) => get(d).heroEyebrow),
    title: bi((d) => get(d).heroTitle),
    lead: bi((d) => get(d).heroLead),
    image: photo(get(nl).heroImage),
  });

  const cta = (get: (d: C["nl"]) => { ctaTitle: string; ctaBody: string; ctaButton: string }) => ({
    _type: "cta",
    title: bi((d) => get(d).ctaTitle),
    body: bi((d) => get(d).ctaBody),
    button: bi((d) => get(d).ctaButton),
    href: "/contact",
  });

  const blocks = (get: (d: C["nl"]) => C["nl"]["home"]["editorial"]) =>
    get(nl).map((b, i) => ({
      _type: "editorialBlock",
      layout: b.layout,
      image: photo(b.image),
      eyebrow: bi((d) => get(d)[i].eyebrow),
      title: bi((d) => get(d)[i].title),
      body: bi((d) => get(d)[i].body),
    }));

  const h = nl.home;
  const home: Page = {
    title: "Home",
    slug: "home",
    sections: [
      {
        _type: "homeHero",
        eyebrow: bi((d) => d.home.heroEyebrow),
        title: bi((d) => d.home.heroTitle),
        lead: bi((d) => d.home.heroLead),
        images: photos(h.heroImages),
        primaryButton: { label: { nl: "Bekijk ons werk", en: "See our work" }, href: "/our-work" },
        secondaryButton: { label: bi((d) => d.nav.cta), href: "/contact" },
      },
      { _type: "clientLogos", eyebrow: bi((d) => d.home.clientsEyebrow) },
      {
        _type: "pillars",
        eyebrow: bi((d) => d.home.pillarsEyebrow),
        items: [
          {
            _type: "pillar",
            href: "/custom-yacht-building",
            label: bi((d) => d.home.customLabel),
            title: bi((d) => d.home.customTitle),
            body: bi((d) => d.home.customBody),
            cta: bi((d) => d.home.customCta),
            image: photo(h.customImage),
          },
          {
            _type: "pillar",
            href: "/design-build-partner",
            label: bi((d) => d.home.partnerLabel),
            title: bi((d) => d.home.partnerTitle),
            body: bi((d) => d.home.partnerBody),
            cta: bi((d) => d.home.partnerCta),
            image: photo(h.partnerImage),
          },
        ],
      },
      {
        _type: "videoFeature",
        eyebrow: bi((d) => d.home.designEyebrow),
        title: bi((d) => d.home.designTitle),
        body: bi((d) => d.home.designBody),
        video: h.heroVideo,
        poster: photo(h.heroImage),
      },
      { _type: "editorial", eyebrow: bi((d) => d.home.editorialEyebrow), blocks: blocks((d) => d.home.editorial) },
      {
        _type: "techGrid",
        eyebrow: bi((d) => d.home.techEyebrow),
        title: bi((d) => d.home.techTitle),
        items: h.techItems.map((_, i) => ({
          _type: "techItem",
          title: bi((d) => d.home.techItems[i].title),
          body: bi((d) => d.home.techItems[i].body),
        })),
        statement: bi((d) => d.home.techStatement),
      },
      { _type: "quote", quote: bi((d) => d.home.quote), author: bi((d) => d.home.quoteAuthor) },
      cta((d) => d.home),
    ],
  };

  const custom: Page = {
    title: "Jachtbouw op maat",
    slug: "custom-yacht-building",
    sections: [
      hero((d) => d.custom),
      { _type: "intro", title: bi((d) => d.custom.introTitle), body: bi((d) => d.custom.introBody) },
      {
        _type: "steps",
        eyebrow: bi((d) => d.custom.stepsEyebrow),
        items: nl.custom.steps.map((s, i) => ({
          _type: "step",
          index: s.index,
          title: bi((d) => d.custom.steps[i].title),
          body: bi((d) => d.custom.steps[i].body),
          image: photo(s.image),
          gallery: photos(s.gallery ?? []),
        })),
      },
      cta((d) => d.custom),
    ],
  };

  const partner: Page = {
    title: "Ontwikkel- & bouwpartner",
    slug: "design-build-partner",
    sections: [
      hero((d) => d.partner),
      { _type: "editorial", blocks: blocks((d) => d.partner.blocks) },
      { _type: "statement", text: bi((d) => d.partner.statement) },
      {
        _type: "brandGallery",
        eyebrow: bi((d) => d.partner.brandEyebrow),
        title: bi((d) => d.partner.brandTitle),
        body: bi((d) => d.partner.brandBody),
        images: photos(nl.partner.brandImages),
      },
      cta((d) => d.partner),
    ],
  };

  const about: Page = {
    title: "Over ons",
    slug: "about",
    sections: [
      hero((d) => d.about),
      {
        _type: "story",
        title: bi((d) => d.about.storyTitle),
        paragraphs: nl.about.story.map((_, i) => ({ _type: "paragraph", text: bi((d) => d.about.story[i]) })),
      },
      { _type: "fullImage", image: photo(nl.about.fullImage) },
      {
        _type: "values",
        eyebrow: bi((d) => d.about.valuesEyebrow),
        items: nl.about.values.map((_, i) => ({
          _type: "valueItem",
          title: bi((d) => d.about.values[i].title),
          body: bi((d) => d.about.values[i].body),
        })),
      },
      cta((d) => d.about),
    ],
  };

  const pages = { home, "custom-yacht-building": custom, "design-build-partner": partner, about };
  return addKeys(pages);
}

/** Geeft elk object in een lijst een stabiele _key (Sanity-eis). */
function addKeys<T>(value: T, path = "k-"): T {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object" ? addKeys({ _key: `${path}${i}`, ...(item as object) }, `${path}${i}-`) : item,
    ) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, addKeys(v, `${path}${k}-`)]),
    ) as T;
  }
  return value;
}
