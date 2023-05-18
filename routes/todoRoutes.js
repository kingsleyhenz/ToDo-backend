import  Express  from "express";
import { addTask, allTasks, completeTask, deleteTask} from "../controller/todoController.js";
import { Register, Login, getUser, updateUserProfile } from "../controller/regController.js";
import {isLogin} from "../middleware/LoggedIn.js";


const todoRoute = Express.Router();


todoRoute.post("/register",Register);

todoRoute.post("/login", Login);

todoRoute.post("/create",isLogin, addTask);

todoRoute.get("/allTasks",isLogin, allTasks);

todoRoute.patch("/completeTask/:taskId",isLogin, completeTask);

todoRoute.get("/getUser", isLogin, getUser);

todoRoute.patch("/updateUser", isLogin, updateUserProfile);

todoRoute.delete("/deleteTask/:id", isLogin, deleteTask);





export default todoRoute