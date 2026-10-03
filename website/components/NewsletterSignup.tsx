// Monthly newsletter for local business owners. Plain HTML form that posts to
// /api/lead (GHL webhook) with type=newsletter. No JavaScript needed.
export default function NewsletterSignup({ variant = "panel" }: { variant?: "panel" | "footer" }) {
  return (
    <form className={`sl-form sl-news sl-news-${variant}`} method="post" action="/api/lead">
      <input type="hidden" name="type" value="newsletter" />
      <label className="hp" aria-hidden="true">Leave blank<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      <div className="sl-form-row">
        <label>Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>Business name (optional)
          <input name="business_name" autoComplete="organization" />
        </label>
      </div>
      <label className="sl-news-consent">
        <input type="checkbox" name="consent_newsletter" value="yes" required />
        <span>Send me the monthly newsletter for local business owners. I can unsubscribe at any time.</span>
      </label>
      <button className="sl-btn sl-btn-primary" type="submit">Sign up</button>
      <span className="hint">One email a month. See our <a href="/privacy-policy">privacy policy</a>.</span>
    </form>
  );
}
