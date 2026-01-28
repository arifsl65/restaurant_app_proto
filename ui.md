# Spice Hut - UI Design

## Implementation Status
- [x] Mobile App Shell (Phone Frame + Status Bar) ✅
- [x] Screen 1: Home Screen ✅
- [ ] Screen 2: Menu/Category
- [ ] Screen 3: Item Detail
- [ ] Screen 4: Cart
- [ ] Screen 5: Checkout
- [ ] Screen 6: Notifications

**Tech:** Next.js 16 + Tailwind 4 + TypeScript
**Run:** `npm run dev` → http://localhost:3000

### Mobile App Styling
- Max-width 430px centered container with dark background (phone preview)
- SVG icons (no emojis in nav)
- Press effects (`scale-0.97` on touch)
- No tap highlight (`-webkit-tap-highlight-color: transparent`)
- Safe area support for notched phones
- Fixed bottom nav within app shell
- Smooth scroll, fade-in animations
- Backdrop blur on sticky header

---

## MOBILE APP SHELL IMPLEMENTATION

### Why We Built This

To make the app feel like a **real mobile app** rather than just a responsive website, we implemented a phone frame preview system. This provides:

1. **Visual Context** - On desktop, users see the app inside a realistic iPhone frame
2. **Accurate Preview** - Developers can see exactly how the app looks on mobile
3. **Native Feel** - Status bar, notch, and home indicator create authentic mobile UX
4. **Responsive Behavior** - Frame only shows on desktop; mobile gets full-screen native experience

### Components Created

#### 1. MobileFrame (`src/components/MobileFrame.tsx`)

Wraps the entire app and provides:

