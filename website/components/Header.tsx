"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/categories", label: "Categories" },
  { href: "/search", label: "Search" },
  { href: "/get-matched", label: "Get matched" },
  { href: "/advertise", label: "Advertise" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sl-header">
      <div className="sl-wrap">
        <Link href="/" className="sl-logo">Shop Local <span>Provo</span></Link>
        <nav className={`sl-nav${open ? " open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          {open && <Link href="/add-business" onClick={() => setOpen(false)}>Add your business</Link>}
        </nav>
        <Link href="/add-business" className="sl-btn sl-btn-primary sl-header-cta">Add your business - free</Link>
        <button className="sl-menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
      </div>
    </header>
  );
}
