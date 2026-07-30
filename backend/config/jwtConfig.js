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
  
  throw new Error("CRITICAL SECURITY ERROR: JWT_SECRET environment variable is missing. Server refuses to start without a cryptographically secure token secret.");
}

module.exports = { getJwtSecret };
