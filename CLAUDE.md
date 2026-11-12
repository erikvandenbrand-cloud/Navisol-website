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
- Schema's in `src/sanity/schemaTypes/`, Studio-config in `sanity.config.ts`. Project-ID `64dl9630` (kleine letter L, geen cijfer 1), dataset `production`.
- **Pagina's** (Home, Jachtbouw op maat, Ontwikkel- & bouwpartner, Over ons) zijn `page`-documenten opgebouwd uit secties (`src/sanity/schemaTypes/page.ts`), weergave in `src/components/page-sections.tsx`. Alle teksten hebben een NL- en EN-veld.
- **Landingspagina's**: maak in de Studio een nieuwe Pagina met een eigen adres (bijv. `campagne-zomer`). Die staat dan op `navisol.nl/campagne-zomer` via `src/app/[...slug]` en komt vanzelf in de sitemap. Onbekende adressen geven een 404.
- **Projecten** op "Ons werk" zijn `workItem`-documenten, gelezen via `getWorkItems()` (`src/sanity/work.ts`).
- Terugval: bestaat een vaste pagina niet in Sanity (of is Sanity onbereikbaar), dan wordt ze opgebouwd uit `src/lib/content.ts` via `src/lib/legacy-pages.ts`. Dezelfde functie levert de startinhoud voor Sanity. Wijzig je `content.ts`, dan verandert Sanity dus niet mee: bewerk daarna in de Studio.
- Gepubliceerde wijzigingen staan binnen 60 seconden op de site (revalidate).
- Contactpagina en de kop en afsluiter van "Ons werk" staan nog in code (`content.ts`).
- Nieuwe sectie nodig? Voeg schema + weergave toe (zelfde stijl als de bestaande secties) en zet het type in `sectionTypes`.
- Scripts (token in `.env.local` als `SANITY_WRITE_TOKEN`): `scripts/import-work.mjs` (projecten) en `scripts/seed-pages.mjs` (pagina's). Beide draaien eerst als controle; `--write` schrijft. `seed-pages` overschrijft bestaande pagina's alleen met `--force`.
- Geen klant- of persoonsgegevens in Sanity: de dataset is openbaar leesbaar.

## Structuur
- `src/app/` — routes; Home, Over ons, Jachtbouw en Partner renderen uit Sanity (`DynamicPage`)
- `src/lib/content.ts` — alle teksten en projecten (NL/EN), ook terugval voor Sanity
- `src/components/` — gedeelde onderdelen
- `src/sanity/` — Sanity-env, schema's en fetch-functies
