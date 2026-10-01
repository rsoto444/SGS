import Link from "next/link";
import type { Metadata } from "next";

// NEVER indexed: it would wreck the conversion count. Excluded from the sitemap.
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYou() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 720, textAlign: "center", padding: "72px var(--gutter)" }}>
      <h1>Got it, thank you.</h1>
      <p style={{ font: "var(--type-body-lg)", marginTop: 16 }}>
        Your submission is in. A person reviews every request, and listings are checked before they go live.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
        <Link href="/categories" className="sl-btn sl-btn-primary">Browse categories</Link>
        <Link href="/" className="sl-btn sl-btn-ghost">Back to home</Link>
      </div>
      {/* CONVERSION TRACKING FIRES HERE (GA4 / Google Ads / pixels), on page load. Added by /tracking. */}
    </div>
  );
}
