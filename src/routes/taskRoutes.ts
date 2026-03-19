import { Router } from 'express';
import * as TodoController from '../controller/TodoController';
import { isLogin } from '../middleware/LoggedIn';
import { validationMiddleware } from '../middleware/validation.middleware';
import { CreateTaskDto, UpdateTaskDto, CreateCategoryDto } from '../dto/task.dto';

const taskRouter = Router();

// Task Routes
taskRouter.post('/create', isLogin, validationMiddleware(CreateTaskDto), TodoController.addTask);
taskRouter.get('/allTasks', isLogin, TodoController.allTasks);
taskRouter.get('/stats', isLogin, TodoController.getStats);
taskRouter.patch('/updateTask/:id', isLogin, validationMiddleware(UpdateTaskDto), TodoController.updateTask);
taskRouter.patch('/completeTask/:id', isLogin, TodoController.completeTask);
taskRouter.delete('/deleteTask/:id', isLogin, TodoController.deleteTask);

// Category Routes
taskRouter.post('/category', isLogin, validationMiddleware(CreateCategoryDto), TodoController.addCategory);
taskRouter.get('/categories', isLogin, TodoController.getCategories);
taskRouter.patch('/category/:id', isLogin, validationMiddleware(CreateCategoryDto), TodoController.updateCategory);
taskRouter.delete('/category/:id', isLogin, TodoController.deleteCategory);

export default taskRouter;
