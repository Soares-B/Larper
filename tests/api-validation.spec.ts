import { expect, test } from "@playwright/test";
import { readJsonResponse } from "../lib/readJsonResponse";
import { isRateLimited } from "../lib/rateLimit";

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

test("rate limit blocks requests after the configured threshold", () => {
  const scope = `test-${Date.now()}-${Math.random()}`;
  const request = new Request("http://localhost", {
    headers: { "x-real-ip": "192.0.2.10" },
  });

  expect(isRateLimited(request, scope, 2)).toBe(false);
  expect(isRateLimited(request, scope, 2)).toBe(false);
  expect(isRateLimited(request, scope, 2)).toBe(true);
});

test("external response helper rejects failed status and invalid JSON", async () => {
  await expect(readJsonResponse(new Response("failure", { status: 503 })))
    .rejects.toThrow("HTTP 503");
  await expect(readJsonResponse(new Response("{")))
    .rejects.toThrow("invalid JSON");
});
