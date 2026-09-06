// components/CategoryTiles.tsx
import Image from 'next/image';
import Link from 'next/link';

type Collection = {
  id: string;
  title: string;
  handle: string;
  image: { url: string; altText?: string } | null;
};

export default function CategoryTiles({ collections }: { collections: Collection[] }) {
  if (!collections.length) return null;

  return (
    <section className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="relative h-[420px] group overflow-hidden bg-neutral-200"
          >
            {collection.image && (
              <Image
                src={collection.image.url}
                alt={collection.image.altText ?? collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <span className="font-display text-2xl uppercase text-white tracking-wide">
                {collection.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}