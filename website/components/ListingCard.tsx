import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { categoryNames, type Listing } from "@/lib/directory";

export default function ListingCard({ l }: { l: Listing }) {
  const cats = categoryNames(l).slice(0, 2);
  return (
    <Link href={`/business/${l.slug}`} className={`sl-card${l.tier === "premium" ? " premium" : ""}`}>
      {l.tier === "premium" && <span className="sl-badge dark">Featured</span>}
      <h3>{l.name}</h3>
      {cats.length > 0 && <span className="sl-meta">{cats.map((c) => c.name).join(" · ")}</span>}
      {l.description && <p>{l.description.length > 140 ? l.description.slice(0, 137) + "..." : l.description}</p>}
      <div className="sl-meta">
        {l.address && <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><MapPin size={14} />{l.address}</span>}
        {l.phone && <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Phone size={14} />{l.phone}</span>}
      </div>
    </Link>
  );
}
