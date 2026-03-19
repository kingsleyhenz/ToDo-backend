import { Router } from 'express';
import * as TodoController from '../controller/TodoController';
import { isLogin } from '../middleware/LoggedIn';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

const taskRouter = Router();

taskRouter.post('/create', isLogin, validationMiddleware(CreateTaskDto), TodoController.addTask);
taskRouter.get('/allTasks', isLogin, TodoController.allTasks);
taskRouter.patch('/updateTask/:id', isLogin, validationMiddleware(UpdateTaskDto), TodoController.updateTask);
taskRouter.patch('/completeTask/:id', isLogin, TodoController.completeTask);
taskRouter.delete('/deleteTask/:id', isLogin, TodoController.deleteTask);

export default taskRouter;