```
┌─────────────────────────────────────────────────┐
│  Desktop Browser (dark gradient background)     │
│  ┌───────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │         [Dynamic Island]            │  │  │ ← Phone Notch
│  │  ├─────────────────────────────────────┤  │  │
│  │  │  09:41      📶 📶 🔋               │  │  │ ← Status Bar
│  │  ├─────────────────────────────────────┤  │  │
│  │  │                                     │  │  │
│  │  │         [App Content]               │  │  │ ← App Shell
│  │  │                                     │  │  │
│  │  ├─────────────────────────────────────┤  │  │
│  │  │         ━━━━━━━━━━━                 │  │  │ ← Home Indicator
│  │  └─────────────────────────────────────┘  │  │
│  │              Phone Bezel                  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Features:**
- iPhone-style bezel with rounded corners (55px radius)
- Dynamic Island/notch with camera dot
- Side buttons (volume, power)
- Home indicator bar
- Responsive: hides frame on mobile (≤430px)

#### 2. Status Bar (inside MobileFrame)

**Shows:**
- Live clock (updates every second)
- Signal strength icon
- WiFi icon
- Battery icon with level indicator

**Why:** Real mobile apps always show the system status bar. Including this makes the preview feel authentic.

#### 3. LoadingImage Component (`src/app/page.tsx`)

**Purpose:** Provides skeleton loading states for images

**Behavior:**
- Shows shimmer animation while image loads
- Fades in image smoothly when loaded
- Shows fallback emoji on error

**Why:** Native apps never show broken images or jarring loads. Skeleton states provide perceived performance.

### File Structure

```
src/
├── components/
│   └── MobileFrame.tsx    ← Phone frame + status bar
├── app/
│   ├── layout.tsx         ← Wraps children with MobileFrame
│   ├── globals.css        ← Phone frame styles, skeleton animations
│   └── page.tsx           ← Uses Link for navigation, LoadingImage
```

### CSS Classes Added (`globals.css`)

| Class | Purpose |
|-------|---------|
| `.phone-container` | Centers phone frame on desktop |
| `.phone-frame` | Drop shadow for depth |
| `.phone-bezel` | Black rounded rectangle (the phone body) |
| `.phone-notch` | Dynamic Island cutout |
| `.phone-screen` | The visible screen area |
| `.phone-home-indicator` | Bottom swipe bar |
| `.status-bar` | Top bar with time/icons |
| `.img-skeleton` | Shimmer loading animation |
| `.img-loaded` | Fade-in animation for loaded images |

### Navigation Links Added

All interactive elements now use Next.js `<Link>` for client-side navigation:

| Element | Route |
|---------|-------|
| Category (Burgers) | `/menu/burgers` |
| Category (Wings) | `/menu/wings` |
| Category (Wraps) | `/menu/wraps` |
| Category (Doner) | `/menu/doner` |
| Category (Sides) | `/menu/sides` |
| Category (Drinks) | `/menu/drinks` |
| Popular Item | `/item/[item-id]` |
| Bottom Nav: Home | `/` |
| Bottom Nav: Search | `/search` |
| Bottom Nav: Cart | `/cart` |
| Bottom Nav: Profile | `/profile` |
| Header: Bell | `/notifications` |
| Header: User | `/profile` |

### Viewport Configuration (`layout.tsx`)

```typescript
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,    // Prevents pinch zoom (app-like)
  viewportFit: "cover",   // Extends into notch area
  themeColor: "#FFF7ED",  // Browser chrome color
};
```

**PWA Meta Tags:**
- `appleWebApp.capable: true` - Enables "Add to Home Screen"
- `appleWebApp.statusBarStyle: "black-translucent"` - Blends status bar

---

## 1. HOME SCREEN ✅ IMPLEMENTED

```
┌─────────────────────────────────────┐
│ 📍 Deliver to          🔔    👤    │
│ 123 Main Street ▼                   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │░░░░░░ [hero-banner.jpg] ░░░░░░░│ │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │    🔥 SPICE HUT                 │ │
│ │    Flame Grilled Goodness       │ │
│ │    ⭐ 4.5 (970+) • 20-35 min    │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  🎁 DEALS                      ➜   │
│ ┌───────────┐ ┌───────────┐        │
│ │ 🟠 10%    │ │ 🔴 FREE   │        │
│ │   OFF     │ │  WINGS    │        │
│ │  £20+     │ │   £15+    │        │
│ └───────────┘ └───────────┘        │
├─────────────────────────────────────┤
│  📂 CATEGORIES                      │
│                                     │
│  🍔       🍗       🌯       🥙     │
│ Burgers  Wings   Wraps   Doner     │
│                                     │
│  🍟       🥤                        │
│ Sides   Drinks                      │
├─────────────────────────────────────┤
│  ⭐ POPULAR                         │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐ Lamb Donner w/ Nan      │ │
│ │ │░░░░░│ ⭐ 4.9 • Best Seller    │ │
│ │ │░IMG░│                  £9.31  │ │
│ │ └─────┘                    [+]  │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐ Gourmet Burger Meal     │ │
│ │ │░░░░░│ ⭐ 4.8 • Popular        │ │
│ │ │░IMG░│                  £8.04  │ │
│ │ └─────┘                    [+]  │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│   🏠       🔍       🛒       👤    │
│  Home   Search    Cart   Profile   │
└─────────────────────────────────────┘
```

---

## 2. MENU / CATEGORY SCREEN

```
┌─────────────────────────────────────┐
│  ←  Burgers                    🔍   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │  Burgers │ Wings │ Wraps │ More │ │
│ │  ━━━━━━                         │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ┌───────────────────────────┐   │ │
│ │ │░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │ │
│ │ │░░░ gourmet-burger-meal ░░░│   │ │
│ │ │░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │ │
│ │ └───────────────────────────┘   │ │
│ │  Gourmet Burger Meal            │ │
│ │  500g patty, fried onion, sauce │ │
│ │  ⭐ 4.8  [Popular]              │ │
│ │                                 │ │
│ │  £8.04                    [+]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  Butter Chicken Burger Meal     │ │
│ │  Butter fillet zinger burger    │ │
│ │  ⭐ 4.6  [Spicy]                │ │
│ │                                 │ │
│ │  £7.46                    [+]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  Tower Burger                   │ │
│ │  Double patty, cheese, lettuce  │ │
│ │  ⭐ 4.5                         │ │
│ │                                 │ │
│ │  £5.46                    [+]   │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│   🏠       🔍       🛒       👤    │
│  Home   Search    Cart   Profile   │
└─────────────────────────────────────┘
```

---

## 3. ITEM DETAIL SCREEN

```
┌─────────────────────────────────────┐
│  ←                             ♡    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │░░░░ lamb-donner-with-nan ░░░░░░│ │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│                                     │
│  Lamb Donner with Nan               │
│  ⭐ 4.9 (120+ reviews)              │
│                                     │
│  ┌──────────┐  ┌───────────┐        │
│  │Best Seller│  │  Popular  │        │
│  └──────────┘  └───────────┘        │
│                                     │
│  Tender lamb doner meat served      │
│  on fresh nan bread with salad      │
│                                     │
├─────────────────────────────────────┤
│  EXTRAS                             │
│  ┌─────────────────────────────┐    │
│  │ ☐ Extra meat         +£2.00 │    │
│  │ ☐ Extra cheese       +£0.80 │    │
│  │ ☐ Spicy sauce        +£0.30 │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  SPECIAL INSTRUCTIONS               │
│  ┌─────────────────────────────┐    │
│  │ Add a note...               │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│                                     │
│    ┌───┐               ┌─────────┐  │
│    │ - │   1   │ + │   │ ADD     │  │
│    └───┘       └───┘   │ £9.31   │  │
│                        └─────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## 4. CART SCREEN

