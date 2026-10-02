"use client";
import { useEffect, useRef, useState } from "react";
import { groups } from "@/lib/categories";
import { site } from "@/lib/site.config";

type Suggestion = { placeId: string; name: string; detail: string };
type Fields = { name: string; address: string; phone: string; website: string; hours: string; category: string; placeId: string };
const empty: Fields = { name: "", address: "", phone: "", website: "", hours: "", category: "", placeId: "" };

export default function AddBusinessForm() {
  const [f, setF] = useState<Fields>(empty);
  const [q, setQ] = useState("");
  const [sugg, setSugg] = useState<Suggestion[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "filled" | "off" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipSearch = useRef(false); // set when a pick fills the box, so it does not search again

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (skipSearch.current) { skipSearch.current = false; setSugg([]); return; }
    if (q.trim().length < 3 || status === "filled") { setSugg([]); return; }
    timer.current = setTimeout(async () => {
      try {
        const r = await fetch(`/api/places/autocomplete?q=${encodeURIComponent(q)}`);
        if (r.status === 503) { setStatus("off"); setSugg([]); return; }
        const d = await r.json();
        setSugg(d.suggestions ?? []);
      } catch { setSugg([]); }
    }, 250);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [q, status]);

  async function pick(s: Suggestion) {
    setSugg([]);
    skipSearch.current = true;
    setQ(s.name);
    setStatus("loading");
    try {
      const r = await fetch(`/api/places/details?id=${encodeURIComponent(s.placeId)}`);
      const d = await r.json();
      if (!d.ok) throw new Error();
      setF({ ...empty, ...d.place });
      setStatus("filled");
    } catch { setStatus("error"); }
  }

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <form className="sl-form" method="post" action="/api/lead">
      <input type="hidden" name="type" value="new-listing" />
      <input type="hidden" name="place_id" value={f.placeId} />
      <label className="hp" aria-hidden="true">Leave blank<input name="company_website" tabIndex={-1} autoComplete="off" /></label>

      {status !== "off" && (
        <div className="sl-lookup">
          <label>Find your business on Google Maps
            <input value={q} onChange={(e) => { setQ(e.target.value); if (status === "filled") setStatus("idle"); }} placeholder="Start typing your business name" autoComplete="off" role="combobox" aria-expanded={sugg.length > 0} />
            <span className="hint">We pull in your address, phone, website and hours so you do not retype them. You can change anything below.</span>
          </label>
          {sugg.length > 0 && (
            <div className="sl-suggest" role="listbox">
              {sugg.map((s) => (
                <button type="button" key={s.placeId} onClick={() => pick(s)} role="option">
                  <strong>{s.name}</strong><span>{s.detail}</span>
                </button>
              ))}
            </div>
          )}
          {status === "loading" && <p className="sl-note" style={{ marginTop: 8 }}>Pulling in your details...</p>}
          {status === "filled" && <p className="sl-note" style={{ marginTop: 8 }}>Details filled in from Google Maps. Check them and fix anything that is out of date.</p>}
          {status === "error" && <p className="sl-note" style={{ marginTop: 8 }}>We could not load that listing. Fill in the details below by hand.</p>}
        </div>
      )}

      <label>Business name<input name="business_name" required value={f.name} onChange={set("name")} /></label>
      <label>Main category
        <select name="category" required value={f.category} onChange={set("category")}>
          <option value="" disabled>Pick a category</option>
          {groups.map((g) => (
            <optgroup key={g.slug} label={g.name}>{g.categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</optgroup>
          ))}
        </select>
      </label>
      <label>Address<input name="address" value={f.address} onChange={set("address")} autoComplete="street-address" /></label>
      <div className="sl-form-row">
        <label>Business phone<input name="business_phone" type="tel" value={f.phone} onChange={set("phone")} /></label>
        <label>Website<input name="website" type="url" value={f.website} onChange={set("website")} placeholder="https://" /></label>
      </div>
      <label>Hours<textarea name="hours" value={f.hours} onChange={set("hours")} placeholder={"Monday: 9am-5pm\nTuesday: 9am-5pm"} /></label>
      <label>What does your business do?
        <textarea name="description" placeholder="Two or three plain sentences about what you offer." />
        <span className="hint">Only say what is true. We review every listing before it goes live.</span>
      </label>

      <h3 style={{ marginTop: 8 }}>Who should we contact?</h3>
      <div className="sl-form-row">
        <label>Your name<input name="name" required autoComplete="name" /></label>
        <label>Your email<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <label>Your role
        <select name="role" defaultValue="owner">
          <option value="owner">Owner</option>
          <option value="manager">Manager or staff</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>Interested in more than a free listing?
        <select name="plan_interest" defaultValue="free">
          <option value="free">Free listing only</option>
          <option value="premium">Tell me about a premium listing</option>
          <option value="ads">Tell me about advertising</option>
        </select>
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input type="checkbox" name="lead_opt_in" value="yes" style={{ width: "auto", marginTop: 3 }} />
        <span>I would like to receive customer requests for my category. <span className="hint">Optional. We cannot promise any number of requests, and you can stop at any time.</span></span>
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input type="checkbox" name="community_member" value="yes" style={{ width: "auto", marginTop: 3 }} />
        <span>I am a member of the <a href={site.community.url} target="_blank" rel="noopener">Provo Community Facebook group</a>. <span className="hint">We confirm membership before showing the Provo Community member badge on your listing.</span></span>
      </label>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input type="checkbox" name="confirm" required style={{ width: "auto", marginTop: 3 }} />
        <span>I am authorized to list this business and the details above are accurate.</span>
      </label>
      <button className="sl-btn sl-btn-primary sl-btn-lg" type="submit">Submit my free listing</button>
    </form>
  );
}
