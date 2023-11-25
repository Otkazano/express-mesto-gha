import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errors } from 'celebrate';
import userRouter from './users.js';
import cardRouter from './cards.js';
import { createUser, login } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import globalErrorHandler from '../controllers/errors.js';
import userAuthValidate from '../middlewares/userAuthValidate.js';

const router = Router();

router.post('/signin', userAuthValidate, login);
router.post('/signup', userAuthValidate, createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'This page is not exist' });
});
router.use(errors());
router.use(globalErrorHandler);

export default router;
