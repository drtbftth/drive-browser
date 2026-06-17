import { test, expect } from '@playwright/test';

test('has title and hero section', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Drive Browser/);

  // Expect hero text
  await expect(page.locator('text=Your Files, Beautifully Organized.')).toBeVisible();
});

test('can switch between grid and list view', async ({ page }) => {
  await page.goto('/');

  // Should have grid and list buttons
  const listBtn = page.getByRole('button', { name: 'List View' });
  const gridBtn = page.getByRole('button', { name: 'Grid View' });

  await expect(listBtn).toBeVisible();
  await expect(gridBtn).toBeVisible();

  // Click list view
  await listBtn.click();
});
