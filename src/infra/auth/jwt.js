const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d'
  });
}

function verifyJwt(token) {
  const decoded = jwt.verify(token, JWT_SECRET);

  return {
    id: decoded.id,
    name: decoded.name,
    client_id: decoded.client_id,
    email: decoded.email
  };
}

module.exports = {
  signJwt,
  verifyJwt
};
