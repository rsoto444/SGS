import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Advertise and Premium Listings",
  description: "Get more visibility on Shop Local Provo with a premium listing or an ad in your category.",
  alternates: { canonical: "/advertise" },
};

const price = (p: string | null) => p ?? "Contact us for pricing";

export default function Advertise() {
  return (
    <div className="sl-wrap">
      <div className="sl-page-head">
        <span className="sl-eyebrow">For businesses</span>
        <h1 style={{ marginTop: 8 }}>More visibility for your business</h1>
        <p>Every listing is free. Premium listings and ads put you in front of more people looking in your category.</p>
      </div>
      <div className="sl-pricing">
        <div className="sl-panel sl-plan">
          <span className="sl-badge">Free</span>
          <span className="price">$0</span>
          <ul>
            <li>Your own business page</li>
            <li>Listed in your category</li>
            <li>Phone, website, address and hours</li>
            <li>Call back requests from visitors</li>
          </ul>
          <Link href="/add-business" className="sl-btn sl-btn-ghost">Add your business</Link>
        </div>
        <div className="sl-panel sl-plan" style={{ border: "2px solid var(--line-brand)" }}>
          <span className="sl-badge dark">Premium listing</span>
          <span className="price" style={{ fontSize: 20 }}>{price(site.plans.premiumPrice)}</span>
          <ul>
            <li>Everything in Free</li>
            <li>Featured badge and highlighted card</li>
            <li>Shown above free listings in your category</li>
            <li>Shown on the home page</li>
            <li>Longer description, services list and more detail</li>
          </ul>
          <Link href="/contact?topic=premium" className="sl-btn sl-btn-primary">Ask about premium</Link>
        </div>
        <div className="sl-panel sl-plan">
          <span className="sl-badge">Advertising</span>
          <span className="price" style={{ fontSize: 20 }}>{price(site.plans.adPrice)}</span>
          <ul>
            <li>Sponsored placement on category pages</li>
            <li>Sponsored placement on the home page</li>
            <li>Clearly labeled as an ad</li>
          </ul>
          <Link href="/contact?topic=ads" className="sl-btn sl-btn-ghost">Ask about ads</Link>
        </div>
      </div>
      <p className="sl-note" style={{ marginTop: 28 }}>
        We do not promise rankings, traffic or customers. Premium placement means more visibility on this site, and results depend on your business and category.
      </p>
    </div>
  );
}
