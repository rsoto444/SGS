import { site } from "@/lib/site.config";
import { categories, categoryBySlug } from "@/lib/categories";
import live from "@/data/listings.json";
import sample from "@/data/listings.sample.json";

export type Listing = {
  slug: string;
  name: string;
  categories: string[]; // category slugs
  tier: "free" | "premium";
  // Set to true ONLY after the owner has confirmed this person is in the Provo Community group.
  communityMember?: boolean;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string[];
  services?: string[];
  placeId?: string; // Google Place ID - the only Google field that may be stored long term
  facebook?: string;
  instagram?: string;
};

// Sample listings load ONLY in local development so the layout can be previewed.
// They can never reach the live site.
const all: Listing[] = [
  ...(live as Listing[]),
  ...(process.env.NODE_ENV === "development" ? (sample as Listing[]) : []),
];

const rank = (l: Listing) => (l.tier === "premium" ? 0 : 1);

export const listings = [...all].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
export const listingBySlug = (slug: string) => listings.find((l) => l.slug === slug);
export const listingsInCategory = (slug: string) => listings.filter((l) => l.categories.includes(slug));
export const premiumListings = () => listings.filter((l) => l.tier === "premium");
export const isIndexable = (categorySlug: string) =>
  listingsInCategory(categorySlug).length >= site.minListingsToIndex;
export const categoriesWithCounts = () =>
  categories.map((c) => ({ ...c, count: listingsInCategory(c.slug).length }));
export const categoryNames = (l: Listing) =>
  l.categories.map((s) => categoryBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof categoryBySlug>>[];
