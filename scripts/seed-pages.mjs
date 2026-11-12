// Zet de vaste pagina's (Home, Jachtbouw op maat, Ontwikkel- & bouwpartner,
// Over ons) uit src/lib/content.ts als startinhoud in Sanity.
//
//   node scripts/seed-pages.mjs            controle, schrijft niets
//   node scripts/seed-pages.mjs --write    maakt de pagina's aan die er nog niet zijn
//   node scripts/seed-pages.mjs --write --force   overschrijft ook bestaande (wist je wijzigingen in Sanity!)
//
// Voor --write is SANITY_WRITE_TOKEN nodig in .env.local (Sanity > API > Tokens, rol Editor).

import { createClient } from "next-sanity";
import { content } from "../src/lib/content.ts";
import { buildLegacyPages } from "../src/lib/legacy-pages.ts";

try {
  process.loadEnvFile(".env.local");
} catch {}

const write = process.argv.includes("--write");
const force = process.argv.includes("--force");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "64dl9630";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (write && !token) throw new Error("SANITY_WRITE_TOKEN ontbreekt in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: false, token });
const pages = buildLegacyPages(content);

for (const [slug, p] of Object.entries(pages)) {
  console.log(`${slug}: ${p.sections.length} secties`);
  if (!write) continue;
  const doc = {
    _id: `page-${slug}`,
    _type: "page",
    title: p.title,
    slug: { _type: "slug", current: slug },
    sections: p.sections,
  };
  if (force) await client.createOrReplace(doc);
  else await client.createIfNotExists(doc);
  console.log("  klaar");
}
console.log(write ? "Klaar." : "Controle klaar. Draai met --write om te importeren.");
