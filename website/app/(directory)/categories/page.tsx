import Link from "next/link";
import type { Metadata } from "next";
import { groups } from "@/lib/categories";
import { listingsInCategory } from "@/lib/directory";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse every category of local business in Provo, Utah, from plumbers and dentists to restaurants and gyms.",
  alternates: { canonical: "/categories" },
};

export default function Categories() {
  return (
    <div className="sl-wrap">
      <div className="sl-page-head">
        <span className="sl-eyebrow">Browse</span>
        <h1 style={{ marginTop: 8 }}>All Provo business categories</h1>
        <p>Pick a category to see local businesses and how to contact them.</p>
      </div>
      {groups.map((g) => (
        <section key={g.slug} id={g.slug} style={{ padding: "24px 0", scrollMarginTop: 90 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="sl-icon"><Icon name={g.icon} /></span>
            <h2 style={{ margin: 0 }}>{g.name}</h2>
          </div>
          <div style={{ columnWidth: 260, columnGap: 32, marginTop: 12 }}>
            {g.categories.map((c) => {
              const n = listingsInCategory(c.slug).length;
              return (
                <Link key={c.slug} href={`/category/${c.slug}`} className="sl-cat-link" style={{ breakInside: "avoid" }}>
                  <span>{c.name}</span>
                  {n > 0 && <small>{n} {n === 1 ? "listing" : "listings"}</small>}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
