// components/Reviews.tsx
type Review = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    id: '1',
    name: 'Ananya Rao',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Amazing quality and the fit is perfect. The fabric feels premium and the stitching held up after multiple washes. Definitely ordering again.',
  },
  {
    id: '2',
    name: 'Karan Mehta',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Fast shipping and the product looks even better in person than in the photos. Packaging felt like a proper unboxing experience too.',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Verified Buyer',
    rating: 4,
    text: 'Great value for money. Sizing ran true and the customer support team was quick to help when I had questions about my order.',
  },
  {
    id: '4',
    name: 'Rohit Verma',
    role: 'Verified Buyer',
    rating: 5,
    text: 'This is now my third order from them. Consistent quality every time and the new arrivals never disappoint.',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="relative flex-none w-[320px] md:w-95 bg-white/4 border border-white/10 p-8 pt-10">
      <span className="absolute top-3 left-6 font-display text-6xl text-white/10 leading-none select-none">
        &ldquo;
      </span>

      <div className="relative text-[#FF4619] text-sm mb-5 tracking-wider">
        {'★'.repeat(review.rating)}
        <span className="text-white/20">{'★'.repeat(5 - review.rating)}</span>
      </div>

      <p className="relative text-[15px] leading-relaxed text-white/80 mb-8 min-h-27.5">
        {review.text}
      </p>

      <div className="relative flex items-center gap-3 pt-5 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-[#FF4619]/15 border border-[#FF4619]/40 flex items-center justify-center text-xs font-semibold text-[#FF6B3D]">
          {initials(review.name)}
        </div>
        <div>
          <div className="text-sm font-semibold">{review.name}</div>
          <div className="text-xs text-white/45">{review.role}</div>
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  return (
    <section className="bg-black text-white py-16 md:py-24 overflow-hidden">
      <div className="container mb-10">
        <span className="text-xs tracking-[0.25em] uppercase text-[#FF6B3D]">Reviews</span>
        <h2 className="font-display text-3xl md:text-4xl uppercase leading-none mt-2">
          Loved By Our Customers
        </h2>
      </div>

      <div className="mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex gap-5 w-max animate-marquee">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
