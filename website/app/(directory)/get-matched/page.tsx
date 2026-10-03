import type { Metadata } from "next";
import { site } from "@/lib/site.config";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Get Matched With a Local Provo Pro",
  description: "Tell us what you need and we will pass your request to a local Provo business.",
  alternates: { canonical: "/get-matched" },
};

export default function GetMatched() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 720 }}>
      <div className="sl-page-head">
        <span className="sl-eyebrow">Free for you</span>
        <h1 style={{ marginTop: 8 }}>Get matched with a local pro</h1>
        <p>Not sure who to call? Describe what you need and we will pass your request to a local Provo business in that category.</p>
      </div>
      <div className="sl-panel"><LeadForm type="lead-referral" button="Get matched" /></div>
      <p className="sl-note" style={{ marginTop: 20 }}>
        Prefer to talk? Call <a href={`tel:${site.phoneTel}`}>{site.phone}</a>. {site.phoneNote} It will ask before sharing your details with a business.
      </p>
    </div>
  );
}
