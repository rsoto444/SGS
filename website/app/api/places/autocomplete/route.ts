import { NextResponse } from "next/server";
import { site } from "@/lib/site.config";
import { tooMany } from "@/lib/ratelimit";
import { placesKey } from "@/lib/places";

export async function GET(request: Request) {
  const key = placesKey();
  if (tooMany(request)) return NextResponse.json({ ok: false, error: "slow-down" }, { status: 429 });
  if (!key) return NextResponse.json({ ok: false, error: "lookup-not-configured" }, { status: 503 });

  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 3 || q.length > 120) return NextResponse.json({ ok: true, suggestions: [] });

  const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key },
    body: JSON.stringify({
      input: q,
      includedRegionCodes: ["us"],
      locationBias: { circle: { center: { latitude: site.geo.lat, longitude: site.geo.lng }, radius: site.geo.radiusMeters } },
    }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: "lookup-failed" }, { status: 502 });

  const data = await res.json();
  const suggestions = (data.suggestions ?? [])
    .map((s: any) => s.placePrediction)
    .filter(Boolean)
    .slice(0, 6)
    .map((p: any) => ({
      placeId: p.placeId as string,
      name: (p.structuredFormat?.mainText?.text ?? p.text?.text ?? "") as string,
      detail: (p.structuredFormat?.secondaryText?.text ?? "") as string,
    }));
  return NextResponse.json({ ok: true, suggestions });
}
