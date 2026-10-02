// Best-effort per-visitor limit for the Maps lookup. Each lookup costs a little, and the
// routes are public, so this stops one visitor (or a script) from running up the bill.
// In-memory: it resets when the server restarts and is per server instance on Vercel, so
// the hard cap is the daily quota set in Google Cloud. This is the first line of defense.
const hits = new Map<string, number[]>();

export function tooMany(request: Request, limit = 40, windowMs = 60_000): boolean {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > windowMs) hits.delete(k);
  return recent.length > limit;
}
