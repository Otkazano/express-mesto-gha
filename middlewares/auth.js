import { StatusCodes } from 'http-status-codes';
import Jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: 'Необходима авторизация' });
    }
    const validToken = token.replace('Bearer ', '');
    payload = Jwt.verify(validToken, NODE_ENV ? JWT_SECRET : 'super-secret');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: 'С токеном что-то не так', error: error.message });
    }

    if (error.name === 'TokenExpiredError') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: 'Срок действия токена истек', error: error.message });
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация', error: error.message });
  }
  req.user = payload;
  return next();
};

export default auth;
