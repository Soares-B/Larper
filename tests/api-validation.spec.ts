import { expect, test } from "@playwright/test";

test("search rejects invalid query before calling media APIs", async ({ request }) => {
  const response = await request.post("/api/search", {
    data: { query: "   ", filters: { anime: true }, type: "simple" },
  });

  expect(response.status()).toBe(400);
});

test("search reports malformed JSON", async ({ request }) => {
  const response = await request.post("/api/search", {
    data: "{",
    headers: { "content-type": "application/json" },
  });

  expect(response.status()).toBe(400);
});

test("random endpoint rejects invalid parameters before calling Tenrai", async ({ request }) => {
  const response = await request.post("/api/random", {
    data: { type: "game", NSFW: false, style: "simple" },
  });

  expect(response.status()).toBe(400);
});
