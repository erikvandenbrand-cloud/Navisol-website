import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Pagina's bestaan uit secties. Elke sectie hoort bij één van de bestaande
 * ontwerpen op de site, zodat je ze kunt stapelen en verplaatsen zonder de
 * vormgeving te kunnen breken. Alle teksten hebben een NL- en een EN-veld.
 */

const bi = (name: string, title: string, type: "string" | "text" = "string", description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({ name: "nl", title: "Nederlands", type, ...(type === "text" ? { rows: 4 } : {}) }),
      defineField({ name: "en", title: "English", type, ...(type === "text" ? { rows: 4 } : {}) }),
    ],
  });

const photoField = (name = "image", title = "Foto") => defineField({ name, title, type: "photo" });

const eyebrow = bi("eyebrow", "Klein kopje (boven de titel)");

const preview = (kind: string) => ({
  select: { title: "title.nl", eyebrow: "eyebrow.nl" },
  prepare: ({ title, eyebrow: e }: { title?: string; eyebrow?: string }) => ({
    title: title || e || kind,
    subtitle: kind,
  }),
});

/** Foto: eigen upload, of anders een pad/link (bijv. /images/foto.jpg). */
export const photo = defineType({
  name: "photo",
  title: "Foto",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Upload", type: "image", options: { hotspot: true } }),
    defineField({
      name: "url",
      title: "Of: pad of link",
      type: "string",
      description: "Wordt alleen gebruikt als er geen upload is. Bijv. /images/hero-drone-varend.jpg",
    }),
  ],
  preview: { select: { media: "image", subtitle: "url" }, prepare: ({ media, subtitle }) => ({ title: "Foto", subtitle, media }) },
});

const button = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { columns: 2 },
    fields: [bi("label", "Tekst op de knop"), defineField({ name: "href", title: "Link (bijv. /contact)", type: "string" })],
  });

export const homeHero = defineType({
  name: "homeHero",
  title: "Homepage-hero met fotowisselaar",
  type: "object",
  fields: [
    eyebrow,
    bi("title", "Titel"),
    bi("lead", "Inleiding", "text"),
    defineField({ name: "images", title: "Foto's (wisselen vanzelf)", type: "array", of: [defineArrayMember({ type: "photo" })] }),
    button("primaryButton", "Knop 1 (gevuld)"),
    button("secondaryButton", "Knop 2 (omlijnd)"),
  ],
  preview: preview("Homepage-hero"),
});

export const pageHero = defineType({
  name: "pageHero",
  title: "Hero (grote foto met titel)",
  type: "object",
  fields: [
    eyebrow,
    bi("title", "Titel"),
    bi("lead", "Inleiding", "text"),
    photoField("image", "Achtergrondfoto"),
    defineField({ name: "video", title: "Video op de achtergrond (link naar .mp4, optioneel)", type: "string" }),
  ],
  preview: preview("Hero"),
});

export const clientLogos = defineType({
  name: "clientLogos",
  title: "Klantlogo's",
  type: "object",
  description: "De logo's zelf staan vast in de code; hier pas je alleen het kopje aan.",
  fields: [eyebrow],
  preview: preview("Klantlogo's"),
});

export const pillars = defineType({
  name: "pillars",
  title: "Twee grote keuzetegels",
  type: "object",
  fields: [
    eyebrow,
    defineField({
      name: "items",
      title: "Tegels",
      type: "array",
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          type: "object",
          name: "pillar",
          fields: [
            defineField({ name: "href", title: "Link (bijv. /custom-yacht-building)", type: "string" }),
            bi("label", "Klein kopje"),
            bi("title", "Titel"),
            bi("body", "Tekst", "text"),
            bi("cta", "Tekst van de link"),
            photoField(),
          ],
          preview: { select: { title: "title.nl", media: "image.image" } },
        }),
      ],
    }),
  ],
  preview: preview("Keuzetegels"),
});

export const videoFeature = defineType({
  name: "videoFeature",
  title: "Tekst met video",
  type: "object",
  fields: [
    eyebrow,
    bi("title", "Titel"),
    bi("body", "Tekst", "text"),
    defineField({ name: "video", title: "Video (link naar .mp4)", type: "string" }),
    photoField("poster", "Voorbeeldfoto (voor het laden)"),
  ],
  preview: preview("Tekst met video"),
});

export const editorial = defineType({
  name: "editorial",
  title: "Foto en tekst (afwisselend)",
  type: "object",
  fields: [
    eyebrow,
    defineField({
      name: "blocks",
      title: "Blokken",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "editorialBlock",
          fields: [
            defineField({
              name: "layout",
              title: "Opmaak",
              type: "string",
              options: {
                list: [
                  { title: "Foto links", value: "left" },
                  { title: "Foto rechts", value: "right" },
                  { title: "Foto over volle breedte", value: "full" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            }),
            photoField(),
            eyebrow,
            bi("title", "Titel"),
            bi("body", "Tekst", "text"),
          ],
          preview: { select: { title: "title.nl", subtitle: "layout", media: "image.image" } },
        }),
      ],
    }),
  ],
  preview: preview("Foto en tekst"),
});

