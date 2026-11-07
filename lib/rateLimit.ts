const defaultWindowMs = 60_000;

type RateLimitEntry = { count: number; resetAt: number };
type RateLimitState = typeof globalThis & {
  __larperRateLimits?: Map<string, RateLimitEntry>;
};

export function isRateLimited(
  req: Request,
  scope: string,
  maxRequests: number,
  windowMs = defaultWindowMs,
): boolean {

  const ip = req.headers.get("x-real-ip")?.trim()
    || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const key = `${scope}:${ip}`;
  const state = globalThis as RateLimitState;
  const store = state.__larperRateLimits ??= new Map<string, RateLimitEntry>();
  const now = Date.now();

  if (store.size > 1_000) {
    for (const [entryKey, entry] of store) {
      if (entry.resetAt <= now) store.delete(entryKey);
    }
  }

  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequests;
}
