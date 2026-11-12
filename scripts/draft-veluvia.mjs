// Zet het voorstel voor de landingspagina /veluvia-920 als CONCEPT in Sanity.
// Een concept (drafts.*) is niet openbaar: de site toont het pas als jij het
// in de Studio publiceert.
//
//   node scripts/draft-veluvia.mjs           controle
//   node scripts/draft-veluvia.mjs --write   schrijft het concept

import { createClient } from "next-sanity";

try {
  process.loadEnvFile(".env.local");
} catch {}

const write = process.argv.includes("--write");
const token = process.env.SANITY_WRITE_TOKEN;
if (write && !token) throw new Error("SANITY_WRITE_TOKEN ontbreekt in .env.local");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "64dl9630",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const bi = (nl, en) => ({ nl, en });
const photo = (url) => ({ _type: "photo", url });
let n = 0;
const k = (type) => `veluvia-${type}-${++n}`;
const sec = (type, data) => ({ _type: type, _key: k(type), ...data });
const withKeys = (items, type) => items.map((i) => ({ _type: type, _key: k(type), ...i }));

const sections = [
  sec("pageHero", {
    eyebrow: bi("Jacht op maat · Rondvaart", "Custom yacht · Sightseeing"),
    title: bi("Veluvia 920", "Veluvia 920"),
    lead: bi(
      "Een elektrische aluminium sloep van 9,20 meter, gebouwd voor Veluvia Harderwijk. Laag genoeg voor de bruggen van het Waterfront, stil genoeg om aan boord te praten.",
      "An electric aluminium launch of 9.20 metres, built for Veluvia Harderwijk. Low enough for the Waterfront bridges, quiet enough to talk on board.",
    ),
    image: photo("/images/veluvia-920-02.jpg"),
  }),
  sec("intro", {
    title: bi(
      "Een sloep uit 1923, opnieuw gebouwd voor het water van nu",
      "A 1923 launch, rebuilt for today's waters",
    ),
    body: bi(
      "Het ontwerp gaat terug op een reddingssloep die scheepsbouwer Roelof Tiede Oost in 1923 tekende. Navisol bouwde het schip na in aluminium, met authentieke details en moderne voorzieningen: een elektrische aandrijving, comfortabele zittingen en kachels, zodat het seizoen doorloopt tot in oktober. Op 10 juli 2026 leverden we de Veluvia 920 op aan Veluvia Harderwijk.",
      "The design goes back to a rescue launch drawn by shipbuilder Roelof Tiede Oost in 1923. Navisol rebuilt it in aluminium, with authentic details and modern facilities: electric propulsion, comfortable seating and heaters, so the season runs into October. On 10 July 2026 we delivered the Veluvia 920 to Veluvia Harderwijk.",
    ),
  }),
  sec("techGrid", {
    eyebrow: bi("Het schip", "The vessel"),
    title: bi("Veluvia 920 in vier punten", "Veluvia 920 in four points"),
    items: withKeys(
      [
        {
          title: bi("9,20 m, 12 personen", "9.20 m, 12 people"),
          body: bi(
            "De grootste rondvaartsloep die comfortabel onder de bruggen van het Waterfront door kan.",
            "The largest sightseeing launch that fits comfortably under the Waterfront bridges.",
          ),
        },
        {
          title: bi("Elektrisch: 15 kW, 30 kWh", "Electric: 15 kW, 30 kWh"),
          body: bi(
            "Tot 16 uur varen op één lading, kruisend op 4 à 5 knopen. Op volle snelheid twee uur. Laden aan de wal duurt zes uur.",
            "Up to 16 hours on a single charge, cruising at 4 to 5 knots. Two hours at full speed. Charging ashore takes six hours.",
          ),
        },
        {
          title: bi("Doorvaarthoogte 1,40 m", "Air draft 1.40 m"),
          body: bi(
            "De eis van de opdrachtgever, vertaald naar een laag, breed en stabiel casco. Doorgerekend door Herbert van den Brand van Flamme Yacht Design.",
            "The client's requirement, turned into a low, wide and stable hull. Calculated by Herbert van den Brand of Flamme Yacht Design.",
          ),
        },
        {
          title: bi("Aluminium romp", "Aluminium hull"),
          body: bi(
            "Overnaads gevormd uit gesneden platen, gelast, gestraald en in Elburg in kleur gespoten en afgebouwd.",
            "Clinker-shaped from cut plates, welded, blasted, then painted and fitted out in Elburg.",
          ),
        },
      ],
      "techItem",
    ),
  }),
  sec("editorial", {
    eyebrow: bi("Het project", "The project"),
    blocks: withKeys(
      [
        {
          layout: "left",
          image: photo("/images/veluvia-920-01.jpg"),
          title: bi("Van oude tekening naar nieuwe sloep", "From old drawing to new launch"),
          body: bi(
            "Het project liep sinds 2015 in fases. Het originele ontwerp uit 1923 kreeg een 3D-uitwerking, waarna wij de tekeningen, de vaareigenschappen en de uitstraling uitwerkten. Het hout van het origineel is vervangen door aluminium; de bolders komen uit de smederij van Veluvia, de zittingen maakte onze eigen meubelmaker.",
            "The project ran in phases since 2015. The original 1923 design was worked out in 3D, after which we developed the drawings, handling and looks. The wood of the original was replaced by aluminium; the bollards come from Veluvia's own forge, and our own furniture maker built the seating.",
          ),
        },
        {
          layout: "right",
          image: photo("/images/veluvia-920-02.jpg"),
          title: bi("Aan het werk op het Waterfront", "At work on the Waterfront"),
          body: bi(
            "Op 2 juli 2026 doopte Ruth Roelofsen het schip, een dag later volgde de eerste passagiersvaart door het Waterfront. Reijer en Jacolien Roelofsen van Veluvia Harderwijk varen er rond- en privévaarten mee, langs de boulevard en op het Wolderwijd.",
            "The vessel was christened by Ruth Roelofsen on 2 July 2026, with the first passenger trip through the Waterfront a day later. Reijer and Jacolien Roelofsen of Veluvia Harderwijk use it for sightseeing and private trips along the boulevard and on the Wolderwijd.",
          ),
        },
      ],
      "editorialBlock",
    ),
  }),
  sec("values", {
    eyebrow: bi("Voor rondvaartondernemers", "For sightseeing operators"),
    items: withKeys(
      [
        {
          title: bi("Op jouw route gebouwd", "Built for your route"),
          body: bi(
            "Bruggen, diepgang en vaargebied bepalen het ontwerp, niet andersom.",
            "Bridges, draught and cruising area shape the design, not the other way round.",
          ),
        },
        {
          title: bi("Stil en emissievrij", "Quiet and emission-free"),
          body: bi(
            "Gasten kunnen aan boord praten; geen diesel, geen geur.",
            "Guests can talk on board; no diesel, no fumes.",
          ),
        },
        {
          title: bi("Langer seizoen", "Longer season"),
          body: bi(
            "Met kachels aan boord vaart de sloep door tot in oktober.",
            "With heaters on board the launch keeps sailing into October.",
          ),
        },
      ],
      "valueItem",
    ),
  }),
  sec("cta", {
    eyebrow: bi("Eigen sloep nodig?", "Need a launch of your own?"),
    title: bi("Vertel ons over jouw route", "Tell us about your route"),
    body: bi(
      "Wij ontwerpen en bouwen jachten en passagierssloepen op maat in aluminium. Laat weten wat je nodig hebt, dan denken we met je mee.",
      "We design and build custom aluminium yachts and passenger launches. Tell us what you need and we will think along.",
    ),
    button: bi("Neem contact op", "Get in touch"),
    href: "/contact",
  }),
];

const doc = {
  _id: "drafts.page-veluvia-920",
  _type: "page",
  title: "Veluvia 920",
  slug: { _type: "slug", current: "veluvia-920" },
  seoTitle: "Veluvia 920 — elektrische aluminium rondvaartsloep | Navisol",
  seoDescription:
    "De Veluvia 920: een elektrische aluminium sloep van 9,20 m voor Veluvia Harderwijk, gebouwd door Navisol voor de lage bruggen van het Waterfront.",
  sections,
};

console.log(`${doc.title}: ${sections.length} secties (concept, niet openbaar)`);
if (write) {
  await client.createOrReplace(doc);
  console.log("Concept geschreven: drafts.page-veluvia-920");
} else {
  console.log("Controle klaar. Draai met --write om het concept te schrijven.");
}
