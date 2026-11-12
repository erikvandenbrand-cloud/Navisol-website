// Publieke Sanity-instellingen (geen geheimen). Zet ze in Vercel en .env.local.
// Zonder project-ID slaat de site Sanity over en toont de inhoud uit src/lib/content.ts.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";
