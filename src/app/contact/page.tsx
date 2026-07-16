"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { content, CONTACT_DETAILS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = content[lang].contact;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [botField, setBotField] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, botField }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="bg-[hsl(var(--ink))] pb-16 pt-36 text-white md:pb-24 md:pt-44">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow text-[hsl(var(--accent-light))]">{t.heroEyebrow}</p>
            <h1 className="display-hero mt-5 max-w-4xl text-balance text-white">
              {t.heroTitle}
            </h1>
            <p className="lead mt-6 max-w-2xl text-white/80">{t.heroLead}</p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Info */}
          <Reveal className="lg:col-span-5">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[hsl(var(--ink))]">
              {t.infoTitle}
            </h2>
            <div className="mt-8 space-y-7">
              <InfoItem icon={<MapPin className="h-5 w-5" />} label={t.visit}>
                <a
                  href={CONTACT_DETAILS.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[hsl(var(--ink))]"
                >
                  {CONTACT_DETAILS.address1}, {CONTACT_DETAILS.address2}
                </a>
              </InfoItem>
              <InfoItem icon={<Phone className="h-5 w-5" />} label={t.call}>
                <a href={CONTACT_DETAILS.phoneHref} className="text-[hsl(var(--ink))]">
                  {CONTACT_DETAILS.phone}
                </a>
              </InfoItem>
              <InfoItem icon={<Mail className="h-5 w-5" />} label={t.email}>
                <a
                  href={CONTACT_DETAILS.emailHref}
                  className="link-underline text-[hsl(var(--ink))]"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </InfoItem>
              <InfoItem icon={<Clock className="h-5 w-5" />} label={t.hours}>
                <span>{t.hoursValue}</span>
              </InfoItem>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <div className="border border-[hsl(var(--line))] bg-[hsl(var(--paper))] p-7 md:p-10">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-[hsl(var(--ink))]">
                {t.formTitle}
              </h2>

              {submitted ? (
                <p className="mt-6 rounded-md bg-[hsl(var(--accent))]/10 px-5 py-6 text-[hsl(var(--ink))]">
                  {t.success}
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Laat dit veld leeg:{" "}
                      <input
                        name="bot-field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={botField}
                        onChange={(e) => setBotField(e.target.value)}
                      />
                    </label>
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label={t.name}
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <Field
                      id="company"
                      label={t.company}
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="email"
                      type="email"
                      label={t.emailField}
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                    <Field
                      id="phone"
                      type="tel"
                      label={t.phone}
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[hsl(var(--ink-mute))]">
                      {t.subject}
                    </label>
                    <select
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-[hsl(var(--line))] bg-transparent px-4 py-3 text-[hsl(var(--ink))] outline-none transition focus:border-[hsl(var(--accent))]"
                    >
                      <option value="">—</option>
                      {t.subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-[hsl(var(--ink-mute))]">
                      {t.message}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none border border-[hsl(var(--line))] bg-transparent px-4 py-3 text-[hsl(var(--ink))] outline-none transition focus:border-[hsl(var(--accent))]"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {t.error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-round btn-ink w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? t.sending : t.send}
                    {!submitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ink-mute))]">
          {label}
        </p>
        <div className="mt-1 text-[hsl(var(--ink-soft))]">{children}</div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-wider text-[hsl(var(--ink-mute))]">
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[hsl(var(--line))] bg-transparent px-4 py-3 text-[hsl(var(--ink))] outline-none transition focus:border-[hsl(var(--accent))]"
      />
    </div>
  );
}
