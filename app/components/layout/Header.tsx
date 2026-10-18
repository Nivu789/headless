// components/Header.tsx
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const navLinks = [
  { label: 'New Arrivals', href: '/#new-arrivals' },
  { label: 'Best Sellers', href: '/#best-sellers' },
  { label: 'Collections', href: '/#collections' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Community', href: '/#community' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-display text-xl uppercase tracking-wide">
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wide text-white/80 hover:text-[#FF6B3D] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <Link href="/account" className="hover:text-[#FF6B3D] transition" aria-label="Account">
            Account
          </Link>
          <Link href="/search" className="hover:text-[#FF6B3D] transition" aria-label="Search">
            Search
          </Link>
          <Link href="/cart" className="hover:text-[#FF6B3D] transition" aria-label="Cart">
            Cart (0)
          </Link>
        </div>
      </div>
    </header>
  );
}
