import nodemailer from "nodemailer";

/** Recipients — override with CONTACT_TO (comma-separated) if needed. */
export const RECIPIENTS = (
  process.env.CONTACT_TO ??
  "sales@navisol.nl, info@navisol.nl, erik@navisol.nl"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** The visible "from" address (defaults to the SMTP user). */
export function getFrom() {
  return process.env.CONTACT_FROM ?? process.env.SMTP_USER ?? "";
}

/** Returns a configured SMTP transporter, or null if the env vars are missing. */
export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });
}

/** Basic HTML escaping for user-supplied values. */
export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
