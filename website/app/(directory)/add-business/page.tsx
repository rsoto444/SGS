import type { Metadata } from "next";
import Link from "next/link";
import AddBusinessForm from "@/components/AddBusinessForm";

export const metadata: Metadata = {
  title: "Add Your Business - Free Listing",
  description: "List your Provo business on Shop Local Provo for free. Find it on Google Maps and we fill in the details.",
  alternates: { canonical: "/add-business" },
};

export default function AddBusiness() {
  return (
    <div className="sl-wrap" style={{ maxWidth: 760 }}>
      <div className="sl-page-head">
        <span className="sl-eyebrow">Free for every Provo business</span>
        <h1 style={{ marginTop: 8 }}>Add your business</h1>
        <p>Search for your business on Google Maps, check the details we pull in, and send it. We review every listing before it goes live.</p>
      </div>
      <div className="sl-panel"><AddBusinessForm /></div>

      <section style={{ marginTop: 48, display: "grid", gap: 16 }}>
        <h2>What happens after you submit</h2>
        <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
          <li>Your details go to our team, and a person reviews every listing before it goes live.</li>
          <li>We may email you if something needs fixing, such as an out-of-date phone number or a category that does not fit.</li>
          <li>Once approved, your business gets its own page and appears in its category, with your phone, website, address and hours.</li>
        </ol>
      </section>

      <section style={{ marginTop: 40, display: "grid", gap: 20 }}>
        <h2>Common questions</h2>
        <div>
          <h3 style={{ fontSize: 18 }}>Is it really free?</h3>
          <p style={{ marginTop: 6 }}>Yes. A basic listing costs nothing. Premium listings and ads are optional upgrades, and you can <Link href="/advertise">see what they include</Link>.</p>
        </div>
        <div>
          <h3 style={{ fontSize: 18 }}>Where do the details come from?</h3>
          <p style={{ marginTop: 6 }}>When you pick your business from the Google Maps search, we pre-fill your address, phone, website and hours so you do not have to retype them. You check and change anything before you send. Not on Google Maps? Fill in the form by hand.</p>
        </div>
        <div>
          <h3 style={{ fontSize: 18 }}>Who can list a business?</h3>
          <p style={{ marginTop: 6 }}>Owners and staff who are authorized to represent a business in Provo or nearby in Utah Valley. You confirm this when you submit.</p>
        </div>
        <div>
          <h3 style={{ fontSize: 18 }}>How do I change or remove my listing later?</h3>
          <p style={{ marginTop: 6 }}>Send us a message on the <Link href="/contact">contact page</Link> and choose "Fix or remove a listing".</p>
        </div>
        <div>
          <h3 style={{ fontSize: 18 }}>Can I list more than one business?</h3>
          <p style={{ marginTop: 6 }}>Yes. Submit the form once for each business.</p>
        </div>
      </section>
    </div>
  );
}
