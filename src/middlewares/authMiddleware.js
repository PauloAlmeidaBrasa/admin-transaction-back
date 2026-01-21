const { verifyJwt } = require('../infra/jwt/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const err = new Error('Authorization header missing');
      err.status = 401;
      throw err;
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      const err = new Error('Invalid authorization format');
      err.status = 401;
      throw err;
    }

    const decoded = verifyJwt(token);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      client_id: decoded.client_id
    };

    next();
  } catch (error) {
    error.status = error.status || 401;
    next(error);
  }
};

module.exports = authMiddleware;
