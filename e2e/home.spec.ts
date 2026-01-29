import { test, expect } from "@playwright/test";

test.describe("Home Screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Header", () => {
    test("displays delivery address section", async ({ page }) => {
      await expect(page.getByText("Deliver to")).toBeVisible();
      await expect(page.getByText("123 Main Street")).toBeVisible();
    });

    test("has notification bell with indicator", async ({ page }) => {
      const bellLink = page.locator('a[href="/notifications"]');
      await expect(bellLink).toBeVisible();
      // Check notification dot exists
      await expect(bellLink.locator("span.bg-red-500")).toBeVisible();
    });

    test("has profile link", async ({ page }) => {
      const profileLinks = page.getByRole("link", { name: /profile/i });
      await expect(profileLinks.first()).toHaveAttribute("href", "/profile");
    });
  });

  test.describe("Hero Banner", () => {
    test("displays restaurant name and tagline", async ({ page }) => {
      await expect(page.getByRole("heading", { name: "Spice Hut" })).toBeVisible();
      await expect(page.getByText("Flame Grilled Goodness")).toBeVisible();
    });

    test("displays rating and delivery time", async ({ page }) => {
      await expect(page.getByText("4.5")).toBeVisible();
      await expect(page.getByText("(970+)")).toBeVisible();
      await expect(page.getByText("20-35 min")).toBeVisible();
    });
  });

  test.describe("Deals Section", () => {
    test("displays deals heading with see all button", async ({ page }) => {
      await expect(page.getByRole("heading", { name: "Deals" })).toBeVisible();
      await expect(page.getByRole("button", { name: "See all" })).toBeVisible();
    });

    test("displays deal cards", async ({ page }) => {
      await expect(page.getByText("10% Off")).toBeVisible();
      await expect(page.getByText("Free Wings")).toBeVisible();
      await expect(page.getByText("Combo Deal")).toBeVisible();
    });

    test("displays deal descriptions", async ({ page }) => {
      await expect(page.getByText("When you spend £20+")).toBeVisible();
    });
  });

  test.describe("Categories Section", () => {
    test("displays all 6 categories", async ({ page }) => {
      await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();

      const categoryNames = ["Burgers", "Wings", "Wraps", "Doner", "Sides", "Drinks"];
      for (const name of categoryNames) {
        await expect(page.getByRole("link", { name }).first()).toBeVisible();
      }
    });

    test("category links navigate to menu pages", async ({ page }) => {
      const burgersLink = page.getByRole("link", { name: "Burgers" }).first();
      await expect(burgersLink).toHaveAttribute("href", "/menu/burgers");

      const wingsLink = page.getByRole("link", { name: "Wings" }).first();
      await expect(wingsLink).toHaveAttribute("href", "/menu/wings");
    });

    test("displays category icons", async ({ page }) => {
      // Check icons within the categories section grid
      const categoriesSection = page.locator("section").filter({ hasText: "Categories" });
      await expect(categoriesSection.getByText("🍔")).toBeVisible();
      await expect(categoriesSection.getByText("🍗")).toBeVisible();
      await expect(categoriesSection.getByText("🌯")).toBeVisible();
      await expect(categoriesSection.getByText("🥙")).toBeVisible();
      await expect(categoriesSection.getByText("🍟")).toBeVisible();
      await expect(categoriesSection.getByText("🥤")).toBeVisible();
    });
  });

  test.describe("Popular Items Section", () => {
    test("displays popular section heading", async ({ page }) => {
      await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
    });

    test("displays popular menu items", async ({ page }) => {
      await expect(page.getByText("Gourmet Burger Meal")).toBeVisible();
      await expect(page.getByText("Lamb Donner with Nan")).toBeVisible();
      await expect(page.getByText("20 Pcs Spicy Wings")).toBeVisible();
      await expect(page.getByText("Lamb Biryani")).toBeVisible();
    });

    test("displays item prices", async ({ page }) => {
      await expect(page.getByText("£8.04")).toBeVisible();
      await expect(page.getByText("£9.31")).toBeVisible();
    });

    test("displays item ratings", async ({ page }) => {
      // Check that ratings are shown for popular items
      const popularSection = page.locator("section").filter({ hasText: "Popular" });
      await expect(popularSection.getByText("4.8").first()).toBeVisible();
      await expect(popularSection.getByText("4.9")).toBeVisible();
    });

    test("displays item tags", async ({ page }) => {
      await expect(page.getByText("Popular").first()).toBeVisible();
      await expect(page.getByText("Best Seller")).toBeVisible();
    });

    test("popular items link to item detail pages", async ({ page }) => {
      const gourmetBurgerLink = page.getByRole("link", { name: /Gourmet Burger Meal/i });
      await expect(gourmetBurgerLink).toHaveAttribute("href", "/item/gourmet-burger");
    });
  });

  test.describe("Bottom Navigation", () => {
    test("displays all 4 navigation items", async ({ page }) => {
      await expect(page.getByRole("link", { name: /^Home$/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /Search/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /Cart/i })).toBeVisible();
      // Profile appears in both header and nav, so use locator
      const navProfileLink = page.locator("nav").getByRole("link", { name: /Profile/i });
      await expect(navProfileLink).toBeVisible();
    });

    test("home is active/highlighted", async ({ page }) => {
      const homeLink = page.getByRole("link", { name: /^Home$/i });
      await expect(homeLink).toHaveClass(/text-orange-500/);
    });

    test("cart shows item count badge", async ({ page }) => {
      // Cart badge is within the cart link in bottom nav
      const cartLink = page.locator('nav a[href="/cart"]');
      const badge = cartLink.locator("span.bg-orange-500");
      await expect(badge).toBeVisible();
      await expect(badge).toHaveText("2");
    });

    test("navigation links have correct hrefs", async ({ page }) => {
      await expect(page.getByRole("link", { name: /^Home$/i })).toHaveAttribute("href", "/");
      await expect(page.getByRole("link", { name: /Search/i })).toHaveAttribute("href", "/search");
      await expect(page.getByRole("link", { name: /Cart/i })).toHaveAttribute("href", "/cart");
    });
  });

  test.describe("Interactions", () => {
    test("clicking category navigates to menu page", async ({ page }) => {
      await page.getByRole("link", { name: "Burgers" }).first().click();
      await expect(page).toHaveURL("/menu/burgers");
    });

    test("clicking popular item navigates to item detail", async ({ page }) => {
      await page.getByRole("link", { name: /Gourmet Burger Meal/i }).click();
      await expect(page).toHaveURL("/item/gourmet-burger");
    });

    test("clicking cart navigates to cart page", async ({ page }) => {
      await page.getByRole("link", { name: /Cart/i }).click();
      await expect(page).toHaveURL("/cart");
    });
  });

  test.describe("Visual & Layout", () => {
    test("page loads without errors", async ({ page }) => {
      // Check no console errors
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      await page.goto("/");
      await page.waitForLoadState("networkidle");

      expect(errors).toHaveLength(0);
    });

    test("images load successfully", async ({ page }) => {
      await page.waitForLoadState("networkidle");

      // Check hero banner image loaded
      const heroImage = page.locator("img[alt='Spice Hut']");
      await expect(heroImage).toBeVisible();
    });

    test("header is sticky", async ({ page }) => {
      const header = page.locator("header");
      await expect(header).toHaveClass(/sticky/);
    });
  });
});

test.describe("Mobile Responsiveness", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

  test("displays correctly on mobile viewport", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Spice Hut" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
  });

  test("categories display in grid on mobile", async ({ page }) => {
    await page.goto("/");

    // All categories should be visible
    const categoryNames = ["Burgers", "Wings", "Wraps", "Doner", "Sides", "Drinks"];
    for (const name of categoryNames) {
      await expect(page.getByRole("link", { name }).first()).toBeVisible();
    }
  });
});
