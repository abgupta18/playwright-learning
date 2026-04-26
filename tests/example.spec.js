import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/',  { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/Fodor's Travel/);
});