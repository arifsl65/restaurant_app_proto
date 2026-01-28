// Menu data for Spice Hut prototype
// Images sourced from Just Eat for prototype purposes only

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  tags?: string[];
  calories?: number;
  rating?: number;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'wings', name: 'Wings', icon: '🍗' },
  { id: 'wraps', name: 'Wraps', icon: '🌯' },
  { id: 'doner', name: 'Doner', icon: '🥙' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
];

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: 'gourmet-burger',
    name: 'Gourmet Burger Meal',
    description: 'Home made solid 500g meat patty topped with fried onion and house special sauce',
    price: 8.04,
    image: '/images/gourmet-burger-meal.jpg',
    category: 'burgers',
    tags: ['Popular'],
    rating: 4.8,
    popular: true,
  },
  {
    id: 'butter-chicken-burger',
    name: 'Butter Chicken Burger Meal',
    description: 'Home made special butter fillet topped zinger burger with chips and drink',
    price: 7.46,
    category: 'burgers',
    tags: ['Spicy'],
    rating: 4.6,
  },
  {
    id: 'tower-burger',
    name: 'Tower Burger',
    description: 'Stacked high with double patty, cheese, lettuce and special sauce',
    price: 5.46,
    category: 'burgers',
    rating: 4.5,
  },
  {
    id: 'chicken-strip-burger',
    name: 'Chicken Strip Burger',
    description: 'Crispy chicken strips in a soft bun with fresh salad',
    price: 3.11,
    category: 'burgers',
    rating: 4.3,
  },

  // Wings
  {
    id: '20-wings',
    name: '20 Pcs Spicy Wings',
    description: 'Crispy fried wings with house special spicy coating',
    price: 12.42,
    category: 'wings',
    tags: ['Spicy', 'Popular'],
    rating: 4.7,
    popular: true,
  },
  {
    id: '10-wings',
    name: '10 Pcs Grill Wings',
    description: 'Flame grilled wings marinated in special herbs and spices',
    price: 8.62,
    category: 'wings',
    rating: 4.5,
  },
  {
    id: '6-wings',
    name: '6 Pcs Grill Wings',
    description: 'Flame grilled wings, perfect starter size',
    price: 6.10,
    category: 'wings',
    rating: 4.4,
  },

  // Wraps
  {
    id: 'chicken-fillet-wrap',
    name: 'Chicken Fillet Wrap',
    description: 'Grilled chicken fillet wrapped in soft tortilla with fresh salad',
    price: 5.75,
    category: 'wraps',
    rating: 4.6,
  },
  {
    id: 'chicken-strip-wrap',
    name: 'Chicken Strip Wrap',
    description: 'Crispy chicken strips in a warm wrap with sauce',
    price: 4.31,
    category: 'wraps',
    rating: 4.4,
  },
  {
    id: 'chicken-wrap-meal',
    name: 'Chicken Wrap Meal',
    description: 'Chicken wrap served with chips and a drink',
    price: 8.05,
    category: 'wraps',
    tags: ['Meal Deal'],
    rating: 4.5,
  },

  // Doner
  {
    id: 'lamb-doner-nan',
    name: 'Lamb Donner with Nan',
    description: 'Tender lamb doner meat served on fresh nan bread with salad',
    price: 9.31,
    image: '/images/lamb-donner-with-nan.jpg',
    category: 'doner',
    tags: ['Best Seller'],
    rating: 4.9,
    popular: true,
  },
  {
    id: 'lamb-biryani',
    name: 'Lamb Biryani',
    description: 'Aromatic basmati rice cooked with tender lamb and special spices',
    price: 10.35,
    image: '/images/lamb-biryani.jpg',
    category: 'doner',
    tags: ['Popular'],
    rating: 4.8,
    popular: true,
  },
  {
    id: 'chicken-doner-nan',
    name: 'Chicken Donner with Nan',
    description: 'Tender chicken doner meat served on fresh nan bread with salad',
    price: 8.99,
    image: '/images/chicken-donner-with-nan.jpg',
    category: 'doner',
    tags: ['Popular'],
    rating: 4.7,
  },
  {
    id: 'doner-rice-box',
    name: 'Doner Rice Box',
    description: 'Lamb or chicken doner with pilau rice, salad, sauce and wings',
    price: 10.35,
    category: 'doner',
    tags: ['Best Seller'],
    rating: 4.7,
  },
  {
    id: 'lamb-doner-chips',
    name: 'Lamb Donner with Chips & Drink',
    description: 'Lamb doner served with crispy chips and a refreshing drink',
    price: 10.12,
    category: 'doner',
    rating: 4.6,
  },

  // Sides
  {
    id: 'peri-peri-chips',
    name: 'Peri Peri Special Chips',
    description: 'Crispy chips with house special peri peri flavour',
    price: 3.44,
    category: 'sides',
    tags: ['Spicy', 'Vegetarian'],
    calories: 452,
    rating: 4.5,
  },
  {
    id: 'regular-chips',
    name: 'Regular Chips',
    description: 'Golden crispy chips, perfectly salted',
    price: 2.50,
    category: 'sides',
    tags: ['Vegetarian'],
    rating: 4.3,
  },

  // Drinks
  {
    id: 'coca-cola',
    name: 'Coca Cola',
    description: 'Ice cold 330ml can',
    price: 1.50,
    category: 'drinks',
    rating: 4.5,
  },
  {
    id: 'fanta',
    name: 'Fanta Orange',
    description: 'Refreshing orange 330ml can',
    price: 1.50,
    category: 'drinks',
    rating: 4.4,
  },
  {
    id: 'water',
    name: 'Mineral Water',
    description: 'Still water 500ml bottle',
    price: 1.20,
    category: 'drinks',
    rating: 4.2,
  },
];

export const deals = [
  {
    id: 'deal-1',
    title: '10% Off',
    description: 'When you spend £20+',
    code: 'SAVE10',
    bgColor: 'bg-orange-500',
  },
  {
    id: 'deal-2',
    title: 'Free Wings',
    description: '5 wings free when you spend £15+',
    code: 'WINGS5',
    bgColor: 'bg-red-500',
  },
  {
    id: 'deal-3',
    title: 'Combo Deal',
    description: 'Burger + Chips + Drink for £8.99',
    code: 'COMBO',
    bgColor: 'bg-yellow-500',
  },
];

export const restaurant = {
  name: 'Spice Hut',
  tagline: 'Flame Grilled Goodness',
  rating: 4.5,
  reviewCount: 970,
  deliveryTime: '20-35 min',
  deliveryFee: 0.59,
  minOrder: 10,
  heroImage: '/images/hero-banner.jpg',
};
