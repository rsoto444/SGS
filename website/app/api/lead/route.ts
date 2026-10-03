import { NextResponse } from "next/server";
import { site } from "@/lib/site.config";

// Every form on the site posts here; this forwards to the GHL inbound webhook.
// /service-page collects the webhook up front and writes it into site.config.ts
// as `leadWebhook`. Until then, submissions return a clear error instead of
// vanishing - a lead disappearing silently is the worst failure a money page has.

export async function POST(request: Request) {
  const form = await request.formData();
  const payload = Object.fromEntries(form.entries());

  // Honeypot: real people never fill this hidden field. Pretend success to bots.
  // Newsletter signups land on their own thank-you page so conversions stay separate.
  const done = payload.type === "newsletter" ? "/thank-you/newsletter" : "/thank-you";
  if (payload.company_website) return NextResponse.redirect(new URL(done, request.url), 303);
  delete payload.company_website;

  const cfg = site as Record<string, unknown>;
  const isNewsletter = payload.type === "newsletter";
  // Newsletter signups use their own webhook when set; otherwise the main one, as before.
  const webhook = ((isNewsletter && (cfg.newsletterWebhook as string | null)) || cfg.leadWebhook) as string | null | undefined;
  // Never send empty values for a newsletter signup, so a blank field cannot wipe data on an existing contact.
  if (isNewsletter) for (const k of Object.keys(payload)) if (payload[k] === "") delete payload[k];
  if (!webhook || String(webhook).includes("TODO")) {
    return NextResponse.json(
      { ok: false, error: "Lead webhook not connected. Run /service-page or set leadWebhook in lib/site.config.ts." },
      { status: 503 },
    );
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, source: "shoplocalprovo.com", page: request.headers.get("referer") ?? "" }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: `Webhook responded ${res.status}` }, { status: 502 });
  }
  return NextResponse.redirect(new URL(done, request.url), 303);
}
