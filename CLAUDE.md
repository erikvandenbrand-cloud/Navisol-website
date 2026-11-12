# Navisol website — huisregels voor Claude

Website van Navisol B.V. (navisol.nl), Elburg. Next.js 16 (App Router), React 19, Tailwind, Bun.
Hosting: Vercel. Code: GitHub. CMS: Sanity (Studio op /studio).
Eagle Boats is een merk van Navisol en heeft een eigen repo (eagle-boats-website).

## Werkwijze
- Werk nooit direct op `main`. Altijd een eigen branch + pull request.
- Elke PR krijgt automatisch een Vercel-previewlink; Erik keurt goed en merget zelf.
- Houd wijzigingen klein en per onderwerp. Geen redesign tenzij gevraagd.
- Draai `bun run build` voordat je een PR opent; de build moet slagen.
- Commitberichten in het Nederlands; leg uit waarom, niet alleen wat.

## Niet breken
- URL's blijven exact gelijk (SEO). Nieuwe of hernoemde pagina's: altijd redirect + sitemap bijwerken.
- Elke pagina bestaat in NL en EN (taalkeuze via `language-context`, inhoud in `src/lib/content.ts`). Wijzig je de ene taal, check de andere.
- Het contactformulier post naar `/api/contact` (SMTP via `src/lib/mail.ts`). Wijzig je het formulier: test met een echte inzending op de preview.
- Maandelijkse testmail via Vercel Cron (`/api/cron/test-email`, beveiligd met `CRON_SECRET`).

## Omgevingsvariabelen (Vercel)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM`, `CONTACT_TO` — contactformulier.
- `CRON_SECRET`, `TEST_EMAIL_TO` — maandelijkse testmail.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` — Sanity.

## Sanity
- Schema's in `src/sanity/schemaTypes/`, Studio-config in `sanity.config.ts`.
- Nu in Sanity: projecten op "Ons werk" (`workItem`, tweetalig, velden `nl`/`en`), gelezen via `getWorkItems()` (`src/sanity/work.ts`).
- Is Sanity niet ingesteld of leeg, dan toont de site de vaste inhoud uit `src/lib/content.ts`. De site blijft dus werken zonder CMS.
- Gepubliceerde wijzigingen staan binnen 60 seconden op de site (revalidate).
- Meer onderdelen naar Sanity verplaatsen: schema + fetch-functie toevoegen en een terugval houden op `content.ts`.
- Geen klant- of persoonsgegevens in Sanity: de dataset is openbaar leesbaar.

## Structuur
- `src/app/` — pagina's
- `src/lib/content.ts` — alle teksten en projecten (NL/EN), ook terugval voor Sanity
- `src/components/` — gedeelde onderdelen
- `src/sanity/` — Sanity-env, schema's en fetch-functies
