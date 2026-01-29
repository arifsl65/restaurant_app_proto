"use client";

import Image from "next/image";
import Link from "next/link";
import { categories, menuItems, deals, restaurant } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { LoadingImage } from "@/components/LoadingImage";
import { BottomNav } from "@/components/BottomNav";
import {
  LocationIcon,
  BellIcon,
  UserIcon,
  ChevronDown,
  StarIcon,
  PlusIcon,
} from "@/components/icons";

export default function Home() {
  const { addItem } = useCart();
  const popularItems = menuItems.filter((item) => item.popular);

  const dealStyles = ["deal-orange", "deal-red", "deal-yellow"];

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
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                Deliver to
              </p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-800">
                  123 Main Street
                </span>
                <ChevronDown />
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <Link
              href="/notifications"
              className="relative p-2.5 rounded-full hover:bg-gray-50 press-effect"
            >
              <span className="text-gray-700">
                <BellIcon />
              </span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>
            <Link
              href="/profile"
              className="p-2.5 rounded-full hover:bg-gray-50 press-effect"
            >
              <span className="text-gray-700">
                <UserIcon />
              </span>
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
                  <div className="text-[10px] opacity-90 leading-tight">
                    {deal.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section
          className="mt-6 px-4 animate-in"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-base font-bold text-gray-800 mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu/${category.id}`}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 shadow-sm card-interactive border border-gray-50"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium text-gray-700">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Items Section */}
        <section
          className="mt-6 px-4 animate-in"
          style={{ animationDelay: "150ms" }}
        >
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
                  <h3 className="font-semibold text-gray-800 text-sm truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <StarIcon />
                    <span className="text-xs font-medium text-gray-600">
                      {item.rating}
                    </span>
                    {item.tags?.[0] && (
                      <span className="text-xs font-medium text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full">
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-gray-800">
                    £{item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        itemId: item.id,
                        name: item.name,
                        image: item.image,
                        basePrice: item.price,
                        quantity: 1,
                        extras: [],
                        extraNames: [],
                        specialInstructions: "",
                        totalPrice: item.price,
                      });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm press-effect hover:bg-orange-600 transition-colors"
                  >
                    <PlusIcon />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-6" />
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="home" />
    </div>
  );
}
