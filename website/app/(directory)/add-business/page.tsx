import type { Metadata } from "next";
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
    </div>
  );
}
