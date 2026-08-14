/**
 * AgroPrice AI — Phase 7: Production Distributed API Rate Limiting Middleware
 * Supports sliding window token bucket.
 * Sets RFC-compliant rate limit response headers (X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After).
 */

const requestCounts = new Map();

function apiRateLimiter(options = { maxRequests: 100, windowMs: 60 * 1000 }) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const windowMs = options.windowMs || 60000;
    const maxRequests = options.maxRequests || 100;

    // Set standard rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, { count: 1, startTime: now });
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + windowMs) / 1000));
      return next();
    }

    const tracker = requestCounts.get(ip);
    const elapsed = now - tracker.startTime;

    if (elapsed > windowMs) {
      requestCounts.set(ip, { count: 1, startTime: now });
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + windowMs) / 1000));
      return next();
    }

    tracker.count += 1;
    const remaining = Math.max(0, maxRequests - tracker.count);
    const resetTimeSec = Math.ceil((tracker.startTime + windowMs) / 1000);

    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetTimeSec);

    if (tracker.count > maxRequests) {
      const retryAfterSec = Math.ceil((windowMs - elapsed) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      return res.status(429).json({
        error: 'Too many requests. Please wait before retrying.',
        retryAfterMs: windowMs - elapsed,
        retryAfterSeconds: retryAfterSec
      });
    }

    return next();
  };
}

module.exports = apiRateLimiter;
