#!/usr/bin/env python3
"""
Image scraper for fast food app prototype.
Downloads food images from Just Eat Cloudinary CDN.
"""

import os
import requests
from urllib.parse import urlparse

# Create output directory
OUTPUT_DIR = "public/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Image URLs - existing from Just Eat + new from Unsplash/Pexels for prototype
IMAGES = [
    # ===== EXISTING (Already downloaded) =====
    {
        "url": "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,w_600,h_600,q_auto,f_auto/v1/uk/dishes/171786/e7b51afa7e806f0213ad9211ee6ab18c",
        "filename": "lamb-donner-with-nan.jpg"
    },
    {
        "url": "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,w_600,h_600,q_auto,f_auto/v1/uk/dishes/171786/83ee597bb648bf2c49fe2254ba63bd68",
        "filename": "lamb-biryani.jpg"
    },
    {
        "url": "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,w_600,h_600,q_auto,f_auto/v1/uk/dishes/171786/f28faa4a12f20781f10755f816fef40d",
        "filename": "gourmet-burger-meal.jpg"
    },
    {
        "url": "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,w_600,h_600,q_auto,f_auto/v1/uk/dishes/171786/815b1e73887d535f5f3d3f722c054374",
        "filename": "chicken-donner-with-nan.jpg"
    },
    {
        "url": "https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,w_1200,h_500,q_auto,f_auto/v1/uk/restaurants/171786",
        "filename": "hero-banner.jpg"
    },
    {
        "url": "https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/171786.gif",
        "filename": "spicehut-logo.gif"
    },

    # ===== BURGERS (Unsplash) =====
    {
        "url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop",
        "filename": "butter-chicken-burger.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=600&fit=crop",
        "filename": "tower-burger.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=600&fit=crop",
        "filename": "chicken-strip-burger.jpg"
    },

    # ===== WINGS (Missing) =====
    {
        "url": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&h=600&fit=crop",
        "filename": "20-wings.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=600&h=600&fit=crop",
        "filename": "10-wings.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=600&fit=crop",
        "filename": "6-wings.jpg"
    },

    # ===== WRAPS (Missing) =====
    {
        "url": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=600&fit=crop",
        "filename": "chicken-fillet-wrap.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&h=600&fit=crop",
        "filename": "chicken-strip-wrap.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=600&fit=crop",
        "filename": "chicken-wrap-meal.jpg"
    },

    # ===== DONER (Missing) =====
    {
        "url": "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=600&h=600&fit=crop",
        "filename": "doner-rice-box.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=600&fit=crop",
        "filename": "lamb-doner-chips.jpg"
    },

    # ===== SIDES (Missing) =====
    {
        "url": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=600&fit=crop",
        "filename": "peri-peri-chips.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=600&fit=crop",
        "filename": "regular-chips.jpg"
    },

    # ===== DRINKS (Missing) =====
    {
        "url": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&h=600&fit=crop",
        "filename": "coca-cola.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=600&h=600&fit=crop",
        "filename": "fanta.jpg"
    },
    {
        "url": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=600&fit=crop",
        "filename": "water.jpg"
    },
]

# Common headers to mimic browser request
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.just-eat.co.uk/",
}

def download_image(url: str, filename: str, skip_existing: bool = True) -> bool:
    """Download an image from URL and save to file."""
    filepath = os.path.join(OUTPUT_DIR, filename)

    # Skip if file already exists
    if skip_existing and os.path.exists(filepath):
        size_kb = os.path.getsize(filepath) / 1024
        print(f"⏭️  Skipping: {filename} (already exists, {size_kb:.1f} KB)")
        return True

    try:
        print(f"Downloading: {filename}...")
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.raise_for_status()

        with open(filepath, "wb") as f:
            f.write(response.content)

        size_kb = len(response.content) / 1024
        print(f"  ✓ Saved: {filepath} ({size_kb:.1f} KB)")
        return True

    except requests.exceptions.RequestException as e:
        print(f"  ✗ Failed: {filename} - {e}")
        return False

def main():
    print("=" * 50)
    print("Fast Food App - Image Scraper")
    print("=" * 50)
    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"Images to download: {len(IMAGES)}\n")

    success = 0
    failed = 0

    for img in IMAGES:
        if download_image(img["url"], img["filename"]):
            success += 1
        else:
            failed += 1

    print("\n" + "=" * 50)
    print(f"Complete! Downloaded: {success}, Failed: {failed}")
    print("=" * 50)

if __name__ == "__main__":
    main()
