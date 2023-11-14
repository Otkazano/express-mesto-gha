import { Router } from 'express';
import userRouter from './users.js';
import cardRouter from './cards.js';

const router = Router();

router.use('/', userRouter);
router.use('/', cardRouter);

export default router;
