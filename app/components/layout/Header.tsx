// components/Header.tsx
import Link from 'next/link';

const navLinks = [
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/pages/about' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-display text-xl uppercase tracking-wide">
          Your Store
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
