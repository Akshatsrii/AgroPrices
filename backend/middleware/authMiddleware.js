/**
 * AgroPrice AI — Phase 7: JWT Bearer Token Authorization Middleware
 */

const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../config/jwtConfig');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. Bearer token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authorization token.' });
  }
}

module.exports = { verifyToken };
