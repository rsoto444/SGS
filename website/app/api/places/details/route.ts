import { NextResponse } from "next/server";
import { placesKey, typeToCategory } from "@/lib/places";

export async function GET(request: Request) {
  const key = placesKey();
  if (!key) return NextResponse.json({ ok: false, error: "lookup-not-configured" }, { status: 503 });

  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[A-Za-z0-9_-]{10,200}$/.test(id)) return NextResponse.json({ ok: false, error: "bad-id" }, { status: 400 });

  const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,regularOpeningHours.weekdayDescriptions,types,primaryType",
    },
  });
  if (!res.ok) return NextResponse.json({ ok: false, error: "lookup-failed" }, { status: 502 });

  const p = await res.json();
  const types: string[] = [p.primaryType, ...(p.types ?? [])].filter(Boolean);
  const category = types.map((t) => typeToCategory[t]).find(Boolean) ?? "";
  return NextResponse.json({
    ok: true,
    place: {
      placeId: p.id as string,
      name: p.displayName?.text ?? "",
      address: p.formattedAddress ?? "",
      phone: p.nationalPhoneNumber ?? "",
      website: p.websiteUri ?? "",
      hours: (p.regularOpeningHours?.weekdayDescriptions ?? []).join("\n"),
      category,
    },
  });
}
