import { Redis } from "@upstash/redis"

type RateLimitConfig = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export class RateLimit {
  tokenCache: Map<string, string[]>
  interval: number
  uniqueTokenPerInterval: number
  redis?: Redis

  constructor(config: RateLimitConfig = {}) {
    this.tokenCache = new Map()
    this.interval = config.interval || 60 * 1000 // 1 minute in milliseconds
    this.uniqueTokenPerInterval = config.uniqueTokenPerInterval || 10
  }

  // Configure Redis for production use
  setRedis(redis: Redis) {
    this.redis = redis
  }

  async limit(identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: Date }> {
    const now = Date.now()
    const windowStart = now - this.interval

    // Use Redis in production if available
    if (this.redis) {
      const key = `rate-limit:${identifier}`
      const count = await this.redis.incr(key)

      // Set expiration on first request
      if (count === 1) {
        await this.redis.expire(key, this.interval / 1000)
      }

      const ttl = await this.redis.ttl(key)
      const reset = new Date(now + ttl * 1000)

      return {
        success: count <= this.uniqueTokenPerInterval,
        limit: this.uniqueTokenPerInterval,
        remaining: Math.max(0, this.uniqueTokenPerInterval - count),
        reset,
      }
    }

    // In-memory fallback for development
    const cachedTokens = this.tokenCache.get(identifier) || []
    const newTokens = cachedTokens.filter((timestamp) => Number.parseInt(timestamp) > windowStart)

    newTokens.push(now.toString())
    this.tokenCache.set(identifier, newTokens)

    const reset = new Date(now + this.interval)

    return {
      success: newTokens.length <= this.uniqueTokenPerInterval,
      limit: this.uniqueTokenPerInterval,
      remaining: Math.max(0, this.uniqueTokenPerInterval - newTokens.length),
      reset,
    }
  }
}

export const rateLimiter = new RateLimit({
  uniqueTokenPerInterval: 20, // Limit each IP to 20 requests per interval
  interval: 60 * 1000, // Per minute
})

// Initialize Redis for production
if (process.env.NODE_ENV === "production" && process.env.UPSTASH_REDIS_REST_URL) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  rateLimiter.setRedis(redis)
}

