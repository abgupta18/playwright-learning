import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

test("Search functionality", async ({ page }) => {
    await page.goto("https://www.leevalley.com/en-us/search#q=leveling");
    await page.fill("#search-input", "level");
    await page.click("#search-button");
    const results = await page.textContent("#search-results");
    expect(results).toContain("Playwright");
});