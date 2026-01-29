"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { LoadingImage } from "@/components/LoadingImage";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, PlusIcon, MinusIcon, TrashIcon } from "@/components/icons";
import { restaurant, categories, menuItems } from "@/data/menu";

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, updateQuantity, clearCart, isHydrated } = useCart();
  const [promoCode, setPromoCode] = useState("");

  // Get category icon for items without images
  const getCategoryIcon = (itemId: string) => {
    const menuItem = menuItems.find((i) => i.id === itemId);
    if (menuItem) {
      const category = categories.find((c) => c.id === menuItem.category);
      return category?.icon || "🍽️";
    }
    return "🍽️";
  };

  // Handle promo code apply
  const handleApplyPromo = () => {
    // TODO: Implement promo code logic
    console.log("Apply promo code:", promoCode);
  };

  // Handle checkout
  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
                <ChevronLeft />
              </button>
              <h1 className="text-lg font-bold text-gray-800">Your Bag</h1>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
                <ChevronLeft />
              </button>
              <h1 className="text-lg font-bold text-gray-800">Your Bag</h1>
            </div>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <span className="text-6xl mb-4">🛒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your bag is empty</h2>
          <p className="text-gray-500 text-center mb-6">
            Looks like you haven&apos;t added anything to your bag yet
          </p>
          <Link
            href="/"
            className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-md press-effect hover:bg-orange-600 transition-colors"
          >
            Start browsing
          </Link>
        </div>

        <BottomNav active="cart" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
              <ChevronLeft />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Your Bag</h1>
          </div>
          <button
            onClick={clearCart}
            className="p-2 rounded-full hover:bg-gray-50 press-effect text-gray-500"
            aria-label="Clear bag"
          >
            <TrashIcon />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-48">
        {/* Restaurant Info */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-700">
            {restaurant.name} • {restaurant.deliveryTime}
          </p>
        </div>

        {/* Cart Items */}
        <div className="px-4 py-4">
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-50"
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
                      {getCategoryIcon(item.itemId)}
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                  {item.extraNames.length > 0 && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.extraNames.join(", ")}
                    </p>
                  )}
                  {item.specialInstructions && (
                    <p className="text-xs text-gray-400 mt-0.5 italic">
                      &quot;{item.specialInstructions}&quot;
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 press-effect hover:bg-gray-200 transition-colors"
                      >
                        <MinusIcon />
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-500 text-white press-effect hover:bg-orange-600 transition-colors"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <span className="font-bold text-gray-800">
                      £{item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Items Link */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mt-4 py-3 text-orange-500 font-semibold press-effect"
          >
            <PlusIcon />
            <span>Add more items</span>
          </Link>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white px-4 py-4 border-t border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Promo Code</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              onClick={handleApplyPromo}
              disabled={!promoCode}
              className="h-12 px-6 rounded-xl bg-gray-800 text-white font-semibold press-effect hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white px-4 py-4 mt-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivery fee</span>
              <span className="font-medium text-gray-800">£{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-gray-800">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[72px] left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[430px] mx-auto">
          <button
            onClick={handleCheckout}
            className="w-full h-14 bg-orange-500 text-white font-bold rounded-full shadow-lg press-effect hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>CHECKOUT</span>
            <span>•</span>
            <span>£{total.toFixed(2)}</span>
          </button>
        </div>
      </div>

      <BottomNav active="cart" />
    </div>
  );
}
