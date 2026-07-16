import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer needs the Node.js runtime (net/tls), not the Edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Recipients — override with the CONTACT_TO env var (comma-separated) if needed.
const TO = (
  process.env.CONTACT_TO ??
  "sales@navisol.nl, info@navisol.nl, erik@navisol.nl"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SUBJECT_LABELS: Record<string, string> = {
  custom: "Jachtbouw op maat",
  partner: "Ontwikkel- & bouwpartner",
  other: "Iets anders",
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name = "",
      company = "",
      email = "",
      phone = "",
      subject = "",
      message = "",
      botField = "",
    } = body ?? {};

    // Honeypot: pretend success for bots that fill the hidden field.
    if (botField) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Vul naam, e-mail en bericht in." },
        { status: 400 },
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.CONTACT_FROM ?? user;

    if (!host || !user || !pass) {
      console.error(
        "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.",
      );
      return NextResponse.json(
        { ok: false, error: "E-mailservice is nog niet geconfigureerd." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: { user, pass },
    });

    const subjectLabel = SUBJECT_LABELS[subject] ?? subject ?? "—";

    const text = [
      `Naam: ${name}`,
      company ? `Bedrijf: ${company}` : null,
      `E-mail: ${email}`,
      phone ? `Telefoon: ${phone}` : null,
      `Onderwerp: ${subjectLabel}`,
      "",
      "Bericht:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const row = (label: string, value: string) =>
      `<tr><td style="padding:4px 20px 4px 0;color:#5b6b75;vertical-align:top;">${label}</td><td style="color:#142430;">${value}</td></tr>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#142430;">
        <h2 style="margin:0 0 16px;font-size:18px;">Nieuw bericht via het contactformulier</h2>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
          ${row("Naam", escapeHtml(name))}
          ${company ? row("Bedrijf", escapeHtml(company)) : ""}
          ${row("E-mail", `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`)}
          ${phone ? row("Telefoon", escapeHtml(phone)) : ""}
          ${row("Onderwerp", escapeHtml(subjectLabel))}
        </table>
        <p style="margin:16px 0 4px;color:#5b6b75;font-size:14px;">Bericht</p>
        <p style="white-space:pre-wrap;margin:0;font-size:14px;">${escapeHtml(message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Navisol website" <${from}>`,
      to: TO,
      replyTo: `"${String(name).replace(/"/g, "")}" <${email}>`,
      subject: `Contactformulier — ${subjectLabel} (${name})`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Verzenden mislukt." },
      { status: 500 },
    );
  }
}
