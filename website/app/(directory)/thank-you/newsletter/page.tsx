import Link from "next/link";
import type { Metadata } from "next";

// NEVER indexed. Excluded from the sitemap and blocked in robots.
export const metadata: Metadata = {
  title: "You are on the list",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/newsletter" },
};

export default function NewsletterThankYou() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 720, textAlign: "center", padding: "72px var(--gutter)" }}>
      <h1>You are on the list.</h1>
      <p style={{ font: "var(--type-body-lg)", marginTop: 16 }}>
        We will send one email a month for local business owners. You can unsubscribe at any time with the link in each email.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
        <Link href="/add-business" className="sl-btn sl-btn-primary">Add your business - free</Link>
        <Link href="/" className="sl-btn sl-btn-ghost">Back to home</Link>
      </div>
    </div>
  );
}
