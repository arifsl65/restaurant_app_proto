"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, StarIcon } from "@/components/icons";
import { LoadingImage } from "@/components/LoadingImage";

// Notification types
type NotificationType =
  | "order_update"
  | "personal_deal"
  | "rate_order"
  | "time_based"
  | "loyalty"
  | "new_item"
  | "reorder";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: {
    orderId?: string;
    promoCode?: string;
    expiresIn?: string;
    itemName?: string;
    itemImage?: string;
    itemPrice?: number;
    points?: number;
    pointsGoal?: number;
    reward?: string;
    rating?: number;
  };
}

// Mock notifications data
const mockNotifications: { section: string; items: Notification[] }[] = [
  {
    section: "TODAY",
    items: [
      {
        id: "1",
        type: "order_update",
        title: "ORDER UPDATE",
        message: "Your order is out for delivery! Arriving in ~10 minutes",
        timestamp: "2m ago",
        read: false,
        data: { orderId: "ORD-2847" },
      },
      {
        id: "2",
        type: "personal_deal",
        title: "JUST FOR YOU, ARIF",
        message: "You loved Lamb Donner last time. Get 15% off your next order!",
        timestamp: "1h ago",
        read: false,
        data: {
          promoCode: "ARIF15",
          expiresIn: "2 days",
          itemImage: "/images/lamb-donner-with-nan.jpg",
        },
      },
    ],
  },
  {
    section: "YESTERDAY",
    items: [
      {
        id: "3",
        type: "rate_order",
        title: "RATE YOUR ORDER",
        message: "How was your Gourmet Burger?",
        timestamp: "18h ago",
        read: true,
        data: { itemName: "Gourmet Burger Meal", rating: 0 },
      },
      {
        id: "4",
        type: "time_based",
        title: "LUNCH SPECIAL",
        message: "It's lunchtime, Arif! Your favorite Wings are 20% off. Today 11am - 3pm only",
        timestamp: "23h ago",
        read: true,
      },
    ],
  },
  {
    section: "THIS WEEK",
    items: [
      {
        id: "5",
        type: "loyalty",
        title: "LOYALTY REWARD",
        message: "You've earned 150 points! 50 more points = FREE DRINK",
        timestamp: "3d ago",
        read: true,
        data: { points: 150, pointsGoal: 200, reward: "FREE DRINK" },
      },
      {
        id: "6",
        type: "new_item",
        title: "NEW FOR YOU",
        message: "Based on your love for Burgers:",
        timestamp: "5d ago",
        read: true,
        data: {
          itemName: "Butter Chicken Burger",
          itemPrice: 7.46,
          itemImage: "/images/gourmet-burger-meal.jpg",
        },
      },
      {
        id: "7",
        type: "reorder",
        title: "REORDER REMINDER",
        message: "Haven't had your weekly Donner? Your usual order is one tap away",
        timestamp: "6d ago",
        read: true,
        data: { orderId: "ORD-2801" },
      },
    ],
  },
];

// Notification icons
const notificationIcons: Record<NotificationType, string> = {
  order_update: "🚴",
  personal_deal: "🎁",
  rate_order: "⭐",
  time_based: "🔥",
  loyalty: "🏆",
  new_item: "🆕",
  reorder: "🔄",
};

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedRating, setSelectedRating] = useState<Record<string, number>>({});

  // Handle rating selection
  const handleRating = (notificationId: string, rating: number) => {
    setSelectedRating((prev) => ({ ...prev, [notificationId]: rating }));
  };

  // Render notification content based on type
  const renderNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case "order_update":
        return (
          <div className="mt-3">
            <button className="w-full h-11 bg-orange-500 text-white font-semibold rounded-xl press-effect hover:bg-orange-600 transition-colors">
              TRACK ORDER
            </button>
          </div>
        );

      case "personal_deal":
        return (
          <div className="mt-3 flex items-center gap-3">
            {notification.data?.itemImage && (
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <LoadingImage
                  src={notification.data.itemImage}
                  alt="Item"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-orange-500">
                Use code: {notification.data?.promoCode}
              </p>
              <p className="text-xs text-gray-500">
                Expires in {notification.data?.expiresIn}
              </p>
            </div>
          </div>
        );

      case "rate_order":
        const currentRating = selectedRating[notification.id] || 0;
        return (
          <div className="mt-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(notification.id, star)}
                  className="p-1 press-effect"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill={star <= currentRating ? "#FBBF24" : "none"}
                    stroke={star <= currentRating ? "#FBBF24" : "#D1D5DB"}
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">Tap to rate</p>
          </div>
        );

      case "loyalty":
        const progress = notification.data?.points && notification.data?.pointsGoal
          ? (notification.data.points / notification.data.pointsGoal) * 100
          : 0;
        return (
          <div className="mt-3">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              {notification.data?.points}/{notification.data?.pointsGoal} pts
            </p>
          </div>
        );

      case "new_item":
        return (
          <Link
            href={`/item/butter-chicken-burger`}
            className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl press-effect"
          >
            {notification.data?.itemImage && (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <LoadingImage
                  src={notification.data.itemImage}
                  alt={notification.data.itemName || "Item"}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {notification.data?.itemName}
              </p>
              <p className="text-xs text-gray-500">
                NEW • £{notification.data?.itemPrice?.toFixed(2)}
              </p>
            </div>
          </Link>
        );

      case "reorder":
        return (
          <div className="mt-3">
            <button className="w-full h-11 bg-orange-500 text-white font-semibold rounded-xl press-effect hover:bg-orange-600 transition-colors">
              REORDER • £19.35
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
            <ChevronLeft />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Notifications</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {notifications.map((group) => (
          <div key={group.section}>
            {/* Section Header */}
            <div className="px-4 py-3 bg-gray-50">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {group.section}
              </h2>
            </div>

            {/* Notifications */}
            <div className="flex flex-col">
              {group.items.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white border-b border-gray-100 px-4 py-4 ${
                    !notification.read ? "bg-orange-50/50" : ""
                  }`}
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {notificationIcons[notification.type]}
                      </span>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                        {notification.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          notification.read ? "bg-gray-300" : "bg-orange-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                    {notification.message}
                  </p>

                  {/* Type-specific content */}
                  {renderNotificationContent(notification)}

                  {/* Timestamp */}
                  <p className="text-xs text-gray-400 mt-3 text-right">
                    {notification.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
