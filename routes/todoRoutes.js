import  Express  from "express";
import { addTask, allTasks,updateTask,deleteTask } from "../controller/todoController.js";
import { Register, Login } from "../controller/regController.js";
import {isLogin} from "../middleware/LoggedIn.js";

const todoRoute = Express.Router();


todoRoute.post("/register",Register)

todoRoute.post("/login", Login)

todoRoute.post("/create",isLogin, addTask)

todoRoute.get("/allTasks",isLogin, allTasks);

// todoRoute.get("/:category", isLogin, specificCategory);

todoRoute.delete("/:id", isLogin, deleteTask);





export default todoRoute