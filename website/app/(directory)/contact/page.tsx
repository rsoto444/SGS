import type { Metadata } from "next";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about Shop Local Provo, listings or advertising? Send us a message.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "general" } = await searchParams;
  return (
    <div className="sl-wrap" style={{ maxWidth: 720 }}>
      <div className="sl-page-head">
        <h1>Contact us</h1>
        <p>Questions about a listing, premium placement or advertising? Send a message and a person will reply.</p>
      </div>
      <div className="sl-panel">
        <form className="sl-form" method="post" action="/api/lead">
          <input type="hidden" name="type" value="contact" />
          <label className="hp" aria-hidden="true">Leave blank<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
          <label>Topic
            <select name="topic" defaultValue={["premium", "ads", "general"].includes(topic) ? topic : "general"}>
              <option value="general">General question</option>
              <option value="premium">Premium listing</option>
              <option value="ads">Advertising</option>
              <option value="listing-fix">Fix or remove a listing</option>
            </select>
          </label>
          <label>Your name<input name="name" required autoComplete="name" /></label>
          <div className="sl-form-row">
            <label>Email<input name="email" type="email" required autoComplete="email" /></label>
            <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
          </div>
          <label>Message<textarea name="message" required /></label>
          <button className="sl-btn sl-btn-primary sl-btn-lg" type="submit">Send message</button>
        </form>
      </div>
      {(site.email || site.phone) && (
        <p style={{ marginTop: 20 }}>{site.email && <>Email: <a href={`mailto:${site.email}`}>{site.email}</a> </>}{site.phone && <>Phone: <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a></>}</p>
      )}
    </div>
  );
}
