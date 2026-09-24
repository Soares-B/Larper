# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\search.spec.ts >> usuário consegue pesquisar
- Location: tests\search.spec.ts:3:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: 'Search' })
    - locator resolved to <button type="submit" class="w-[20%] p-px bg-[var(--background)] text-[var(--text)] text-[rgba(255,255,255,0.455)] border-[rgba(255,255,255,0.171)] rounded-[5px] m-[0_10px] focus:outline-none text-xl hover:cursor-pointer">Search</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img alt="logo" width="713" height="170" data-nimg="1" loading="lazy" decoding="async" class="block scale-[.75] m-[0_auto] pt-[30px]" src="/_next/image?url=%2FImagens%2FLogo.png&w=1920&q=75" srcset="/_next/image?url=%2FImagens%2FLogo.png&w=750&q=75 1x, /_next/image?url=%2FImagens%2FLogo.png&w=1920&q=75 2x"/> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img alt="logo" width="713" height="170" data-nimg="1" loading="lazy" decoding="async" class="block scale-[.75] m-[0_auto] pt-[30px]" src="/_next/image?url=%2FImagens%2FLogo.png&w=1920&q=75" srcset="/_next/image?url=%2FImagens%2FLogo.png&w=750&q=75 1x, /_next/image?url=%2FImagens%2FLogo.png&w=1920&q=75 2x"/> intercepts pointer events
    - retrying click action
      - waiting 100ms
    24 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <img alt="logo" width="713" height="170" data-nimg="1" loading="lazy" decoding="async" class="block scale-[.75] m-[0_auto] pt-[30px]" src="/_next/image?url=%2FImagens%2FLogo.png&w=1920&q=75" srcset="/_next/image?url=%2FImagens%2FLogo.png&w=750&q=75 1x, /_next/image?url=%2FImagens%2FLogo.png&w=1920&q=75 2x"/> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("usuário consegue pesquisar", async ({ page }) => {
  4  |   await page.goto("http://localhost:3000");
  5  | 
  6  |   await page.getByLabel("Input").fill("Naruto");
  7  | 
> 8  |   await page.getByRole("button", { name: "Search" }).click();
     |                                                      ^ Error: locator.click: Target page, context or browser has been closed
  9  | 
  10 |   await expect(page.getByText("Naruto")).toBeVisible();
  11 | });
```