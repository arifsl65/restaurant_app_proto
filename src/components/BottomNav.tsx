"use client";

import Link from "next/link";
import { HomeIcon, SearchIcon, CartIcon, ProfileIcon } from "./icons";

interface BottomNavProps {
  active?: "home" | "search" | "cart" | "profile";
  cartCount?: number;
}

export function BottomNav({ active = "home", cartCount = 2 }: BottomNavProps) {
  return (
    <nav className="bottom-nav bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around py-2">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 px-4 py-1 ${
            active === "home" ? "text-orange-500" : "text-gray-400 press-effect"
          }`}
        >
          <HomeIcon active={active === "home"} />
          <span className={`text-[10px] ${active === "home" ? "font-semibold" : "font-medium"}`}>
            Home
          </span>
        </Link>
        <Link
          href="/search"
          className={`flex flex-col items-center gap-0.5 px-4 py-1 ${
            active === "search" ? "text-orange-500" : "text-gray-400 press-effect"
          }`}
        >
          <SearchIcon active={active === "search"} />
          <span className={`text-[10px] ${active === "search" ? "font-semibold" : "font-medium"}`}>
            Search
          </span>
        </Link>
        <Link
          href="/cart"
          className={`flex flex-col items-center gap-0.5 px-4 py-1 relative ${
            active === "cart" ? "text-orange-500" : "text-gray-400 press-effect"
          }`}
        >
          <CartIcon active={active === "cart"} />
          <span className={`text-[10px] ${active === "cart" ? "font-semibold" : "font-medium"}`}>
            Cart
          </span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white font-bold shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-0.5 px-4 py-1 ${
            active === "profile" ? "text-orange-500" : "text-gray-400 press-effect"
          }`}
        >
          <ProfileIcon active={active === "profile"} />
          <span className={`text-[10px] ${active === "profile" ? "font-semibold" : "font-medium"}`}>
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
}
