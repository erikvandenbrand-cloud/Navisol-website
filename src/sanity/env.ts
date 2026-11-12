// Publieke Sanity-instellingen (geen geheimen). Zet ze in Vercel en .env.local.
// Standaard het Navisol-project; is Sanity leeg of onbereikbaar, dan toont de site de inhoud uit src/lib/content.ts.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "64d19630";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";
