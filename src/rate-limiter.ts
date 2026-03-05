const WRITE_LIMIT = 3;
const WINDOW_MS = 60_000;
const writeTimes: number[] = [];

export function checkWriteRateLimit(): void {
  const now = Date.now();
  while (writeTimes.length > 0 && writeTimes[0]! < now - WINDOW_MS) writeTimes.shift();
  if (writeTimes.length >= WRITE_LIMIT) {
    const retryAfterMs = WINDOW_MS - (now - writeTimes[0]!);
    throw new Error(
      `Rootly write rate limit exceeded (${WRITE_LIMIT}/60s). Retry after ${Math.ceil(retryAfterMs / 1000)}s.`
    );
  }
  writeTimes.push(now);
}

/** For tests only. */
export function _resetWriteWindow(): void { writeTimes.length = 0; }
