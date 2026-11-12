// Zet de projecten van "Ons werk" uit src/lib/content.ts in Sanity.
//
//   node scripts/import-work.mjs            controle, schrijft niets
//   node scripts/import-work.mjs --write    uploadt foto's en maakt de documenten
//
// Voor --write is SANITY_WRITE_TOKEN nodig (Sanity > API > Tokens, rol Editor),
// in .env.local. Veilig om opnieuw te draaien: documenten krijgen een vast id
// (workItem-<slug>) en worden overschreven, foto's worden niet dubbel opgeslagen.

import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "next-sanity";
import { content } from "../src/lib/content.ts";

try {
  process.loadEnvFile(".env.local");
} catch {}

const write = process.argv.includes("--write");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "64dl9630";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SITE = "https://navisol.nl";

const nl = content.nl.work.items;
const en = content.en.work.items;
if (nl.length !== en.length) throw new Error("NL en EN hebben niet evenveel projecten");

const token = process.env.SANITY_WRITE_TOKEN;
if (write && !token) throw new Error("SANITY_WRITE_TOKEN ontbreekt in .env.local");
const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: false, token });

for (const [i, a] of nl.entries()) {
  const b = en[i];
  if (a.slug !== b.slug) throw new Error(`Volgorde NL/EN klopt niet bij ${a.slug} / ${b.slug}`);
  console.log(`${a.slug}: ${a.images.length} foto's${a.video ? ", video" : ""}`);
  if (!write) continue;

  const images = [];
  for (const src of a.images) {
    const file = join("public", src);
    const asset = await client.assets.upload("image", readFileSync(file), { filename: basename(file) });
    images.push({ _type: "image", _key: asset._id.slice(-12), asset: { _type: "reference", _ref: asset._id } });
  }
  await client.createOrReplace({
    _id: `workItem-${a.slug}`,
    _type: "workItem",
    title: a.title,
    slug: { _type: "slug", current: a.slug },
    order: (i + 1) * 10,
    category: { nl: a.category, en: b.category },
    year: a.year,
    status: a.status || b.status ? { nl: a.status, en: b.status } : undefined,
    body: { nl: a.body, en: b.body },
    images,
    video: a.video ? SITE + a.video : undefined,
    layout: a.layout,
  });
  console.log("  gemaakt");
}
console.log(write ? "Klaar. Publiceren is niet nodig: documenten staan direct live." : "Controle klaar. Draai met --write om te importeren.");
