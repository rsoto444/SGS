import type { Metadata } from "next";
import { site } from "@/lib/site.config";

export const metadata: Metadata = { title: "Terms", robots: { index: false, follow: true }, alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 760 }}>
      <div className="sl-page-head"><h1>Terms of use</h1></div>
      <div style={{ display: "grid", gap: 14, maxWidth: "66ch" }}>
        <p><em>Draft. Have a lawyer review this before relying on it.</em></p>
        <p>{site.name} is a directory. We list local businesses but do not provide their services, and we do not endorse or guarantee any business listed.</p>
        <p>Listing details come from business owners and may be out of date. Confirm details with the business directly.</p>
        <p>By submitting a listing you confirm you are authorized to represent the business and that the details are accurate. We may edit, decline or remove listings at our discretion.</p>
        <p>Premium listings and ads increase visibility on this site. We do not guarantee rankings, traffic, leads or sales.</p>
      </div>
    </div>
  );
}
