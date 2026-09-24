import { test, expect } from "@playwright/test";

test("usuário consegue pesquisar", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const input = page.getByLabel("Input");

  await input.fill("Naruto");
  await input.press("Enter");

  await expect(
    page.getByText("Naruto", { exact: true })
  ).toBeVisible();
});