```
┌─────────────────────────────────────┐
│  ←  Your Cart                  🗑️   │
├─────────────────────────────────────┤
│                                     │
│  🏪 Spice Hut • 20-35 min           │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │░░░░░│ Lamb Donner w/ Nan      │ │
│ │ │░IMG░│ + Extra meat            │ │
│ │ └─────┘                         │ │
│ │         ┌─┬───┬─┐      £11.31   │ │
│ │         │-│ 1 │+│               │ │
│ │         └─┴───┴─┘               │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │░░░░░│ Gourmet Burger Meal     │ │
│ │ │░IMG░│                         │ │
│ │ └─────┘                         │ │
│ │         ┌─┬───┬─┐       £8.04   │ │
│ │         │-│ 1 │+│               │ │
│ │         └─┴───┴─┘               │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ➕ Add more items                  │
│                                     │
├─────────────────────────────────────┤
│  🎟️ Apply promo code           ➜   │
├─────────────────────────────────────┤
│                                     │
│  Subtotal                   £19.35  │
│  Delivery fee                £0.59  │
│  ─────────────────────────────────  │
│  Total                      £19.94  │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │      CHECKOUT • £19.94          ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

## 5. CHECKOUT SCREEN

```
┌─────────────────────────────────────┐
│  ←  Checkout                        │
├─────────────────────────────────────┤
│                                     │
│  📍 DELIVERY ADDRESS                │
│  ┌─────────────────────────────────┐│
│  │ 123 Main Street                 ││
│  │ London, E1 4AB                  ││
│  │                          Edit ➜ ││
│  └─────────────────────────────────┘│
│                                     │
│  🕐 DELIVERY TIME                   │
│  ┌─────────────────────────────────┐│
│  │ ◉ ASAP (20-35 min)              ││
│  │ ○ Schedule for later            ││
│  └─────────────────────────────────┘│
│                                     │
│  💳 PAYMENT METHOD                  │
│  ┌─────────────────────────────────┐│
│  │ 💳 •••• 4242              Edit ➜││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  ORDER SUMMARY                      │
│                                     │
│  1x Lamb Donner w/ Nan      £11.31  │
│  1x Gourmet Burger Meal      £8.04  │
│  Delivery fee                £0.59  │
│  ─────────────────────────────────  │
│  Total                      £19.94  │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │      PLACE ORDER • £19.94       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

## 6. NOTIFICATIONS SCREEN (Personalized)

