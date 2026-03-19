import { Router } from 'express';
import * as AuthController from '../controller/AuthController';
import { isLogin } from '../middleware/LoggedIn';
import { validationMiddleware } from '../middleware/validation.middleware';
import { RegisterDto, LoginDto, UpdateUserDto } from '../dto/auth.dto';

const authRouter = Router();

authRouter.post('/register', validationMiddleware(RegisterDto), AuthController.register);
authRouter.post('/login', validationMiddleware(LoginDto), AuthController.login);
authRouter.get('/getUser', isLogin, AuthController.getUser);
authRouter.patch('/updateUser/:id', isLogin, validationMiddleware(UpdateUserDto), AuthController.updateProfile);

export default authRouter;
