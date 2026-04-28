import { test, expect } from '@playwright/test';

test('has title1', async ({ page }) => {
  await page.goto('/',  { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/Fodor's Travel/);
});