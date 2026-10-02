import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site.config";
import { groups, categoryBySlug } from "@/lib/categories";
import { listings, premiumListings } from "@/lib/directory";
import SearchBox from "@/components/SearchBox";
import ListingCard from "@/components/ListingCard";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import SponsoredSlot from "@/components/SponsoredSlot";

export const metadata: Metadata = {
  title: { absolute: "Shop Local Provo | Local Business Directory for Provo, Utah" },
  description: site.description,
  alternates: { canonical: "/" },
};

const POPULAR = ["plumbers", "restaurants", "dentists", "hvac", "auto-repair", "hair-salons", "house-cleaning", "real-estate-agents"];

export default function Home() {
  const featured = premiumListings().slice(0, 6);
  const recent = listings.filter((l) => l.tier !== "premium").slice(0, 6);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite", name: site.name, url: site.url,
              potentialAction: { "@type": "SearchAction", target: `${site.url}/search?q={search_term_string}`, "query-input": "required name=search_term_string" },
            },
            { "@type": "Organization", name: site.name, url: site.url, parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url } },
          ],
        }}
      />
      <section className="sl-hero">
        <div className="sl-wrap">
          <span className="sl-eyebrow">Provo, Utah</span>
          <h1 style={{ marginTop: 12 }}>Find it local. Shop Provo.</h1>
          <p className="lead">The directory for Provo businesses. Browse by category, see how to reach them, and keep your money in Utah Valley.</p>
          <SearchBox dark />
          <div className="sl-chips">
            {POPULAR.map((s) => {
              const c = categoryBySlug(s);
              return c ? <Link key={s} className="sl-chip" href={`/category/${s}`}>{c.name}</Link> : null;
            })}
          </div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap">
          <span className="sl-eyebrow">Browse</span>
          <h2>Everything Provo has to offer</h2>
          <div className="sl-grid cols-4">
            {groups.map((g) => (
              <Link key={g.slug} href={`/categories#${g.slug}`} className="sl-card">
                <span className="sl-icon"><Icon name={g.icon} /></span>
                <h3>{g.name}</h3>
                <p>{g.categories.slice(0, 3).map((c) => c.name).join(", ")} and more</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="sl-section tint">
          <div className="sl-wrap">
            <span className="sl-eyebrow">Featured</span>
            <h2>Featured Provo businesses</h2>
            <div className="sl-grid cols-3">{featured.map((l) => <ListingCard key={l.slug} l={l} />)}</div>
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="sl-section">
          <div className="sl-wrap">
            <span className="sl-eyebrow">Listings</span>
            <h2>Local businesses</h2>
            <div className="sl-grid cols-3">{recent.map((l) => <ListingCard key={l.slug} l={l} />)}</div>
            <p style={{ marginTop: 24 }}><Link href="/search">Search all listings</Link></p>
          </div>
        </section>
      )}

      {listings.length === 0 && (
        <section className="sl-section">
          <div className="sl-wrap">
            <div className="sl-empty">
              <h3>The directory is just getting started</h3>
              <p style={{ marginBottom: 20 }}>Own a Provo business? Be one of the first listed, free.</p>
              <Link href="/add-business" className="sl-btn sl-btn-primary sl-btn-lg">Add your business</Link>
            </div>
          </div>
        </section>
      )}

      <section className="sl-section tint">
        <div className="sl-wrap">
          <span className="sl-eyebrow">How it works</span>
          <h2>Three ways to use Shop Local Provo</h2>
          <ol className="sl-steps" style={{ padding: 0 }}>
            <li><strong>Browse or search</strong>Pick a category or type what you need. Every listing shows how to reach the business.</li>
            <li><strong>Get matched</strong>Not sure who to call? Tell us what you need and we will pass your request to local businesses.</li>
            <li><strong>List your business</strong>Free for every Provo business. Premium listings and ads are there when you want more visibility.</li>
          </ol>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/add-business" className="sl-btn sl-btn-primary sl-btn-lg">Add your business - free</Link>
            <Link href="/get-matched" className="sl-btn sl-btn-ghost sl-btn-lg">Get matched with a local pro</Link>
          </div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap">
          <div className="sl-panel" style={{ display: "grid", gap: 12, justifyItems: "start", background: "var(--surface-tint)" }}>
            <span className="sl-eyebrow">Our community</span>
            <h2 style={{ margin: 0 }}>Part of the {site.community.name} group</h2>
            <p style={{ maxWidth: "62ch" }}>Shop Local Provo works hand in hand with the {site.community.name} Facebook group, a private community of {site.community.members} members. The group brings neighbors together, and the directory helps them find and support local businesses.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/community" className="sl-btn sl-btn-primary">How it works</Link>
              <a href={site.community.url} className="sl-btn sl-btn-ghost" target="_blank" rel="noopener">Request to join the group</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap"><SponsoredSlot /></div>
      </section>
    </>
  );
}
