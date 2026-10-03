import Link from "next/link";
import { site } from "@/lib/site.config";
import { groups } from "@/lib/categories";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
  return (
    <footer className="sl-footer">
      <div className="sl-wrap">
        <div className="col">
          <strong style={{ font: "var(--weight-black) 22px/1 var(--font-core)", color: "var(--white)", letterSpacing: "-0.03em" }}>Shop Local Provo</strong>
          <p style={{ font: "var(--type-body-sm)", maxWidth: "36ch" }}>{site.tagline}. Free listings for every local business.</p>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.phone && <a href={`tel:${site.phoneTel}`}>{site.phone}</a>}
        </div>
        <div className="col">
          <span className="gw-label">Browse</span>
          {groups.slice(0, 6).map((g) => (
            <Link key={g.slug} href={`/categories#${g.slug}`}>{g.name}</Link>
          ))}
          <Link href="/categories">All categories</Link>
        </div>
        <div className="col">
          <span className="gw-label">For businesses</span>
          <Link href="/add-business">Add your business</Link>
          <Link href="/advertise">Premium listings and ads</Link>
          <Link href="/contact">Contact us</Link>
        </div>
        <div className="col">
          <span className="gw-label">Directory</span>
          <Link href="/get-matched">Get matched with a local pro</Link>
          <Link href="/community">Provo Community group</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <div className="sl-wrap sl-news-wrap">
        <span className="gw-label">Newsletter for local business owners</span>
        <NewsletterSignup variant="footer" />
      </div>
      <div className="sl-wrap legal" style={{ display: "flex" }}>
        <span>&copy; {new Date().getFullYear()} Shop Local Provo</span>
        <span>
          A <a href={site.parent.url}>{site.parent.name}</a> project
        </span>
      </div>
    </footer>
  );
}
