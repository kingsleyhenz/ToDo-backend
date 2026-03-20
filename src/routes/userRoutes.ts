import { Router } from 'express';
import * as UserController from '../controller/UserController';
import { isLogin } from '../middleware/LoggedIn';
import { validationMiddleware } from '../middleware/validation.middleware';
import { RegisterDto, LoginDto, UpdateUserDto, CreatePasswordDto, UpdatePasswordDto } from '../dto/user.dto';

const userRouter = Router();

userRouter.post('/register', validationMiddleware(RegisterDto), UserController.register);
userRouter.post('/create-password', validationMiddleware(CreatePasswordDto), UserController.createPassword);
userRouter.post('/login', validationMiddleware(LoginDto), UserController.login);
userRouter.get('/getUser', isLogin, UserController.getUser);
userRouter.patch('/updateUser/:id', isLogin, validationMiddleware(UpdateUserDto), UserController.updateProfile);
userRouter.patch('/update-password', isLogin, validationMiddleware(UpdatePasswordDto), UserController.updatePassword);

export default userRouter;