```
┌─────────────────────────────────────┐
│  ←  Notifications                   │
├─────────────────────────────────────┤
│                                     │
│  TODAY                              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🚴 ORDER UPDATE              •  │ │
│ │                                 │ │
│ │ Your order is out for delivery! │ │
│ │ Arriving in ~10 minutes         │ │
│ │                                 │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │      TRACK ORDER            │ │ │
│ │ └─────────────────────────────┘ │ │
│ │                          2m ago │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🎁 JUST FOR YOU, ARIF        •  │ │
│ │                                 │ │
│ │ You loved Lamb Donner last time │ │
│ │ Get 15% off your next order!    │ │
│ │                                 │ │
│ │ [🥙 IMG]  Use code: ARIF15      │ │
│ │           Expires in 2 days     │ │
│ │                          1h ago │ │
│ └─────────────────────────────────┘ │
│                                     │
│  YESTERDAY                          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ⭐ RATE YOUR ORDER              │ │
│ │                                 │ │
│ │ How was your Gourmet Burger?    │ │
│ │                                 │ │
│ │ ☆  ☆  ☆  ☆  ☆                  │ │
│ │ Tap to rate                     │ │
│ │                         18h ago │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔥 LUNCH SPECIAL              ○ │ │
│ │                                 │ │
│ │ It's lunchtime, Arif!           │ │
│ │ Your favorite Wings are 20% off │ │
│ │ Today 11am - 3pm only           │ │
│ │                         23h ago │ │
│ └─────────────────────────────────┘ │
│                                     │
│  THIS WEEK                          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🏆 LOYALTY REWARD             ○ │ │
│ │                                 │ │
│ │ You've earned 150 points!       │ │
│ │ 50 more points = FREE DRINK     │ │
│ │                                 │ │
│ │ ████████████░░░░ 150/200 pts    │ │
│ │                          3d ago │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🆕 NEW FOR YOU                ○ │ │
│ │                                 │ │
│ │ Based on your love for Burgers: │ │
│ │                                 │ │
│ │ [🍔 IMG] Butter Chicken Burger  │ │
│ │          NEW • £7.46            │ │
│ │                          5d ago │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔄 REORDER REMINDER           ○ │ │
│ │                                 │ │
│ │ Haven't had your weekly Donner? │ │
│ │ Your usual order is one tap away│ │
│ │                                 │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │    REORDER • £19.35         │ │ │
│ │ └─────────────────────────────┘ │ │
│ │                          6d ago │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│   🏠       🔍       🛒       👤    │
│  Home   Search    Cart   Profile   │
└─────────────────────────────────────┘
```

### Notification Types (Personalized)

| Type | Icon | Trigger | Personalization |
|------|------|---------|-----------------|
| Order Update | 🚴 | Order status change | Real-time tracking |
| Personal Deal | 🎁 | Based on order history | Uses name + favorites |
| Rate Order | ⭐ | After delivery | Shows ordered items |
| Time-Based | 🔥 | Lunch/Dinner time | Based on usual order times |
| Loyalty | 🏆 | Points milestone | Progress to next reward |
| New Items | 🆕 | Menu update | Based on favorite categories |
| Reorder | 🔄 | Weekly pattern | Based on order frequency |

### Notification States
- `•` = Unread (bold, highlighted)
- `○` = Read (normal)

---

## SCREEN FLOW

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   HOME   │ ──➜ │  MENU/   │ ──➜ │  ITEM    │
│  SCREEN  │     │ CATEGORY │     │  DETAIL  │
└──────────┘     └──────────┘     └──────────┘
     │                                  │
     │                                  ▼
     │           ┌──────────┐     ┌──────────┐
     └─────────➜ │   CART   │ ──➜ │ CHECKOUT │
                 │  SCREEN  │     │  SCREEN  │
                 └──────────┘     └──────────┘
```

---

## ASSETS

### Images (public/images/)

**Branding**
- `spicehut-logo.gif` - Restaurant logo (100x100)
- `hero-banner.jpg` - Restaurant hero banner

**Burgers**
- `gourmet-burger-meal.jpg`
- `butter-chicken-burger.jpg`
- `tower-burger.jpg`
- `chicken-strip-burger.jpg`

**Wings**
- `20-wings.jpg`
- `10-wings.jpg`
- `6-wings.jpg`

**Wraps**
- `chicken-fillet-wrap.jpg`
- `chicken-strip-wrap.jpg`
- `chicken-wrap-meal.jpg`

**Doner**
- `lamb-donner-with-nan.jpg`
- `lamb-biryani.jpg`
- `chicken-donner-with-nan.jpg`
- `doner-rice-box.jpg`
- `lamb-doner-chips.jpg`

**Sides**
- `peri-peri-chips.jpg`
- `regular-chips.jpg`

**Drinks**
- `coca-cola.jpg`
- `fanta.jpg`
- `water.jpg`

### Color Palette
- Primary: Orange `#F97316`
- Secondary: Red `#EF4444`
- Background: `#FFF7ED` (warm white)
- Text: `#1F2937` (dark gray)
- Accent: `#FBBF24` (yellow)

### Typography
- Headings: Bold, sans-serif
- Body: Regular, sans-serif
- Prices: Semi-bold
