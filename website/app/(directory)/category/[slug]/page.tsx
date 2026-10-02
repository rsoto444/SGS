import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/lib/site.config";
import { categories, categoryBySlug, groupBySlug } from "@/lib/categories";
import { listingsInCategory, isIndexable } from "@/lib/directory";
import ListingCard from "@/components/ListingCard";
import LeadForm from "@/components/LeadForm";
import SponsoredSlot from "@/components/SponsoredSlot";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) return {};
  const n = listingsInCategory(slug).length;
  return {
    title: `${c.name} in Provo, UT`,
    description: n > 0
      ? `Find ${c.name.toLowerCase()} in Provo, Utah. ${n} local ${n === 1 ? "listing" : "listings"} with contact details. ${c.blurb}`
      : `${c.blurb} Browse ${c.name.toLowerCase()} in Provo, Utah, or get matched with a local pro.`,
    alternates: { canonical: `/category/${slug}` },
    robots: isIndexable(slug) ? undefined : { index: false, follow: true },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) notFound();
  const group = groupBySlug(c.group)!;
  const items = listingsInCategory(slug);
  const related = group.categories.filter((x) => x.slug !== slug).slice(0, 8);

  return (
    <div className="sl-wrap">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Categories", item: `${site.url}/categories` },
                { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}/category/${slug}` },
              ],
            },
            ...(items.length > 0
              ? [{
                  "@type": "ItemList",
                  name: `${c.name} in Provo, UT`,
                  itemListElement: items.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/business/${l.slug}`, name: l.name })),
                }]
              : []),
          ],
        }}
      />
      <nav className="sl-crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / {c.name}
      </nav>
      <div className="sl-page-head">
        <span className="sl-eyebrow">{group.name}</span>
        <h1 style={{ marginTop: 8 }}>{c.name} in Provo, UT</h1>
        <p>{c.blurb}</p>
      </div>

      <div className="sl-layout">
        <div>
          {items.length > 0 ? (
            <div className="sl-grid cols-2" style={{ marginTop: 0 }}>
              {items.map((l) => <ListingCard key={l.slug} l={l} />)}
            </div>
          ) : (
            <div className="sl-empty">
              <h3>No {c.name.toLowerCase()} listed yet</h3>
              <p style={{ marginBottom: 20 }}>Run a {c.name.toLowerCase().replace(/s$/, "")} business in Provo? Be the first one here, free.</p>
              <Link href="/add-business" className="sl-btn sl-btn-primary">Add your business</Link>
            </div>
          )}
          <div style={{ marginTop: 28 }}><SponsoredSlot /></div>

          <h2 style={{ marginTop: 48, fontSize: 22 }}>Related categories</h2>
          <div style={{ columnWidth: 240, columnGap: 32, marginTop: 8 }}>
            {related.map((r) => <Link key={r.slug} href={`/category/${r.slug}`} className="sl-cat-link" style={{ breakInside: "avoid" }}>{r.name}</Link>)}
          </div>
        </div>
        <aside className="sl-aside">
          <div className="sl-panel">
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>Need {c.name.toLowerCase()}?</h2>
            <p style={{ font: "var(--type-body-sm)", marginBottom: 16 }}>Tell us what you need and we will pass your request to a local business.</p>
            <LeadForm type="lead-referral" categorySlug={slug} button="Get matched" />
          </div>
        </aside>
      </div>
    </div>
  );
}
