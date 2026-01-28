"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { categories, menuItems } from "@/data/menu";
import { LoadingImage } from "@/components/LoadingImage";
import { ChevronLeft, StarIcon, PlusIcon, MinusIcon, HeartIcon } from "@/components/icons";

// Extra options for items
const extraOptions = [
  { id: "extra-meat", name: "Extra meat", price: 2.0 },
  { id: "extra-cheese", name: "Extra cheese", price: 0.8 },
  { id: "spicy-sauce", name: "Spicy sauce", price: 0.3 },
  { id: "garlic-mayo", name: "Garlic mayo", price: 0.3 },
];

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the item
  const item = menuItems.find((i) => i.id === itemId);

  // If item not found
  if (!item) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <span className="text-5xl mb-4">🍽️</span>
        <p className="text-gray-500 mb-4">Item not found</p>
        <Link href="/" className="text-orange-500 font-medium press-effect">
          Go back home
        </Link>
      </div>
    );
  }

  // Get category info
  const category = categories.find((c) => c.id === item.category);

  // Calculate total price
  const extrasTotal = selectedExtras.reduce((total, extraId) => {
    const extra = extraOptions.find((e) => e.id === extraId);
    return total + (extra?.price || 0);
  }, 0);
  const totalPrice = (item.price + extrasTotal) * quantity;

  // Toggle extra selection
  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // TODO: Implement cart logic
    console.log({
      item: item.id,
      quantity,
      extras: selectedExtras,
      specialInstructions,
      totalPrice,
    });
    router.push("/cart");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Image */}
      <div className="relative">
        {/* Back and Favorite buttons */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md press-effect"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md press-effect"
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>

        {/* Item Image */}
        <div className="relative h-64 w-full bg-gray-100">
          {item.image ? (
            <LoadingImage
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 430px) 100vw, 430px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-orange-50 text-6xl">
              {category?.icon || "🍽️"}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="p-4">
          {/* Item Name & Rating */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
              {item.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon />
                  <span className="text-sm font-medium text-gray-600">
                    {item.rating}
                  </span>
                  <span className="text-sm text-gray-400">(120+ reviews)</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
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
          )}

          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed">{item.description}</p>

          {/* Extras Section */}
          <div className="mt-6">
            <h2 className="text-base font-bold text-gray-800 mb-3">Extras</h2>
            <div className="flex flex-col gap-2">
              {extraOptions.map((extra) => {
                const isSelected = selectedExtras.includes(extra.id);
                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors press-effect ${
                      isSelected
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-orange-500 bg-orange-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-gray-700">{extra.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      +£{extra.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mt-6">
            <h2 className="text-base font-bold text-gray-800 mb-3">
              Special Instructions
            </h2>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Add a note (e.g., no onions, extra spicy...)"
              className="w-full h-24 p-4 rounded-xl border-2 border-gray-100 bg-white text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[430px] mx-auto flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-sm press-effect disabled:opacity-50"
            >
              <MinusIcon />
            </button>
            <span className="w-6 text-center font-bold text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-sm press-effect"
            >
              <PlusIcon />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-orange-500 text-white font-bold rounded-full shadow-lg press-effect hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>Add</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
