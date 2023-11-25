import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

export default function generateToken(payload) {
  jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'super-secret', {
    expiresIn: '7d',
  });
}
