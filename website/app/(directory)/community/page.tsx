import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Provo Community Group",
  description: "Shop Local Provo works hand in hand with the Provo Community Facebook group. See how the group and the directory help neighbors and local businesses.",
  alternates: { canonical: "/community" },
};

export default function Community() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 800 }}>
      <div className="sl-page-head">
        <span className="sl-eyebrow">Our community</span>
        <h1 style={{ marginTop: 8 }}>Shop Local Provo and the {site.community.name} group</h1>
        <p>Two things built to work together: a Facebook group where neighbors talk, and a directory where they can find local businesses.</p>
      </div>

      <div style={{ display: "grid", gap: 16, maxWidth: "66ch" }}>
        <h2>The group</h2>
        <p>{site.community.name} is a private Facebook group with {site.community.members} members. It is where people in Provo ask questions, share news and help each other out.</p>
        <p><a href={site.community.url} target="_blank" rel="noopener">Request to join the {site.community.name} group</a>. It is private, so your request is approved by the group's admin.</p>

        <h2 style={{ marginTop: 16 }}>The directory</h2>
        <p>Shop Local Provo lists local businesses by category, with phone, website, address and hours. Listing is free. When a neighbor asks the group "who do you recommend for this?", the directory is a good place to start.</p>

        <h2 style={{ marginTop: 16 }}>How they work together</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
          <li>Group members who own a business can add a free listing in about two minutes.</li>
          <li>Listings from group members can carry a <span className="sl-badge">Provo Community member</span> badge. We confirm membership in the group before the badge is shown.</li>
          <li>Residents can browse the directory, or ask to be matched with a local pro.</li>
        </ul>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          <Link href="/add-business?utm_source=community-page&utm_medium=site" className="sl-btn sl-btn-primary sl-btn-lg">Add your business</Link>
          <Link href="/categories" className="sl-btn sl-btn-ghost sl-btn-lg">Browse the directory</Link>
        </div>
      </div>
    </div>
  );
}
