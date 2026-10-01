import type { Metadata } from "next";
import { site } from "@/lib/site.config";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false, follow: true }, alternates: { canonical: "/privacy-policy" } };

export default function Privacy() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 760 }}>
      <div className="sl-page-head"><h1>Privacy policy</h1></div>
      <div style={{ display: "grid", gap: 14, maxWidth: "66ch" }}>
        <p><em>Draft. Have a lawyer review this before relying on it.</em></p>
        <p>{site.name} is operated by {site.parent.name}. This page explains what we collect and why.</p>
        <h2 style={{ fontSize: 22 }}>What we collect</h2>
        <p>When you submit a form (add a business, get matched, request a call back or contact us), we collect what you type: name, phone, email, business details and your message. For business listings, we also keep the Google Maps Place ID of the business you select.</p>
        <h2 style={{ fontSize: 22 }}>How we use it</h2>
        <p>We use it to review listings, reply to you, and pass your request to local businesses when you ask to be matched. If you ask to be matched or request a call back, the business you chose or those in that category receive your name and contact details.</p>
        <h2 style={{ fontSize: 22 }}>Analytics and cookies</h2>
        <p>We may use analytics and advertising tags to understand how the site is used. Update this section when tags are added.</p>
        <h2 style={{ fontSize: 22 }}>Your choices</h2>
        <p>To correct or delete your information, use the <a href="/contact">contact page</a>.</p>
      </div>
    </div>
  );
}
