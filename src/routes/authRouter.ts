import { Router } from 'express';
import { authController } from '../controllers';
import { checkUserNameAndPassword } from '../validation';

export const authRouter: Router = Router();

authRouter.post('/registration', checkUserNameAndPassword, authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/me', authController.getMe);
authRouter.delete('/logout', authController.logout);
