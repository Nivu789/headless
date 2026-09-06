// components/Footer.tsx
import Link from 'next/link';

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Best Sellers', href: '/collections/best-sellers' },
      { label: 'Collections', href: '/collections' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/pages/contact' },
      { label: 'Shipping & Returns', href: '/pages/shipping' },
      { label: 'FAQs', href: '/pages/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/pages/about' },
      { label: 'Terms of Service', href: '/pages/terms' },
      { label: 'Privacy Policy', href: '/pages/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        <div>
          <span className="font-display text-xl uppercase tracking-wide">Your Store</span>
          <p className="text-sm text-white/60 mt-3 max-w-xs">
            Placeholder footer content — swap in real store details, socials, and newsletter signup here.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/45 mb-4">{column.title}</h3>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/75 hover:text-[#FF6B3D] transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>© {new Date().getFullYear()} Your Store. All rights reserved.</span>
          <span>Placeholder footer — not final content</span>
        </div>
      </div>
    </footer>
  );
}
