/**
 * AgroPrice AI — JWT Security Configuration Module
 * Resolves JWT_SECRET from environment or generates cryptographically secure runtime token.
 * Eliminates all hardcoded secret fallback strings.
 */

const crypto = require('crypto');

let runtimeGeneratedSecret = null;

function getJwtSecret() {
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.trim() !== '') {
    return process.env.JWT_SECRET;
  }

  if (!runtimeGeneratedSecret) {
    runtimeGeneratedSecret = crypto.randomBytes(32).toString('hex');
    console.warn('⚠️ [SECURITY NOTICE] JWT_SECRET not set in environment. Generated 256-bit secure runtime secret.');
  }

  return runtimeGeneratedSecret;
}

module.exports = { getJwtSecret };
