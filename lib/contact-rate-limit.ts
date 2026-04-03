import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** 同一 IP あたりこの時間窓内の最大送信回数 */
const MAX_REQUESTS = 5;
const WINDOW_LABEL = "15 m" as const;
const WINDOW_MS = 15 * 60 * 1000;

type LimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

const memoryBuckets = new Map<string, number[]>();

function pruneMemoryBuckets(): void {
  if (memoryBuckets.size > 20_000) {
    memoryBuckets.clear();
  }
}

/**
 * Upstash 未設定時のみ使うインメモリ制限。
 * サーバーレスではインスタンスごとに独立するため本番の厳密な制限には不向き。
 */
function limitInMemory(ip: string): LimitResult {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const prev = memoryBuckets.get(ip) ?? [];
  const next = prev.filter((t) => t > cutoff);
  if (next.length >= MAX_REQUESTS) {
    const oldest = next[0]!;
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldest + WINDOW_MS - now) / 1000)
    );
    memoryBuckets.set(ip, next);
    return { ok: false, retryAfterSec };
  }
  next.push(now);
  memoryBuckets.set(ip, next);
  pruneMemoryBuckets();
  return { ok: true };
}

let upstashLimiter: Ratelimit | null | undefined;

function getUpstashLimiter(): Ratelimit | null {
  if (upstashLimiter !== undefined) {
    return upstashLimiter;
  }
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    upstashLimiter = null;
    return null;
  }
  upstashLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW_LABEL),
    prefix: "ratelimit:contact",
    analytics: true,
  });
  return upstashLimiter;
}

export async function assertContactRateLimit(ip: string): Promise<LimitResult> {
  const limiter = getUpstashLimiter();
  if (limiter) {
    const { success, reset } = await limiter.limit(ip);
    if (!success) {
      const retryAfterSec = Math.max(
        1,
        Math.ceil((reset - Date.now()) / 1000)
      );
      return { ok: false, retryAfterSec };
    }
    return { ok: true };
  }
  return limitInMemory(ip);
}
