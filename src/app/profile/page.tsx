"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft } from "@/components/icons";

// Menu item component
function MenuItem({
  icon,
  label,
  value,
  href,
  onClick,
  danger,
}: {
  icon: string;
  label: string;
  value?: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  const content = (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 press-effect hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className={`font-medium ${danger ? "text-red-500" : "text-gray-800"}`}>
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-gray-500">{value}</span>}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={danger ? "#EF4444" : "#9CA3AF"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick} className="w-full text-left">{content}</button>;
}

export default function ProfilePage() {
  const router = useRouter();

  // Mock user data
  const user = {
    name: "Arif",
    email: "arif@example.com",
    phone: "+44 7700 900000",
    memberSince: "Jan 2024",
    points: 150,
    tier: "Gold",
  };

  // Handle logout
  const handleLogout = () => {
    // TODO: Implement actual logout
    router.push("/");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => router.back()} className="p-1 -ml-1 press-effect">
            <ChevronLeft />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* User Card */}
        <section className="bg-white px-4 py-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                  {user.tier} Member
                </span>
                <span className="text-xs text-gray-400">
                  Since {user.memberSince}
                </span>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Reward Points</p>
                <p className="text-3xl font-bold">{user.points}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Next reward at</p>
                <p className="text-lg font-semibold">200 pts</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(user.points / 200) * 100}%` }}
              />
            </div>
            <p className="text-xs mt-2 opacity-90">
              {200 - user.points} points until FREE DRINK
            </p>
          </div>
        </section>

        {/* Account Section */}
        <section className="mt-4">
          <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
            Account
          </h3>
          <MenuItem icon="👤" label="Personal Info" value="Edit" />
          <MenuItem icon="📍" label="Saved Addresses" value="2 addresses" />
          <MenuItem icon="💳" label="Payment Methods" value="Visa •••• 4242" />
        </section>

        {/* Orders Section */}
        <section className="mt-4">
          <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
            Orders
          </h3>
          <MenuItem icon="📦" label="Order History" value="12 orders" />
          <MenuItem icon="🔄" label="Reorder" value="Quick reorder" />
          <MenuItem icon="❤️" label="Favourites" value="4 items" />
        </section>

        {/* Preferences Section */}
        <section className="mt-4">
          <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
            Preferences
          </h3>
          <MenuItem icon="🔔" label="Notifications" value="On" href="/notifications" />
          <MenuItem icon="🌙" label="Appearance" value="System" />
          <MenuItem icon="🌍" label="Language" value="English" />
        </section>

        {/* Support Section */}
        <section className="mt-4">
          <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
            Support
          </h3>
          <MenuItem icon="❓" label="Help Centre" />
          <MenuItem icon="💬" label="Contact Us" />
          <MenuItem icon="📄" label="Terms & Privacy" />
        </section>

        {/* Logout */}
        <section className="mt-4 mb-4">
          <MenuItem icon="🚪" label="Log Out" onClick={handleLogout} danger />
        </section>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">Spice Hut v1.0.0</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="profile" />
    </div>
  );
}
