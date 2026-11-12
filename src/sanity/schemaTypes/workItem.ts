import { defineArrayMember, defineField, defineType } from "sanity";

const bilingual = (name: string, title: string, type: "string" | "text" = "string") =>
  defineField({
    name,
    title,
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({ name: "nl", title: "Nederlands", type, ...(type === "text" ? { rows: 4 } : {}) }),
      defineField({ name: "en", title: "English", type, ...(type === "text" ? { rows: 4 } : {}) }),
    ],
  });

export const workItem = defineType({
  name: "workItem",
  title: "Project (Ons werk)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Volgorde (laag eerst)", type: "number", initialValue: 100 }),
    bilingual("category", "Categorie"),
    defineField({ name: "year", title: "Jaar", type: "string" }),
    bilingual("status", "Status (bijv. In aanbouw)"),
    bilingual("body", "Tekst", "text"),
    defineField({
      name: "images",
      title: "Foto's",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "video", title: "Video (link naar .mp4)", type: "url" }),
    defineField({
      name: "layout",
      title: "Opmaak",
      type: "string",
      options: {
        list: [
          { title: "Links", value: "left" },
          { title: "Rechts", value: "right" },
          { title: "Volledige breedte", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
  ],
  orderings: [{ title: "Volgorde", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "year", media: "images.0" } },
});
