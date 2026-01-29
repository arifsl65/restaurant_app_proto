"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ChevronLeft } from "@/components/icons";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, clearCart, isHydrated } = useCart();

  const [deliveryTime, setDeliveryTime] = useState<"asap" | "scheduled">("asap");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Handle place order
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and redirect to confirmation (for now, go to home)
    clearCart();
    router.push("/");

    // TODO: Navigate to order confirmation/tracking page
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
              <ChevronLeft />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Checkout</h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect to cart if empty
  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
            <ChevronLeft />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Checkout</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32">
        {/* Delivery Address */}
        <section className="bg-white mt-2 px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📍</span>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Delivery Address
            </h2>
          </div>
          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 press-effect hover:bg-gray-100 transition-colors">
            <div className="text-left">
              <p className="font-medium text-gray-800">123 Main Street</p>
              <p className="text-sm text-gray-500">London, E1 4AB</p>
            </div>
            <span className="text-orange-500 font-medium text-sm">Edit</span>
          </button>
        </section>

        {/* Delivery Time */}
        <section className="bg-white mt-2 px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🕐</span>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Delivery Time
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setDeliveryTime("asap")}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors press-effect ${
                deliveryTime === "asap"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryTime === "asap"
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              >
                {deliveryTime === "asap" && (
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">ASAP</p>
                <p className="text-sm text-gray-500">20-35 min</p>
              </div>
            </button>
            <button
              onClick={() => setDeliveryTime("scheduled")}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors press-effect ${
                deliveryTime === "scheduled"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryTime === "scheduled"
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              >
                {deliveryTime === "scheduled" && (
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                )}
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Schedule for later</p>
                <p className="text-sm text-gray-500">Choose a time</p>
              </div>
            </button>
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white mt-2 px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💳</span>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Payment Method
            </h2>
          </div>
          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 press-effect hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-14 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <p className="font-medium text-gray-800">•••• 4242</p>
            </div>
            <span className="text-orange-500 font-medium text-sm">Edit</span>
          </button>
        </section>

        {/* Order Summary */}
        <section className="bg-white mt-2 px-4 py-4">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
            Order Summary
          </h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {item.quantity}x
                  </span>
                  <span className="text-sm text-gray-800">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  £{item.totalPrice.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-600">Delivery fee</span>
              <span className="text-sm font-medium text-gray-800">
                £{deliveryFee.toFixed(2)}
              </span>
            </div>
            <div className="h-px bg-gray-200 my-1" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-gray-800">£{total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[430px] mx-auto">
          <button
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className="w-full h-14 bg-orange-500 text-white font-bold rounded-full shadow-lg press-effect hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPlacingOrder ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Placing Order...
              </span>
            ) : (
              <>
                <span>PLACE ORDER</span>
                <span>•</span>
                <span>£{total.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