export const techGrid = defineType({
  name: "techGrid",
  title: "Kopje met vier punten en balk",
  type: "object",
  fields: [
    eyebrow,
    bi("title", "Titel"),
    defineField({
      name: "items",
      title: "Punten",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "techItem",
          fields: [bi("title", "Titel"), bi("body", "Tekst", "text")],
          preview: { select: { title: "title.nl" } },
        }),
      ],
    }),
    bi("statement", "Donkere balk eronder"),
  ],
  preview: preview("Kopje met punten"),
});

export const quote = defineType({
  name: "quote",
  title: "Citaat",
  type: "object",
  fields: [bi("quote", "Citaat", "text"), bi("author", "Van wie")],
  preview: { select: { title: "quote.nl" }, prepare: ({ title }) => ({ title, subtitle: "Citaat" }) },
});

export const statement = defineType({
  name: "statement",
  title: "Donkere balk met tekst",
  type: "object",
  fields: [bi("text", "Tekst", "text")],
  preview: { select: { title: "text.nl" }, prepare: ({ title }) => ({ title, subtitle: "Donkere balk" }) },
});

export const intro = defineType({
  name: "intro",
  title: "Titel links, tekst rechts",
  type: "object",
  fields: [bi("title", "Titel"), bi("body", "Tekst", "text")],
  preview: preview("Titel en tekst"),
});

export const steps = defineType({
  name: "steps",
  title: "Genummerde stappen met foto",
  type: "object",
  fields: [
    eyebrow,
    defineField({
      name: "items",
      title: "Stappen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "index", title: "Nummer (bijv. 01)", type: "string" }),
            bi("title", "Titel"),
            bi("body", "Tekst", "text"),
            photoField(),
            defineField({ name: "gallery", title: "Kleine foto's eronder", type: "array", of: [defineArrayMember({ type: "photo" })] }),
          ],
          preview: { select: { title: "title.nl", subtitle: "index", media: "image.image" } },
        }),
      ],
    }),
  ],
  preview: preview("Stappen"),
});

export const brandGallery = defineType({
  name: "brandGallery",
  title: "Kopje, tekst en drie foto's",
  type: "object",
  fields: [
    eyebrow,
    bi("title", "Titel"),
    bi("body", "Tekst", "text"),
    defineField({ name: "images", title: "Foto's", type: "array", of: [defineArrayMember({ type: "photo" })] }),
  ],
  preview: preview("Kopje en foto's"),
});

export const story = defineType({
  name: "story",
  title: "Titel links, alinea's rechts",
  type: "object",
  fields: [
    bi("title", "Titel"),
    defineField({
      name: "paragraphs",
      title: "Alinea's",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "paragraph",
          fields: [bi("text", "Tekst", "text")],
          preview: { select: { title: "text.nl" } },
        }),
      ],
    }),
  ],
  preview: preview("Verhaal"),
});

export const fullImage = defineType({
  name: "fullImage",
  title: "Foto over volle breedte",
  type: "object",
  fields: [photoField()],
  preview: { select: { media: "image.image" }, prepare: ({ media }) => ({ title: "Foto", subtitle: "Volle breedte", media }) },
});

export const values = defineType({
  name: "values",
  title: "Drie waarden naast elkaar",
  type: "object",
  fields: [
    eyebrow,
    defineField({
      name: "items",
      title: "Waarden",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueItem",
          fields: [bi("title", "Titel"), bi("body", "Tekst", "text")],
          preview: { select: { title: "title.nl" } },
        }),
      ],
    }),
  ],
  preview: preview("Waarden"),
});

export const cta = defineType({
  name: "cta",
  title: "Donkere afsluiter met knop",
  type: "object",
  fields: [
    eyebrow,
    bi("title", "Titel"),
    bi("body", "Tekst", "text"),
    bi("button", "Tekst op de knop"),
    defineField({ name: "href", title: "Link (standaard /contact)", type: "string", initialValue: "/contact" }),
  ],
  preview: preview("Afsluiter"),
});

export const sectionTypes = [
  homeHero,
  pageHero,
  clientLogos,
  pillars,
  videoFeature,
  editorial,
  techGrid,
  quote,
  statement,
  intro,
  steps,
  brandGallery,
  story,
  fullImage,
  values,
  cta,
];

/** Slugs die al een eigen pagina in de code hebben; een landingspagina mag die niet overnemen. */
export const RESERVED_SLUGS = ["studio", "api", "our-work", "contact", "sitemap.xml", "robots.txt"];

export const page = defineType({
  name: "page",
  title: "Pagina",
  type: "document",
  groups: [
    { name: "inhoud", title: "Inhoud", default: true },
    { name: "seo", title: "Google (SEO)" },
  ],
  fields: [
    defineField({ name: "title", title: "Naam (alleen intern)", type: "string", group: "inhoud", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Adres",
      description: "Het deel achter navisol.nl/. Voor de homepage: home. Een nieuwe landingspagina krijgt bijv. campagne-zomer.",
      type: "slug",
      group: "inhoud",
      options: { source: "title" },
      validation: (r) =>
        r.required().custom((v) => (v?.current && RESERVED_SLUGS.includes(v.current) ? "Dit adres is al in gebruik door een vaste pagina" : true)),
    }),
    defineField({
      name: "sections",
      title: "Secties (van boven naar beneden)",
      type: "array",
      group: "inhoud",
      of: sectionTypes.map((t) => defineArrayMember({ type: t.name })),
    }),
    defineField({ name: "seoTitle", title: "Titel in Google", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({
      name: "seoDescription",
      title: "Beschrijving in Google",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.max(170),
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
