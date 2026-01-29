"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { categories, menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { LoadingImage } from "@/components/LoadingImage";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, SearchIcon, StarIcon, PlusIcon } from "@/components/icons";

export default function MenuCategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);
  const { addItem } = useCart();

  // Get current category
  const currentCategory = categories.find((c) => c.id === categoryId);

  // Filter items by category
  const categoryItems = menuItems.filter((item) => item.category === categoryId);

  // Scroll active tab into view
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const tabsContainer = tabsRef.current;
      const activeTab = activeTabRef.current;
      const containerWidth = tabsContainer.offsetWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;

      // Center the active tab
      const scrollPosition = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      tabsContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [categoryId]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1 -ml-1 press-effect">
              <ChevronLeft />
            </Link>
            <h1 className="text-lg font-bold text-gray-800">
              {currentCategory?.name || "Menu"}
            </h1>
          </div>
          <Link href="/search" className="p-2 rounded-full hover:bg-gray-50 press-effect">
            <span className="text-gray-700"><SearchIcon /></span>
          </Link>
        </div>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className="flex overflow-x-auto hide-scrollbar px-4 pb-3 gap-1"
        >
          {categories.map((category) => {
            const isActive = category.id === categoryId;
            return (
              <Link
                key={category.id}
                href={`/menu/${category.id}`}
                ref={isActive ? activeTabRef : null}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors press-effect ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.icon} {category.name}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4">
        {categoryItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <span className="text-5xl mb-3">{currentCategory?.icon || "🍽️"}</span>
            <p className="text-sm">No items in this category yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {categoryItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden card-interactive animate-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Item Image */}
                {item.image && (
                  <div className="relative h-40 w-full bg-gray-100">
                    <LoadingImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 430px) 100vw, 400px"
                    />
                  </div>
                )}

                {/* Item Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Rating & Tags */}
                  <div className="flex items-center gap-2 mt-2">
                    {item.rating && (
                      <span className="flex items-center gap-1">
                        <StarIcon />
                        <span className="text-xs font-medium text-gray-600">
                          {item.rating}
                        </span>
                      </span>
                    )}
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          tag === "Spicy"
                            ? "bg-red-50 text-red-500"
                            : tag === "Best Seller"
                            ? "bg-yellow-50 text-yellow-600"
                            : tag === "Popular"
                            ? "bg-orange-50 text-orange-500"
                            : tag === "Vegetarian"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & Add Button */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-800">
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
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-md press-effect hover:bg-orange-600 transition-colors"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-6" />
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="search" />
    </div>
  );
}
