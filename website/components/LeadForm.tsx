import { groups } from "@/lib/categories";

// Plain HTML form that posts to /api/lead (GHL webhook). No JavaScript needed.
export default function LeadForm({
  type, categorySlug, listingSlug, listingName, button = "Send request", message = true,
}: {
  type: "lead-referral" | "business-inquiry";
  categorySlug?: string;
  listingSlug?: string;
  listingName?: string;
  button?: string;
  message?: boolean;
}) {
  return (
    <form className="sl-form" method="post" action="/api/lead">
      <input type="hidden" name="type" value={type} />
      {listingSlug && <input type="hidden" name="listing" value={listingSlug} />}
      {listingName && <input type="hidden" name="listing_name" value={listingName} />}
      <label className="hp" aria-hidden="true">Leave blank<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      {!listingSlug && (
        <label>What do you need?
          <select name="category" defaultValue={categorySlug ?? ""} required>
            <option value="" disabled>Pick a category</option>
            {groups.map((g) => (
              <optgroup key={g.slug} label={g.name}>
                {g.categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
      )}
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <div className="sl-form-row">
        <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" /></label>
      </div>
      {message && (
        <label>Tell us a little about the job
          <textarea name="message" placeholder="What you need, where, and when." />
        </label>
      )}
      <span className="hint">Add a phone or an email so we can reach you. We only use your details to pass on this request.</span>
      <button className="sl-btn sl-btn-primary sl-btn-lg" type="submit">{button}</button>
    </form>
  );
}
