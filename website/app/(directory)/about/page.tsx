import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "About",
  description: "Shop Local Provo is a free local business directory for Provo, Utah, run by Provo SEO Pros.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 760 }}>
      <div className="sl-page-head">
        <h1>About Shop Local Provo</h1>
        <p>A free directory that makes it easy to find and choose local businesses in Provo, Utah.</p>
      </div>
      <div style={{ display: "grid", gap: 16, maxWidth: "66ch" }}>
        <p>Shop Local Provo lists businesses across Provo by category, with the details people need to get in touch: phone, website, address and hours.</p>
        <p>Listing is free. Businesses can add their own listing and, if they want more visibility, upgrade to a premium listing or advertise.</p>
        <p>The directory is run by <a href={site.parent.url}>{site.parent.name}</a>, a local SEO and lead generation team. When someone asks to be matched with a pro, we pass the request on to local businesses in that category.</p>
        <p><Link href="/add-business">Add your business</Link> or <Link href="/contact">get in touch</Link>.</p>
      </div>
    </div>
  );
}
