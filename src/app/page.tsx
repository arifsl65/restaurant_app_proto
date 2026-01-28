"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, menuItems, deals, restaurant } from "@/data/menu";

// Icons as SVG components for crisp rendering
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// Image with loading state
function LoadingImage({ src, alt, fill, className, sizes, priority }: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-orange-50 text-3xl">
        🍽️
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className="absolute inset-0 img-skeleton" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} ${loaded ? "img-loaded" : "opacity-0"}`}
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}

export default function Home() {
  const popularItems = menuItems.filter((item) => item.popular);

  const dealStyles = [
    "deal-orange",
    "deal-red",
    "deal-yellow",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="flex items-center gap-2 press-effect">
            <span className="text-orange-500">
              <LocationIcon />
            </span>
            <div className="text-left">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Deliver to</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-800">123 Main Street</span>
                <ChevronDown />
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <Link href="/notifications" className="relative p-2.5 rounded-full hover:bg-gray-50 press-effect">
              <span className="text-gray-700"><BellIcon /></span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>
            <Link href="/profile" className="p-2.5 rounded-full hover:bg-gray-50 press-effect">
              <span className="text-gray-700"><UserIcon /></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero Banner */}
        <section className="mx-4 mt-4 animate-in" style={{ animationDelay: "0ms" }}>
          <div className="relative h-44 w-full overflow-hidden rounded-2xl shadow-lg">
            <LoadingImage
              src={restaurant.heroImage}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 430px) 100vw, 430px"
            />
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/spicehut-logo.gif"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <h1 className="text-xl font-bold text-white">{restaurant.name}</h1>
              </div>
              <p className="text-sm text-gray-200 mt-0.5">{restaurant.tagline}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-sm text-white">
                  <StarIcon />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-gray-300">({restaurant.reviewCount}+)</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-white">{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section className="mt-6 animate-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-base font-bold text-gray-800">Deals</h2>
            <button className="text-orange-500 text-sm font-semibold press-effect">
              See all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-1">
            {deals.map((deal, index) => (
              <button
                key={deal.id}
                className={`flex-shrink-0 w-28 h-28 rounded-2xl p-3 text-white shadow-md press-effect ${dealStyles[index % dealStyles.length]}`}
              >
                <div className="h-full flex flex-col justify-between text-left">
                  <div className="text-lg font-bold leading-tight">{deal.title}</div>
                  <div className="text-[10px] opacity-90 leading-tight">{deal.description}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-6 px-4 animate-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-base font-bold text-gray-800 mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu/${category.id}`}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 shadow-sm card-interactive border border-gray-50"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium text-gray-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Items Section */}
        <section className="mt-6 px-4 animate-in" style={{ animationDelay: "150ms" }}>
          <h2 className="text-base font-bold text-gray-800 mb-3">Popular</h2>
          <div className="flex flex-col gap-3">
            {popularItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm card-interactive border border-gray-50"
                style={{ animationDelay: `${200 + index * 50}ms` }}
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {item.image ? (
                    <LoadingImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl bg-orange-50">
                      {categories.find((c) => c.id === item.category)?.icon || "🍽️"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <StarIcon />
                    <span className="text-xs font-medium text-gray-600">{item.rating}</span>
                    {item.tags?.[0] && (
                      <span className="text-xs font-medium text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full">
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-gray-800">£{item.price.toFixed(2)}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm">
                    <PlusIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-6" />
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-0.5 px-4 py-1 text-orange-500">
            <HomeIcon active />
            <span className="text-[10px] font-semibold">Home</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400 press-effect">
            <SearchIcon />
            <span className="text-[10px] font-medium">Search</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400 relative press-effect">
            <CartIcon />
            <span className="text-[10px] font-medium">Cart</span>
            <span className="absolute top-0 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white font-bold shadow-sm">
              2
            </span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400 press-effect">
            <ProfileIcon />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
