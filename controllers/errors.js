import { StatusCodes } from 'http-status-codes';

export default (error, req, res, next) => {
  const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message } = error;

  res.status(statusCode).send({
    message:
      statusCode === StatusCodes.INTERNAL_SERVER_ERROR
        ? 'Ошибка на стороне сервера'
        : message,
  });
};
