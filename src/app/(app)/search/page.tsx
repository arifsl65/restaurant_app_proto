"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { menuItems, categories } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { LoadingImage } from "@/components/LoadingImage";
import { BottomNav } from "@/components/BottomNav";
import { SearchIcon, StarIcon, PlusIcon, ChevronLeft } from "@/components/icons";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("spicehut-recent-searches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Auto-focus search input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Filter menu items based on query
  const filteredItems = query.trim()
    ? menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Save search to recent
  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("spicehut-recent-searches", JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("spicehut-recent-searches");
  };

  // Handle quick add to cart
  const handleQuickAdd = (item: typeof menuItems[0]) => {
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
  };

  // Get category icon for item
  const getCategoryIcon = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.icon || "🍽️";
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with Search */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 -ml-1 press-effect">
            <ChevronLeft />
          </Link>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => saveRecentSearch(query)}
              placeholder="Search for food..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 press-effect"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* No query - show recent searches and categories */}
        {!query.trim() && (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">Recent Searches</h2>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-orange-500 font-medium press-effect"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 press-effect hover:bg-gray-50 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Browse Categories */}
            <section className="px-4 py-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3">Browse Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/menu/${category.id}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 press-effect hover:shadow-sm transition-shadow"
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular Searches */}
            <section className="px-4 py-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {["Burger", "Wings", "Donner", "Spicy", "Meal Deal"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-orange-50 rounded-full text-sm text-orange-600 font-medium press-effect hover:bg-orange-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Search Results */}
        {query.trim() && (
          <section className="px-4 py-4">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <h3 className="text-lg font-bold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-500 text-sm">
                  We couldn&apos;t find anything for &quot;{query}&quot;
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Try a different search term
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                </p>
                <div className="flex flex-col gap-3">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/item/${item.id}`}
                      onClick={() => saveRecentSearch(query)}
                      className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-50 press-effect"
                    >
                      {/* Item Image */}
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
                            {getCategoryIcon(item.category)}
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          {item.rating && (
                            <>
                              <StarIcon />
                              <span className="text-xs font-medium text-gray-600">
                                {item.rating}
                              </span>
                            </>
                          )}
                          {item.tags?.[0] && (
                            <span className="text-xs font-medium text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full">
                              {item.tags[0]}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Add Button */}
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-gray-800">
                          £{item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickAdd(item);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm press-effect hover:bg-orange-600 transition-colors"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="search" />
    </div>
  );
}
