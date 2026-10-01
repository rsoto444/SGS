import type { Metadata } from "next";

// Template demo pages, kept for reference. Never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
