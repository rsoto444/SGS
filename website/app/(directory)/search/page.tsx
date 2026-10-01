import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/categories";
import { listings } from "@/lib/directory";
import SearchBox from "@/components/SearchBox";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const catHits = term ? categories.filter((c) => (c.name + " " + c.blurb).toLowerCase().includes(term)).slice(0, 12) : [];
  const catSlugs = new Set(catHits.map((c) => c.slug));
  const hits = term
    ? listings.filter((l) =>
        [l.name, l.description, ...(l.services ?? [])].join(" ").toLowerCase().includes(term) ||
        l.categories.some((s) => catSlugs.has(s)))
    : [];

  return (
    <div className="sl-wrap">
      <div className="sl-page-head">
        <h1>Search Provo businesses</h1>
        <div style={{ marginTop: 20 }}><SearchBox q={q} dark={false} /></div>
      </div>
      {term && (
        <>
          {catHits.length > 0 && (
            <section>
              <h2 style={{ fontSize: 22 }}>Categories</h2>
              <div className="sl-chips">
                {catHits.map((c) => <Link key={c.slug} href={`/category/${c.slug}`} className="sl-btn sl-btn-ghost">{c.name}</Link>)}
              </div>
            </section>
          )}
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 22 }}>Businesses</h2>
            {hits.length > 0 ? (
              <div className="sl-grid cols-3">{hits.map((l) => <ListingCard key={l.slug} l={l} />)}</div>
            ) : (
              <div className="sl-empty" style={{ marginTop: 16 }}>
                <h3>No listings match &ldquo;{q}&rdquo; yet</h3>
                <p style={{ marginBottom: 20 }}>Tell us what you are looking for and we will pass it to local businesses.</p>
                <Link href="/get-matched" className="sl-btn sl-btn-primary">Get matched</Link>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
