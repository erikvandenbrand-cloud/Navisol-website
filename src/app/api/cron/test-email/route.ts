import { NextResponse } from "next/server";
import { RECIPIENTS, getFrom, getTransporter } from "@/lib/mail";

// Nodemailer needs the Node.js runtime (net/tls), not the Edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Only allow Vercel Cron (or someone with the secret) to trigger this.
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json(
      { ok: false, error: "SMTP is niet geconfigureerd." },
      { status: 500 },
    );
  }

  const to = process.env.TEST_EMAIL_TO ?? RECIPIENTS.join(", ");
  const now = new Date().toLocaleString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    await transporter.sendMail({
      from: `"Navisol website" <${getFrom()}>`,
      to,
      subject: `Maandelijkse test — contactformulier werkt (${now})`,
      text:
        "Dit is een automatisch maandelijks testbericht van de Navisol-website.\n\n" +
        "Ontvang je deze mail? Dan werkt de e-mailbezorging van het contactformulier correct.\n\n" +
        `Verzonden: ${now}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#142430;">
          <h2 style="margin:0 0 12px;font-size:18px;">Maandelijkse test — contactformulier</h2>
          <p style="margin:0 0 8px;">Dit is een automatisch maandelijks testbericht van de Navisol-website.</p>
          <p style="margin:0 0 8px;">Ontvang je deze mail? Dan werkt de e-mailbezorging van het contactformulier correct.</p>
          <p style="margin:12px 0 0;color:#5b6b75;font-size:13px;">Verzonden: ${now}</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true, sentTo: to, at: now });
  } catch (err) {
    console.error("Monthly test email error:", err);
    return NextResponse.json(
      { ok: false, error: "Verzenden mislukt." },
      { status: 500 },
    );
  }
}
