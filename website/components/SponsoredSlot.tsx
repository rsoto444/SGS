import Link from "next/link";

// House promo until a real advertiser is booked. Labelled honestly - it is our
// own ad, not a paid placement. When ads sell, render the advertiser here.
export default function SponsoredSlot() {
  return (
    <div className="sl-ad">
      <small>Advertise on Shop Local Provo</small>
      <strong>Put your business at the top of this page</strong>
      <Link href="/advertise" className="sl-btn sl-btn-ghost">See ad options</Link>
    </div>
  );
}
