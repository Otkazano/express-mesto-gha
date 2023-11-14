import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';

const router = Router();

router.use('/', userRouter);
router.use('/', cardRouter);

export default router;
