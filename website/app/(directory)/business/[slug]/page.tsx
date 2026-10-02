import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Globe, MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site.config";
import { listings, listingBySlug, categoryNames } from "@/lib/directory";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;
// Next requires at least one param when dynamicParams is off and there are no listings yet.
export const generateStaticParams = () => (listings.length ? listings.map((l) => ({ slug: l.slug })) : [{ slug: "_none" }]);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) return {};
  const cat = categoryNames(l)[0]?.name ?? "Local business";
  return {
    title: `${l.name} | ${cat} in Provo, UT`,
    description: l.description?.slice(0, 155) ?? `${l.name} is a ${cat.toLowerCase()} in Provo, Utah. See contact details and hours.`,
    alternates: { canonical: `/business/${slug}` },
  };
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) notFound();
  const cats = categoryNames(l);
  const mapsUrl = l.placeId
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.name)}&query_place_id=${l.placeId}`
    : l.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.name} ${l.address}`)}` : null;

  return (
    <div className="sl-wrap">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: l.name,
          url: `${site.url}/business/${l.slug}`,
          ...(l.description && { description: l.description }),
          ...(l.phone && { telephone: l.phone }),
          ...(l.website && { sameAs: [l.website] }),
          ...(l.address && { address: { "@type": "PostalAddress", streetAddress: l.address, addressLocality: site.city, addressRegion: site.state } }),
          ...(l.hours && { openingHours: l.hours }),
        }}
      />
      <nav className="sl-crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> /{" "}
        {cats[0] ? <><Link href={`/category/${cats[0].slug}`}>{cats[0].name}</Link> / </> : null}
        {l.name}
      </nav>
      <div className="sl-page-head">
        <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {l.tier === "premium" && <span className="sl-badge dark">Featured</span>}
          {l.communityMember && <span className="sl-badge">Provo Community member</span>}
        </span>
        <h1 style={{ marginTop: 8 }}>{l.name}</h1>
        <div className="sl-meta" style={{ marginTop: 10 }}>
          {cats.map((c) => <Link key={c.slug} href={`/category/${c.slug}`}>{c.name}</Link>)}
        </div>
      </div>

      <div className="sl-layout">
        <div style={{ display: "grid", gap: 24 }}>
          {l.description && <section><h2 style={{ fontSize: 22, marginBottom: 8 }}>About</h2><p>{l.description}</p></section>}
          {l.services && l.services.length > 0 && (
            <section><h2 style={{ fontSize: 22, marginBottom: 8 }}>Services</h2>
              <ul style={{ margin: 0, paddingLeft: 20 }}>{l.services.map((s) => <li key={s}>{s}</li>)}</ul>
            </section>
          )}
          {l.hours && l.hours.length > 0 && (
            <section><h2 style={{ fontSize: 22, marginBottom: 8 }}>Hours</h2>
              <div className="sl-hours">{l.hours.map((h) => <span key={h}>{h}</span>)}</div>
            </section>
          )}
          <p className="sl-note">
            Is this your business? <Link href="/add-business">Claim and update this listing</Link>. Details come from the business owner and may change, so confirm hours before you visit.
          </p>
        </div>
        <aside className="sl-aside">
          <div className="sl-panel" style={{ display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: 20 }}>Contact</h2>
            {l.phone && <a className="sl-btn sl-btn-primary" href={`tel:${l.phone.replace(/[^+\d]/g, "")}`}><Phone size={16} />{l.phone}</a>}
            {l.website && <a className="sl-btn sl-btn-ghost" href={l.website} target="_blank" rel="noopener nofollow">Visit website <Globe size={16} /></a>}
            {mapsUrl && <a className="sl-btn sl-btn-ghost" href={mapsUrl} target="_blank" rel="noopener">Get directions <MapPin size={16} /></a>}
            {l.email && <a href={`mailto:${l.email}`} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Mail size={16} />{l.email}</a>}
            {l.address && <span className="sl-meta">{l.address}</span>}
          </div>
          <div className="sl-panel">
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>Request a call back</h2>
            <LeadForm type="business-inquiry" listingSlug={l.slug} listingName={l.name} button="Send request" />
          </div>
        </aside>
      </div>
    </div>
  );
}
