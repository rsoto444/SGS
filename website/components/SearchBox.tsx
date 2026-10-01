export default function SearchBox({ q = "", dark = false }: { q?: string; dark?: boolean }) {
  return (
    <form className="sl-search" action="/search" role="search" style={dark ? undefined : { boxShadow: "var(--shadow-sm)", border: "1px solid var(--line-strong)" }}>
      <label htmlFor="q" style={{ position: "absolute", left: -9999 }}>Search Provo businesses and categories</label>
      <input id="q" name="q" defaultValue={q} placeholder="Search plumbers, pizza, dentists..." autoComplete="off" />
      <button className="sl-btn sl-btn-dark sl-btn-lg" type="submit">Search</button>
    </form>
  );
}
