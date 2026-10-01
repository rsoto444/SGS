import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBox from "@/components/SearchBox";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="sl-wrap" style={{ maxWidth: 720, padding: "72px var(--gutter)" }}>
        <h1>That page is not here</h1>
        <p style={{ margin: "12px 0 24px" }}>Try a search, or browse the categories.</p>
        <SearchBox dark={false} />
        <p style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/">Home</Link><Link href="/categories">All categories</Link><Link href="/add-business">Add your business</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
