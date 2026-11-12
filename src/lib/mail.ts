/** Recipients — override with CONTACT_TO (comma-separated) if needed. */
export const RECIPIENTS = (
  process.env.CONTACT_TO ??
  "sales@navisol.nl, info@navisol.nl, erik@navisol.nl"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** Afzender: een adres op een in Resend geverifieerd domein (bijv. website@navisol.nl). */
export function getFrom() {
  // Accepteert "website@navisol.nl" én "Naam <website@navisol.nl>", ook met
  // losse aanhalingstekens of spaties uit de Vercel-instelling.
  const raw = (process.env.CONTACT_FROM ?? "")
    .trim()
    .replace(/^['"]+|['"]+$/g, "")
    .trim();
  const email = raw.match(/<([^>]+)>/)?.[1] ?? raw;
  return email.trim() || "onboarding@resend.dev";
}

/** Is de mailservice (Resend) ingesteld? */
export function isMailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

type MailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

/**
 * Verstuurt een mail via de Resend REST API. Gooit een Error met de
 * foutmelding van Resend als het mislukt, zodat die in de Vercel-logs staat.
 */
export async function sendMail({ to, subject, text, html, replyTo }: MailInput) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Navisol website <${getFrom()}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
  return res.json() as Promise<{ id: string }>;
}

/** Basic HTML escaping for user-supplied values. */
export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
