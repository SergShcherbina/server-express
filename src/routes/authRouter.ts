import { Router } from 'express';
import { authController } from '../controllers';
import { checkUserNameAndPassword } from '../validation';
import { authMiddleware } from '../middlewares';

export const authRouter: Router = Router();

authRouter.post('/registration', checkUserNameAndPassword, authController.registration);
authRouter.post('/login', checkUserNameAndPassword, authController.login);
authRouter.get('/me', authMiddleware, authController.getMe);
