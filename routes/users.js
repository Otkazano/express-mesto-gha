import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateAvatarProfile,
  updateInfoProfile,
} from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateInfoProfile);
userRouter.patch('/users/me/avatar', updateAvatarProfile);

export default userRouter;
