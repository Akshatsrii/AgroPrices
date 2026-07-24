/**
 * AgroPrice AI — Phase 7: API Rate Limiting Middleware
 * Prevents DDoS and API abuse on auth and ML prediction endpoints.
 */

const requestCounts = new Map();

function apiRateLimiter(options = { maxRequests: 100, windowMs: 60 * 1000 }) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, { count: 1, startTime: now });
      return next();
    }

    const tracker = requestCounts.get(ip);
    if (now - tracker.startTime > options.windowMs) {
      requestCounts.set(ip, { count: 1, startTime: now });
      return next();
    }

    tracker.count += 1;
    if (tracker.count > options.maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a minute before retrying.',
        retryAfterMs: options.windowMs - (now - tracker.startTime),
      });
    }

    return next();
  };
}

module.exports = apiRateLimiter;
