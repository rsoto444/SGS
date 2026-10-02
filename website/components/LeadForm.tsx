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
        <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label>Email (optional)<input name="email" type="email" autoComplete="email" /></label>
      </div>
      {message && (
        <label>Tell us a little about the job
          <textarea name="message" placeholder="What you need, where, and when." />
        </label>
      )}
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input type="checkbox" name="consent_share" value="yes" required style={{ width: "auto", marginTop: 3 }} />
        <span>
          {type === "business-inquiry" && listingName
            ? <>I agree that Shop Local Provo may share my details with {listingName}, who may contact me by phone, text or email about this request.</>
            : <>I agree that Shop Local Provo may share my details with a local business in this category, who may contact me by phone, text or email about this request.</>}
        </span>
      </label>
      <span className="hint">Your details are shared only for this request. See our <a href="/privacy-policy">privacy policy</a>.</span>
      <button className="sl-btn sl-btn-primary sl-btn-lg" type="submit">{button}</button>
    </form>
  );
}
