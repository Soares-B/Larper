import { test, expect } from "@playwright/test";

test("usuário consegue pesquisar", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByLabel("Input").fill("Naruto");

  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Naruto")).toBeVisible();
});